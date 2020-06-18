import YAML from 'yaml';
import fs from 'fs';
import xdg from '@folder/xdg';

const dir = `${xdg().config}/dnsdaddy`;
const path = `${dir}/config.yml`;

class Config {
  constructor() {
    this.key = null;
    this.secret = null;
    this.domain = null;
    this.subdomain = null;

    if (Config.exists()) {
      const file = fs.readFileSync(path, 'utf8');
      const config = YAML.parse(file);
      Object.assign(this, config);
    }
  }

  static exists() {
    return fs.existsSync(path);
  }

  save() {
    const config = {
      domain: this.domain,
      key: this.key,
      secret: this.secret,
      subdomain: this.subdomain,
    };

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    fs.writeFileSync(
      path,
      YAML.stringify(config),
    );
  }
}

export default Config;
