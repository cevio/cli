const path = require('path');
const Catcher = require('@clusic/catch');
const baseVar = Symbol('require.base');
module.exports = class Client {
  constructor(base, util, pkg) {
    this[baseVar] = base;
    this.util = util;
    this.pkg = pkg;
  }

  require(pather, ...middlewares) {
    return (...args) => {
      const fileExports = require(path.resolve(this[baseVar], pather));
      middlewares = middlewares.map(middleware => {
        if (typeof middleware === 'string') return require(path.resolve(this[baseVar], middleware));
        return middleware;
      });
      if (typeof fileExports === 'function') {
        Catcher(async roll => {
          this.catch = roll;
          for (let i = 0; i < middlewares.length; i++) await middlewares[i](this, ...args);
          await fileExports(this, ...args);
          process.exit(0);
        });
      }
    }
  }
}