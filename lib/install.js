const path = require('path');
module.exports = async (ctx, plugins, options) => {
  let name = 'npm';
  const actions = plugins.slice(0);
  actions.unshift('install');
  if (options.registry) {
    if (/^http(s)?\:\/\//i.test(options.registry)) {
      actions.push('--registry=' + options.registry);
    } else {
      name = options.registry;
    }
  }
  await ctx.util.exec(name, actions, path.resolve(__dirname, '../'));
}