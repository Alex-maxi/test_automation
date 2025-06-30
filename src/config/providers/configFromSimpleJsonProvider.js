const fs = require('fs');
const path = require('path');
const BaseConfigKeyProvider = require('./baseConfigKeyProvider');

/**
 * Allows configuration through the JSON file.
 */
class ConfigFromSimpleJsonProvider extends BaseConfigKeyProvider {
  /**
   * @param {string} configPath - Path to the JSON configuration file.
   */
  constructor(configPath) {
    super();
    this._configData = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  }

  /**
   * Returns config value for the given key.
   * @param {string} key - The key to retrieve.
   * @returns {any} - The config value.
   */
  get(key) {
    const val = this._configData[key];

    console.log(`>>> Config From Simple Json Provider: ${key}=${val}`);

    return val;
  }
}

module.exports = ConfigFromSimpleJsonProvider;
