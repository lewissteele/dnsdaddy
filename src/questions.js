const questions = [
  {
    message: 'GoDaddy API key:',
    name: 'key',
  },
  {
    message: 'GoDaddy API secret:',
    name: 'secret',
  },
  {
    message: 'Domain name:',
    name: 'domain',
  },
  {
    default: '@',
    message: 'Subdomain name:',
    name: 'subdomain',
  },
  {
    message: 'Do you want to update your IP address now?',
    name: 'updateNow',
    type: 'confirm',
  },
];

export default questions;
