#!/usr/bin/env node

import axios from 'axios';
import chalk from 'chalk';
import inquirer from 'inquirer';
import program from 'commander';

import Config from './src/Config.js';
import GoDaddyClient from './src/GoDaddyClient.js';
import questions from './src/questions.js';

const init = () => {
  inquirer
    .prompt(questions)
    .then(answers => {
      if (answers.updateNow) {
        console.log(chalk.green('IP Address Updated'));
        // todo call update()
      }

      const {
        key,
        secret,
        domain,
        subdomain
      } = answers;
      const config = new Config();

      config.key = key;
      config.secret = secret;
      config.domain = domain;
      config.subdomain = subdomain;

      config.save();
    })
    .catch(error => console.log(error));
};

//const update = () => {
  //const config = new Config();
  //const godaddy = new GoDaddyClient(
    //config.key,
    //config.secret,
    //config.domain,
    //config.subdomain,
  //);

  //axios.get('https://api.ipify.org')
    //.then((response) => {
      //const publicIpAddress = response.data;
      //console.log(`Your IP Address: ${publicIpAddress}`);

      //godaddy.getIpAddress()
        //.then((godaddyIpAddress) => {
          //console.log(godaddyIpAddress);
          //if (godaddyIpAddress !== publicIpAddress) {
            //// update
          //}
        //})
        //.catch((err) => {

        //});
    //})
    //.catch((err) => console.log(err));
//};

program
  .name('dnsdaddy')
  .description('Dyanmic DNS for GoDaddy')
  .version('1.0');

program
  .command('init')
  .description('Setup DNS Daddy with your GoDaddy credentials')
  .action(init);

//program
  //.command('update')
  //.description('Update DNS record with your IP address')
  //.action(update);

program
  .command('clear')
  .description('Clear config')
  .action(() => {});

program.parse(process.argv);
