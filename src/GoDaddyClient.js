import axios from 'axios';

class GoDaddyClient {
  /** @type import('axios').AxiosInstance */
  #axios;

  /** @type string */
  #subdomain;

  /**
   * @param {object} config
   * @param {string} config.domain
   * @param {string} config.key
   * @param {string} config.secret
   * @param {string} config.subdomain
   */
  constructor({
    domain,
    key,
    secret,
    subdomain = '@',
  }) {
    this.#subdomain = subdomain;

    this.#axios = axios.create({
      headers: {
        Authorization: `sso-key ${key}:${secret}`,
      },
      baseURL: `https://api.godaddy.com/v1/domains/${domain}/`,
    });
  }

  /** @returns {Promise<void>} */
  async getIpAddress() {
    const response = await this.#axios.get(
      `records/A/${this.#subdomain}`,
    );
    return response.data[0].data;
  }

  /**
   * @param {string} ipAddress
   * @returns {Promise<void>}
   */
  async update(ipAddress) {
    await this.#axios.put(
      `records/A/${this.#subdomain}`,
      [{ data: ipAddress }],
    );
  }
}

export default GoDaddyClient;
