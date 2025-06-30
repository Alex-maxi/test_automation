class SearchUsersParameters {
  constructor(page = null, per_page = null, gender = null, status = null) {
    this._page = page;
    this._per_page = per_page;
    this._gender = gender;
    this._status = status;
  }

  /**
   * @param {number} page - Page number.
   * @returns {SearchUsersParameters}
   */
  setPage(page) {
    this._page = page;
    return this;
  }

  /**
   * @param {number} perPage - Items per page.
   * @returns {SearchUsersParameters}
   */
  setPerPage(perPage) {
    this._per_page = perPage;
    return this;
  }

  /**
   * @param {string} gender - Gender filter, e.g. "male", "female".
   * @returns {SearchUsersParameters}
   */
  setGender(gender) {
    this._gender = gender;
    return this;
  }

  /**
   * @param {string} status - Status filter, e.g. "active", "inactive".
   * @returns {SearchUsersParameters}
   */
  setStatus(status) {
    this._status = status;
    return this;
  }

  /**
   * @returns {Object} - Final query params object.
   */
  build() {
    const params = {};
    if (this._page !== null) params.page = this._page;
    if (this._per_page !== null) params.per_page = this._per_page;
    if (this._gender !== null) params.gender = this._gender;
    if (this._status !== null) params.status = this._status;
    return params;
  }
}

module.exports = SearchUsersParameters;
