import YAML from 'yaml';
import fs from 'fs';
import xdg from '@folder/xdg';

const dir = `${xdg().config}/dnsdaddy`;
const path = `${dir}/config.yml`;

export const setConfig = config => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  fs.writeFileSync(
    path,
    YAML.stringify(config),
  );
};

export const getConfig = () => {
  if (!fs.existsSync(path)) {
    return null;
  }

  const file = fs.readFileSync(path, 'utf8');
  return YAML.parse(file);
};
