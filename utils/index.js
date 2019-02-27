const pkg = require('../package.json');
exports.Client = require('./client');
exports.exec = require('./exec');
exports.dependencies = [
  "@clusic/catch",
  "commander",
  "fs-extra",
  "prompts",
  "signale"
]

exports.installedPlugins = function() {
  const _plugins = [];
  for (const i in pkg.dependencies) {
    if (exports.dependencies.indexOf(i) > -1) continue;
    _plugins.push(i);
  }
  return _plugins;
}