#!/usr/bin/env node

import axios from 'axios';
import chalk from 'chalk';
import inquirer from 'inquirer';
import program from 'commander';

import GoDaddyClient from './GoDaddyClient.js';
import questions from './questions.js';
import { getConfig, setConfig } from './config.js';

const update = async () => {
  const config = getConfig();

  if (config === null) {
    console.log('Config missing please run: dnsdaddy init');
    return;
  }

  const godaddy = new GoDaddyClient(config);

  try {
    const publicIp = (await axios.get('https://api.ipify.org')).data;
    console.log(`Your IP address: ${publicIp}`);

    const godaddyIp = await godaddy.getIpAddress();
    console.log(`GoDaddy IP address: ${godaddyIp}`);

    if (publicIp === godaddyIp) {
      console.log(chalk.yellow('Update not needed'));
      return;
    }

    await godaddy.update(publicIp);
    console.log(chalk.green('IP address updated'));
  } catch (err) {
    console.log(err);
  }
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
