import LoginPage from './login.page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
 export default class SchedulePage extends LoginPage {
    /**
     * define selectors using getter methods
     */
    get scheduleTab() {
        return $('(//a[@title="Schedule"])[1]');
    }

    get shiftTimeFrom() {
        return $('//input[@placeholder="From"]');
    }

    get shiftTimeTo() {
        return $('//input[@placeholder="To"]');
    }

    get shiftModalBox() {
        return $('//div[@class="edit-shift-modal__box"]');
    }

    get shiftModalBoxCreateBtn () {
        return $('//button[text()[contains(.,"Create")]]')
    }

    get shiftModalBoxDeleteBtn () {
        return $('//button[text()[contains(.,"Delete")]]')
    }

    async gridViewInterval (employee) {
        if(employee<3){
            return await $$(`(//div[@class="virtualized-board__row"])[${employee+1}]//div[@class="board__cell"]`).length;
        }else{
            return await $$(`//div[@class="virtualized-board__row virtualized-board__row--last"]//div[@class="board__cell"]`).length;
        }
    }

    async employeesCount () {
        const textArray = await browser.$$('//div[@class="ReactVirtualized__Grid__innerScrollContainer"]//div[@class="row-header3__text__title"]').map(elem => elem.getText());
        let count = 0;
        (await textArray).map(elem=>{
            if(elem.includes('Employee')){
                count++
            }
        })
        return count;
    }
    
    async openByLogIn() {
        await super.open();
        await super.clearCookies();
        await super.login('plandayqa@outlook.com', 'APItesting21');
        await browser.url('https://test1234.planday.com/schedule');
    };

    async openByNavBar() {
         await this.scheduleTab.click()
    }

    async switchToFrame () {
        await browser.switchToFrame(await $('iframe[title="Page content"]'));
        await browser.pause(2000)
    }

    async openShiftForEmployee (employee, day) {
        let dayElement = employee < 3 ? await $(`(//div[@class="virtualized-board__row"])[${employee+1}]//div[@class="board__cell"][${day}]//div`) 
                                      : await $(`(//div[@class="virtualized-board__row virtualized-board__row--last"])//div[@class="board__cell"][${day}]//div`);
        let hideElement  = employee < 3 ? await $(`(//div[@class="virtualized-board__row"])[${employee+1}]//div[@class="board__cell"][${day}]//*[local-name()='svg']`) 
                                        : await $(`(//div[@class="virtualized-board__row virtualized-board__row--last"])//div[@class="board__cell"][${day}]//*[local-name()='svg']`);
        await dayElement.scrollIntoView();
        await browser.pause(1000);
        await dayElement.moveTo({xOffset:100, yOffset:100});
        await hideElement.click();
        await browser.pause(1000);
    }

    async createShiftForEmployee (timeFrom, timeTo) {
        await this.shiftTimeFrom.setValue(timeFrom);
        await this.shiftTimeTo.setValue(timeTo);
        await this.shiftModalBoxCreateBtn.click();
        await browser.pause(1000);
    }

    async getShiftElementFromGrid (employee, day) {
        let dayElement = employee < 3 ? await $$(`(//div[@class="virtualized-board__row"])[${employee+1}]//div[@class="board__cell"][${day}]//div[@class='shift-tile__inner']`) 
                                      : await $$(`(//div[@class="virtualized-board__row virtualized-board__row--last"])//div[@class="board__cell"][${day}]//div[@class='shift-tile__inner']`);
        return dayElement;
    }

    async deleteShiftGridElement (employee, day) {
        let dayElement = employee < 3 ? await $(`(//div[@class="virtualized-board__row"])[${employee+1}]//div[@class="board__cell"][${day}]//div[@class='shift-tile__inner']`) 
                                      : await $(`(//div[@class="virtualized-board__row virtualized-board__row--last"])//div[@class="board__cell"][${day}]//div[@class='shift-tile__inner']`);
        await dayElement.click()
        await this.shiftModalBoxDeleteBtn.click()
        await browser.pause(1000)
        await this.shiftModalBoxDeleteBtn.click()
        await browser.pause(1000)
    }
}

