const path = require('path');
module.exports = async (ctx, plugins = [], options) => {
  let name = 'npm', nexts = [];
  const actions = plugins.slice(0);

  actions.unshift('update');

  if (!plugins.length) {
    actions.push('-g', ctx.pkg.name);
    nexts = ctx.util.installedPlugins();
    nexts.unshift('install');
  }

  if (options.registry) {
    if (nexts.length > 1) {
      nexts.push('-r', options.registry);
    }
    if (/^http(s)?\:\/\//i.test(options.registry)) {
      actions.push('--registry=' + options.registry);
    } else {
      name = options.registry;
    }
  }

  await ctx.util.exec(name, actions, path.resolve(__dirname, '../'));
  if (nexts.length) {
    await ctx.util.exec('cli', nexts);
  }
}