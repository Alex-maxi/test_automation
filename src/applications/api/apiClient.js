const axios = require('axios');
const CONFIG = require('../../config/config');
const { textGenerator } = require('../../libraries/helpers');

class ApiClient {
  constructor() {
    this._token = null;
  }

  async login() {
    const headers = this._getHeaders();
    const response = await axios.post(this._formUrl('/rest/user/login'),
      {
        email: CONFIG.get('EMAIL'),
        password: CONFIG.get('PASSWORD')
      },
      { headers }
    );
    this._token = response.data.authentication.token;
    return response;
  }

  async register({ email, password }) {
    const headers = this._getHeaders();
    const response = await axios.post(this._formUrl('/api/Users'),
      { email, password },
      { headers }
    );
    return response;
  }

  async whoami() {
    const headers = this._getHeaders(this._token);
    const response = await axios.get(this._formUrl('/rest/user/whoami'),
      { headers }
    );
    return response;
  }

  async getAdminUsers() {
    const headers = this._getHeaders(this._token);
    return axios.get(this._formUrl('/rest/admin/users'), { headers });
  }

  async updateAdminUser(userId, data) {
    const headers = this._getHeaders(this._token);
    return axios.put(this._formUrl(`/rest/admin/users/${userId}`), data, { headers });
  }

  async deleteAdminUser(userId) {
    const headers = this._getHeaders(this._token);
    return axios.delete(this._formUrl(`/rest/admin/users/${userId}`), { headers });
  }

  async getAppConfig() {
    const headers = this._getHeaders(this._token);
    return axios.get(this._formUrl('/rest/admin/application-configuration'), { headers });
  }

  async updateAppConfig(config) {
    const headers = this._getHeaders(this._token);
    return axios.put(this._formUrl('/rest/admin/application-configuration'), config, { headers });
  }

  async getAllProducts() {
    return axios.get(this._formUrl('/api/Products'));
  }

  async getProductById(id) {
    return axios.get(this._formUrl(`/api/Products/${id}`));
  }

  logout() {
    this._token = null;
  }

  _formUrl(url) {
    return CONFIG.get('BASE_URL_API_DEV') + url;
  }

  _getHeaders(token = this._token) {
    const headers = {
      Accept: 'application/json, text/plain, */*',
      Connection: 'keep-alive'
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    return headers;
  }
}

module.exports = ApiClient;
