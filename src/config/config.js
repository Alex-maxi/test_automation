const fs = require('fs');
const path = require('path');
require('dotenv').config();
const ConfigFromDefaultsProvider = require('./providers/configFromDefaultsProvider');
const ConfigFromEnvProvider = require('./providers/configFromEnvProvider');
const ConfigFromSimpleJsonProvider = require('./providers/configFromSimpleJsonProvider');

class Config {
  static defaultEnv = "dev";

  constructor() {
    this.confDict = {};

    // Отримуємо цільове середовище (наприклад, 'dev', 'prod')
    let target = process.env.TARGET;
    if (!target) {
      target = Config.defaultEnv;
    }

    const jsonPath = path.join(__dirname, `env_config/${target}.json`);
    // const jsonPathAuth = path.join(__dirname, 'env_config/data_auth.json');

    // Ієрархія постачальників
    this.providers = [
      new ConfigFromSimpleJsonProvider(jsonPath),
      new ConfigFromEnvProvider(),
      new ConfigFromDefaultsProvider({
        DEBUG_MODE: false,
        BROWSER: 'chrome',
        UI_TIMEOUTS: 30
      }),
    ];

    // Реєстрація ключів
    this.register('BASE_URL_API_DEV');
    this.register('BASE_URL_UI_DEV');
    this.register('TEST_DATA');
    this.register('BROWSER');
    this.register('DEBUG_MODE');
    this.register('UI_TIMEOUTS');
    this.register('EMAIL');
    this.register('PASSWORD');
    }

  /**
   * Реєструє ім'я ключа, який буде використовуватися в тестах
   * @param {string} name - Ключ конфігурації
   */
  register(name) {
    // Порядок постачальників має значення
    for (let provider of this.providers) {
      const val = provider.get(name);
      if (val !== undefined && val !== null) {
        this.confDict[name] = val;
        break;
      }
    }

    const val = this.confDict[name];
    if (val === undefined || val === null) {
      throw new Error(`${name} variable is not set in config`);
    }

    console.log(`${name} variable is registered in config with value ${val}`);
  }

  /**
   * Отримує значення з конфігурації
   * @param {string} name - Ключ конфігурації
   * @returns {any} - Значення конфігурації
   */
  get(name) {
    const val = this.confDict[name];
    if (val === undefined || val === null) {
      throw new Error(`${name} variable is not set in config`);
    }

    return val;
  }
}

// Створення Singleton екземпляру
const CONFIG = new Config();

module.exports = CONFIG;
