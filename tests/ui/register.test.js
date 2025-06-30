const RegisterPage = require('../../src/applications/ui/poms/registerPage');
const WelcomePopup = require('../../src/applications/ui/poms/welcomePopup');
const BrowserSession = require('../../providers/browsers/browserSession');
const { test, expect } = require('@playwright/test');

const CONFIG = require('../../src/config/config');

test.describe('Register Form - OWASP Juice Shop', () => {
  let session;
  let registerPage;
  let welcomePopup;

  test.beforeAll(async () => {
    session = await BrowserSession.create();
    registerPage = new RegisterPage(session);
    welcomePopup = new WelcomePopup(session);
    await registerPage.open();
    await welcomePopup.dismiss();
  });

  test.afterAll(async () => {
    await registerPage.closePage();
  });

  test('Should register a new user', async () => {
    const email = `test_${Date.now()}@juice.local`;
    const password = 'Test1234!';
    await registerPage.fillRegistrationForm({
      email,
      password,
      repeatPassword: password,
      securityAnswer: "qwerty"
    });
    await registerPage.submit();
    await registerPage.waitForTimeout(1000);
    await registerPage.screenshot();
    const success = await registerPage.isRegistrationSuccessful();
    expect(success).toBe(true);
  });

});
