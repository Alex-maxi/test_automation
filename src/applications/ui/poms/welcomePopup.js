const BasePage = require('../basePage');

class WelcomePopup extends BasePage {
  constructor(session) {
    super(session);
    this.dismissButtonSelector = '[aria-label="Close Welcome Banner"]';
  }

  async isVisible() {
    return await this.page.isVisible(this.dismissButtonSelector);
  }

  async dismiss() {
    if (await this.isVisible()) {
      await this.page.click(this.dismissButtonSelector);
      await this.page.waitForTimeout(500);
    }
  }
}

module.exports = WelcomePopup;
