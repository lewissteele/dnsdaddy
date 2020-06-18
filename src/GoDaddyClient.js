import axios from 'axios';

const apiUrl = 'https://api.godaddy.com/v1/domains/';

class GoDaddyClient {
  #axios;

  constructor(key, secret, domain, subdomain = '@') {
    this.key = key;
    this.secret = secret;
    this.domain = domain;
    this.subdomain = subdomain;

    this.#axios = axios.create({
      headers: {
        Authorization: `sso-key ${key}:${secret}`,
      },
      baseURL: apiUrl,
    });
  }

  /** @returns {Promise<string>} */
  getIpAddress() {
    return new Promise((resolve, reject) => {
      this.#axios.get(`records/A/${this.subdomain}`)
        .then((response) => resolve(response.data))
        .catch((err) => reject(err));
    });
  }

  /**
   * @param {string} ipAddress
   * @returns {void}
   */
  update(ipAddress) {

  }
}

export default GoDaddyClient;
