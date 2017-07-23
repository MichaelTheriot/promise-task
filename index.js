'use strict';

const store = new WeakMap();

const Task = class extends Promise {
  constructor(executor) {
    let resolve, reject;
    super((subResolve, subReject) => {
      resolve = subResolve;
      reject = subReject;
      if (arguments.length) {
        executor(resolve, reject);
      }
    });
    store.set(this, {resolve, reject});
  }

  resolve(value) {
    store.get(this).resolve(value);
  }

  reject(value) {
    store.get(this).reject(value);
  }
};

module.exports = Task;
