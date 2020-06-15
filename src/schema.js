import chalk from 'chalk';

const schema = {
  properties: {
    key: {
      description: chalk.white('GoDaddy API Key'),
      required: true,
    },
    secret: {
      description: 'GoDaddy API Secret',
      required: true,
      hidden: true,
      replace: '*',
    },
    domain: {
      description: 'The domain name your want to update',
      required: true,
    },
    subdomain: {
      description: 'Subdomain to update',
      required: true,
      default: '@',
    },
  },
};

export default schema;
