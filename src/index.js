#!/usr/bin/env node

import axios from 'axios';
import chalk from 'chalk';
import inquirer from 'inquirer';
import program from 'commander';

import GoDaddyClient from './GoDaddyClient.js';
import questions from './questions.js';
import { getConfig, setConfig } from './config.js';

const update = () => {
  const config = getConfig();

  if (config === null) {
    console.log('Config missing please run: dnsdaddy init');
    process.exit();
  }

  const godaddy = new GoDaddyClient(config);
  const log = err => console.log(err);

  axios.get('https://api.ipify.org')
    .then(response => {
      const publicIp = response.data;
      console.log(`Your IP address: ${publicIp}`);

      godaddy.getIpAddress()
        .then(ip => {
          console.log(`GoDaddy IP address: ${ip}`);

          if (ip !== publicIp) {
            godaddy.update(publicIp)
              .then(() => console.log(chalk.green('IP Address Updated')))
              .catch(log);
            return;
          }

          console.log(chalk.yellow('Update not needed'));
        })
        .catch(log);
    })
    .catch(log);
};

const init = () => {
  inquirer
    .prompt(questions)
    .then(answers => {
      const {
        domain,
        key,
        secret,
        subdomain,
      } = answers;

      setConfig({
        ...{
          domain,
          key,
          secret,
          subdomain,
        },
      });

      if (answers.updateNow) {
        update();
      }
    })
    .catch(error => console.log(error));
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

program.parse(process.argv);
