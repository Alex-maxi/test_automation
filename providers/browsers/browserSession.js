const BrowserProvider = require('./browserProvider');

class BrowserSession {
  constructor() {
    this.browser = null;
    this.context = null;
    this.page = null;
  }

  async init() {
    this.browser = await BrowserProvider.getBrowser();
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    await this.context.setDefaultTimeout(10000);
    await this.page.setDefaultTimeout(10000);
    await this.page.setViewportSize({ width: 1920, height: 1080 });
  }

  static async create() {
    const session = new BrowserSession();
    await session.init();
    return session;
  }

  getPage() {
    return this.page;
  }

  getContext() {
    return this.context;
  }

  getBrowser() {
    return this.browser;
  }

  async close() {
    await this.browser?.close();
  }
}

module.exports = BrowserSession;
