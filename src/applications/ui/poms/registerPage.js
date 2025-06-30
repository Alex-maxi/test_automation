const BasePage = require('../basePage');
const CONFIG = require('../../../config/config');

class RegisterPage extends BasePage {
  constructor(session) {
    super(session);
    this.url = `${CONFIG.get('BASE_URL_UI_DEV')}/#/register`;
    this.emailField = 'input#emailControl';
    this.passwordField = 'input#passwordControl';
    this.repeatPasswordField = 'input#repeatPasswordControl';
    this.securityQuestionDropdown = 'mat-select[name="securityQuestion"]';
    this.securityAnswerField = 'input#securityAnswerControl';
    this.securityDropDown2 = 'mat-option >> text="Mother\'s maiden name?"';
    this.registerButton = 'button#registerButton';
    this.successSnackBar = 'simple-snack-bar';
  }

  async open() {
    await this.goTo(this.url);
    await this.waitForElementVisible(this.passwordField);
  }

  async fillRegistrationForm({ email, password, repeatPassword, securityAnswer }) {
    await this.type(this.emailField, email);
    await this.type(this.passwordField, password);
    if (repeatPassword) {
      await this.type(this.repeatPasswordField, repeatPassword);
    }
    if (securityAnswer) {
      await this.selectSecurityQuestion();
      await this.waitForElementVisible(this.securityAnswerField);
      await this.type(this.securityAnswerField, securityAnswer);
    }
  }

  async selectSecurityQuestion() {
    await this.click(this.securityQuestionDropdown);
    await this.waitForElementVisible(this.securityDropDown2);
    await this.click(this.securityDropDown2);
  }

  async submit() {
    await this.click(this.registerButton);
  }

  async isRegistrationSuccessful() {
    return await this.isVisible(this.successSnackBar);
  }

  async closePage() {
    await this.close();
  }
}

module.exports = RegisterPage;
