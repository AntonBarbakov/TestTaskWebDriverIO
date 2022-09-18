import LoginPage from '../pageobjects/login.page'
import SchedulePage from '../pageobjects/schedule.page'

describe('Planday portal smoke test',()=>{

    var loginPage = new LoginPage();
    var schedulePage = new SchedulePage();
    const EMPLOYEE_NUMBER = 1;
    const DAY = 7;

    it('Verify that the main login fields and buttons are displayed.',async()=>{
        await loginPage.open();
        expect(await browser.getTitle()).toEqual('Planday');

        await expect(loginPage.inputUsername).toBeDisplayed();
        await expect(loginPage.inputPassword).toBeDisplayed();
        await expect(loginPage.loginBnt).toBeDisplayed();
        await expect(loginPage.forgotPassBtn).toBeDisplayed();
    });

    it('Verify invalid user data.',async()=>{
        const validationMsg = await $('#Username-validation-error');                                        //Commit this line in case if you have additional cookies allert
        await loginPage.clearCookies();
        await loginPage.login('invalidUserName','invalidPassword');                                         // And this 
        await expect(await validationMsg.getText()).toEqual('The username or password is incorrect.');      // And this.This issue can appear if you use this test case often! 
    });

    it('Verify login with valid user data.',async()=>{
        const welcomeMsg = await $('(//h1)[1]');
        await loginPage.login('plandayqa@outlook.com', 'APItesting21');
        await expect(welcomeMsg).toHaveText('Hi Employee');
    });

    it('Verify go to Schedule page.',async()=>{
        await schedulePage.openByNavBar();
        await expect(browser).toHaveUrl('https://test1234.planday.com/schedule');
    });

    it('Schedule grid view should display an interval of 1 week, count and assert that the number of displayed employees is 3.',async()=>{
        //Schedule grid view should display an interval of 1 week
        await schedulePage.switchToFrame()
        const count = await schedulePage.gridViewInterval(1);
        await expect(count).toBe(7)

        //count and assert that the number of displayed employees is 3
        await expect(await schedulePage.employeesCount()).toBe(3)
    });

    it('Open a shift for one of the employees.',async()=>{
        await schedulePage.openShiftForEmployee(EMPLOYEE_NUMBER,DAY);
        await expect(schedulePage.shiftModalBox).toBeDisplayed()
    });

    it('Create a shift for one of the employees, and verify that the shift created is visible on the Schedule grid',async()=>{
        await schedulePage.createShiftForEmployee('09.00', '17.00');
        await expect(await schedulePage.getShiftElementFromGrid(EMPLOYEE_NUMBER,DAY)).toBeDisplayed();
    });

    it('Post-conditions.',async()=>{
        await schedulePage.deleteShiftGridElement(EMPLOYEE_NUMBER, DAY);
    });

});