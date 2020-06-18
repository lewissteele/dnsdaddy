import axios from 'axios';

class GoDaddyClient {
  /** @type import('axios').AxiosInstance */
  #axios;

  /**
   * @param {string} key
   * @param {string} secret
   * @param {string} domain
   * @param {string} subdomain
   */
  constructor({
    key,
    secret,
    domain,
    subdomain = '@',
  }) {
    this.key = key;
    this.secret = secret;
    this.domain = domain;
    this.subdomain = subdomain;

    this.#axios = axios.create({
      headers: {
        Authorization: `sso-key ${key}:${secret}`,
      },
      baseURL: `https://api.godaddy.com/v1/domains/${domain}/`,
    });
  }

  /** @returns {Promise<string>} */
  getIpAddress() {
    return new Promise((resolve, reject) => {
      this.#axios.get(`records/A/${this.subdomain}`)
        .then(response => resolve(response.data[0].data))
        .catch(err => reject(err));
    });
  }

  /**
   * @param {string} ipAddress
   * @returns {Promise<void>}
   */
  update(ipAddress) {
    return new Promise((resolve, reject) => {
      this.#axios
        .put(
          `records/A/${this.subdomain}`,
          [
            { data: ipAddress },
          ],
        )
        .then(() => resolve)
        .catch(err => reject(err));
    });
  }
}

export default GoDaddyClient;
