module.exports = async ctx => {
  const path = process.cwd();
  await ctx.util.exec('cli', ['install', path]);
}