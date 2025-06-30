const { chromium, firefox, webkit } = require('playwright');
const CONFIG = require('../../src/config/config');

const browserMapper = {
  chrome: chromium,
  chromium: chromium,
  ff: firefox,
  safari: webkit,
  webkit: webkit
};

class BrowserProvider {
  static async getBrowser() {
    const browserName = CONFIG.get('BROWSER');
    const headless = CONFIG.get('DEBUG_MODE') !== "false";

    const browserEngine = browserMapper[browserName];
    if (!browserEngine) {
      throw new Error(`Browser "${browserName}" is not supported.`);
    }

    return await browserEngine.launch({
      headless: headless,
      args: ['--disable-dev-shm-usage', '--no-sandbox']
    });
  }
}

module.exports = BrowserProvider;
