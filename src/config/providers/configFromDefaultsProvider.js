const BaseConfigKeyProvider = require('./baseConfigKeyProvider');

/**
 * Allows configuration through the provided default values.
 */
class ConfigFromDefaultsProvider extends BaseConfigKeyProvider {
  /**
   * @param {Object} props - The default properties to use for configuration.
   */
  constructor(props) {
    super();
    this.props = props;
  }

  /**
   * Returns config value for the given key.
   * @param {string} key - The key to retrieve.
   * @returns {any} - The config value.
   */
  get(key) {
    console.log(`>>> Config From Default Provider: ${key}`);

    return this.props[key];
  }
}

module.exports = ConfigFromDefaultsProvider;