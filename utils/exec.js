const { spawn } = require('child_process');
module.exports = function exec(name, actions, cwd) {
  return new Promise((resolve, reject) => {
    let closing = false, timer = null;
    const ls = spawn(name, actions, {
      cwd: cwd,
      stdio: 'inherit'
    });
    ls.on('close', (code) => {
      clearInterval(timer);
      process.off('SIGINT', close);
      process.off('SIGQUIT', close);
      process.off('SIGTERM', close);
      if (code === 0) return resolve();
      reject(new Error(`child process exited with code ${code}`));
      if (closing) {
        process.exit(0);
      }
    });
    process.on('SIGINT', close);
    process.on('SIGQUIT', close);
    process.on('SIGTERM', close);
    function close() {
      if (closing) return;
      closing = true;
      timer = setInterval(() => {}, 10);
    }
  })
}