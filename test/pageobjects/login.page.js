

import Page from './page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputUsername () {
        return $('#Username');
    }

    get inputPassword () {
        return $('#Password');
    }

    get loginBnt () {
        return $('#MainLoginButton');
    }

    get forgotPassBtn () {
        return $('#login-form__password-forgotten-button');
    }

    get cookieBtn () {
        return $('#cookie-consent-button');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async login (username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.loginBnt.click();
    }

    async clearCookies(){
        await this.cookieBtn.click();
    }

}

export default new LoginPage();
