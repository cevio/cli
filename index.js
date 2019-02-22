#!/usr/bin/env node

const path = require('path');
const program = require('commander');
const util = require('./utils');
const PKG = require('./package.json');
const Client = util.Client;
const client = new Client(__dirname, util, PKG);

program
  .version(PKG.version, '-v, --version');

program
  .command('install <plugins...>')
  .description('install a plugin')
  .option('-r, --registry <url>', 'install plugins using registry [*npm|url|cpm]', 'npm')
  .action(client.require('./lib/install'));

program
  .command('uninstall <plugins...>')
  .description('uninstall an exists plugin')
  .action(client.require('./lib/uninstall'));

program
  .command('update [plugins...]')
  .description('update plugins or cli')
  .option('-r, --registry <url>', 'install plugins using registry [*npm|url|cpm]', 'npm')
  .action(client.require('./lib/update'));

program
  .command('view [plugins...]')
  .description('view detail for all plugins or the plugin')
  .action(client.require('./lib/view'));

const Dependencies = PKG.dependencies;
for (const plugin in Dependencies) {
  if (util.dependencies.indexOf(plugin) > -1) continue;
  const Exports = require(plugin);
  if (typeof Exports === 'function' && Exports.__IS_CLI_PLUGIN__) {
    Exports(program, new Client(path.resolve(__dirname, 'node_modules', plugin), util, PKG));
  }
}

program.parse(process.argv);