module.exports = (program, client) => {
  program
    .command('test')
    .description('test descriotion')
    .option('-c, --config [value]', 'test option descriotion')
    .action(client.require('./lib/index'));
}
module.exports.__IS_CLI_PLUGIN__ = true;