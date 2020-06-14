#!/usr/bin/env node

import Confirm from 'prompt-confirm';
import YAML from 'yaml';
import chalk from 'chalk';
import figlet from 'figlet';
import fs from 'fs';
import os from 'os';
import program from 'commander';
import prompt from 'prompt';

/**
 * @returns string
 */
function getConfigFilePath() {
  return `${os.homedir()}/.dnsdaddyrc.yml`;
}

/**
 * @returns void
 */
function runConfigWizard() {
  console.log(
    chalk.green(
      figlet.textSync(
        'dnsdaddy',
        { horizontalLayout: 'full' },
      ),
    ),
  );

  //  ^[A-Z]{1,10}$

  prompt.message = '';

  const schema = {
    properties: {
      key: {
        description: 'GoDaddy API Key',
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

  prompt.start();

  prompt.get(schema, (_, result) => {
    console.log(result);

    const yaml = YAML.stringify(result);
    fs.writeFileSync(getConfigFilePath(), yaml);

    console.log(chalk.green('Setup complete!'));

    const confirm = new Confirm({
      name: 'update',
      message: 'Do you want to update your IP address now?',
    });

    confirm.ask((answer) => {
      console.log(answer);
    });
  });
}


/**
 * @returns void
 */
function update() {

}

program
  .option('-c, --config', 'Run config wizard');

program
  .command('init')
  .description('Setup DNS Daddy with your GoDaddy credentials')
  .action(() => runConfigWizard());

program
  .command('update')
  .description('Update DNS record with your IP address')
  .action(() => {});

program.parse(process.argv);

//if (!fs.existsSync(getConfigFilePath())) {
  //runConfigWizard();
//}
