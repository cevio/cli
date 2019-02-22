module.exports = async (ctx, plugins = []) => {
  const _plugins = !plugins.length ? ctx.util.installedPlugins() : plugins;
  _plugins.forEach(plugin => {
    if (ctx.util.dependencies.indexOf(plugin) > -1) return;
    const version = ctx.pkg.dependencies[plugin];
    console.log(`- 📦  ${plugin}@${version}`);
  });
}