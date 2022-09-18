import LoginPage from '../pageobjects/login.page'

describe('Planday portal smoke test',()=>{
    
    it('Verify that the main login fields and buttons are displayed.',async()=>{
        await LoginPage.open();
        expect(await browser.getTitle()).toEqual('Planday');

        await expect(LoginPage.inputUsername).toBeDisplayed();
        await expect(LoginPage.inputPassword).toBeDisplayed();
        await expect(LoginPage.loginBnt).toBeDisplayed();
        await expect(LoginPage.forgotPassBtn).toBeDisplayed();
    });

    it('Verify invalid user data.',async()=>{
        const validationMsg = await $('#Username-validation-error');
        await LoginPage.clearCookies();
        await LoginPage.login('invalidUserName','invalidPassword');
        await expect(await validationMsg.getText()).toEqual('The username or password is incorrect.');
    });

});