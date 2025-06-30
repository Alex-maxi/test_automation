const BaseConfigKeyProvider = require('./baseConfigKeyProvider');

/**
 * Allows configuration through the env variables.
 */
class ConfigFromEnvProvider extends BaseConfigKeyProvider {
  /**
   * Returns config value for the given key.
   * @param {string} key - The key to retrieve.
   * @returns {string|null} - The config value, or null if not found.
   */
  get(key) {
    console.log(`>>> Config From Env Provider: ${key}=${process.env[key]}`);

    return process.env[key] || null;
  }
}

module.exports = ConfigFromEnvProvider;
