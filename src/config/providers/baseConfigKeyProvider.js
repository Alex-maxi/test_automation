/**
 * Base class for config providers.
 * Should not be used directly.
 */
class BaseConfigKeyProvider {
    /**
     * Get config value by key.
     * @param {string} key - The key to retrieve.
     * @throws {Error} Always throws if not overridden.
     */
    get(key) {
      throw new Error("Not implemented");
    }
  }
  
  module.exports = BaseConfigKeyProvider;