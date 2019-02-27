const fs = require('fs');
const path = require('path');
module.exports = async ctx => {
  const pkgFile = path.resolve(process.cwd(), 'package.json');
  if (!fs.existsSync(pkgFile)) return console.error('can not find package.json, it is not a cli plugin.');
  const pkg = require(pkgFile);
  await ctx.util.exec('cli', ['uninstall', pkg.name]);
}