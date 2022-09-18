import Page from './page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
export default class LoginPage extends Page {
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

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async login (username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.loginBnt.click();
    }

    open () {
        return super.open();
    }

}
