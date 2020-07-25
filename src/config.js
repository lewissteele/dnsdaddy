import YAML from 'yaml';
import fs from 'fs';
import xdg from '@folder/xdg';

const dir = `${xdg().config}/dnsdaddy`;
const path = `${dir}/config.yml`;

/**
 * @param {object} config
 * @param {string} config.domain
 * @param {string} config.key
 * @param {string} config.secret
 * @param {string} config.subdomain
 * @returns {void}
 */
const setConfig = config => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  fs.writeFileSync(
    path,
    YAML.stringify(config),
  );
};

/**
 * @returns {object}
 */
const getConfig = () => {
  if (!fs.existsSync(path)) {
    return null;
  }

  const file = fs.readFileSync(path, 'utf8');
  return YAML.parse(file);
};

export { setConfig, getConfig };
