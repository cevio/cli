const path = require('path');
module.exports = async (ctx, plugins) => {
  const actions = plugins.slice(0);
  actions.unshift('uninstall');
  await ctx.util.exec('npm', actions, path.resolve(__dirname, '../'));
}