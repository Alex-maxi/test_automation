class BasePage {
  constructor(session) {
    this.session = session;
    this.page = session.getPage();
  }

  async goTo(url) {
    await this.page.goto(url);
  }

  async waitForElementVisible(selector) {
    await this.page.waitForSelector(selector, { visible: true });
  }

  async click(selector) {
    await this.page.click(selector);
  }

  async type(selector, text) {
    await this.page.fill(selector, text);
  }

  async getText(selector) {
    return await this.page.textContent(selector);
  }

  async selectOption(selector, text) {
    await page.selectOption(selector, { label: text });
  }

  async isVisible(selector) {
    return await this.page.isVisible(selector);
  }

  async waitForTimeout(timeout) {
    await this.page.waitForTimeout(timeout);
  }

  async close() {
    await this.page.close();
    await this.session.browser.close();
  }

  async screenshot() {
    const date = new Date();
    await this.page.screenshot({
      path: `screenshots/screenshot_${date.toISOString()}_${this.session.browser._name}.png`,
    });
  }
}

module.exports = BasePage;
