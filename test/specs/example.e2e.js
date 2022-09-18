import LoginPage from  '../pageobjects/login.page';
import SchedulePage from '../pageobjects/schedule.page';

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await LoginPage.open();

        await LoginPage.login('tomsmith', 'SuperSecretPassword!');
        await expect(SchedulePage.flashAlert).toBeExisting();
        await expect(SchedulePage.flashAlert).toHaveTextContaining(
            'You logged into a secure area!');
    });
});


