const fs = require('fs');
const path = require('path');
const prompts = require('prompts');
const { Signale } = require('signale');

module.exports = async (ctx, plugin) => {
  if (!plugin) plugin = await askProject();
  const interactive = new Signale({ interactive: true });
  if (!plugin) return interactive.error('the task of create project is stopped.');
  // 创建项目目录
  const pluginDir = path.resolve(process.cwd(), plugin);
  if (fs.existsSync(pluginDir)) throw new Error('plugin is exists at: ' + pluginDir);
  fs.mkdirSync(pluginDir);
  ctx.catch(() => fse.removeSync(pluginDir));
  const templateConfigs = require('../template/config.json');
  let i = 0;
  for (const file in templateConfigs) {
    const sourceFilePath = path.resolve(__dirname, '../template', file);
    const targetFilePath = path.resolve(pluginDir, templateConfigs[file]);
    fs.copySync(sourceFilePath, targetFilePath);
    ctx.catch(() => fs.unlinkSync(targetFilePath));
    i++;
  }
  const targetPackageFilePath = path.resolve(pluginDir, 'package.json');
  if (!fs.existsSync(targetPackageFilePath)) return interactive.error(`make plugin error, missing package.json`);
  const pkg = require(targetPackageFilePath);
  pkg.name = plugin;
  pkg.version = '1.0.0';
  fs.writeFileSync(targetPackageFilePath, JSON.stringify(pkg, null, 2), 'utf8');
  interactive.success({
    prefix: '[' + pkg.name + ']',
    message: `OK, make plugin success!`,
    suffix: '(+' + i + ')'
  });
}

function checkProjectName(value) {
  return /^[a-z0-9_\-@\/]+$/.test(value);
}

async function askProject() {
  const response = await prompts({
    type: 'text',
    name: 'plugin',
    message: 'What is the name of this plugin?',
    validate: value => {
      if (checkProjectName(value)) return true;
      else return `only /^[a-z0-9_-@/]+$/ can been used.`;
    }
  });
  return response.plugin;
}