#!/usr/bin/env node

import Confirm from 'prompt-confirm';
import chalk from 'chalk';
import program from 'commander';
import prompt from 'prompt';
import axios from 'axios';

import Config from './src/Config.js';
import schema from './src/schema.js';

const init = () => {
  prompt.message = '';
  prompt.start();

  prompt.get(schema, (_, result) => {
    const config = new Config();
    Object.assign(config, result);
    config.save();

    console.log(chalk.green('Setup complete!'));

    const confirm = new Confirm({
      name: 'update',
      message: 'Do you want to update your IP address now?',
    });

    confirm.ask((answer) => {
      // todo
    });
  });
};

const update = () => {
  const config = new Config();

  axios.get('https://api.ipify.org')
    .then((response) => {
      const ip = response.data;
      console.log(`Your IP Address: ${ip}`);

      axios({
        headers: { Authorization: `sso-key ${config.key}:${config.secret}` },
        url: `https://api.godaddy.com/v1/domains/${config.domain}/records/A/${config.subdomain}`,
      })
        .then((response) => {
          if (ip !== response.data) {
            // update ip
          }

          console.log(response.data);
        });
    })
    .catch((err) => console.log(err));
};

program
  .name('dnsdaddy')
  .description('Dyanmic DNS for GoDaddy')
  .version('1.0');

program
  .command('init')
  .description('Setup DNS Daddy with your GoDaddy credentials')
  .action(init);

program
  .command('update')
  .description('Update DNS record with your IP address')
  .action(update);

program
  .command('clear')
  .description('Clear config')
  .action(() => {});

program.parse(process.argv);
