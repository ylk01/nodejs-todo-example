'use strict';

const polling = new Set();

module.exports = {
    subscribe(callback) {
        polling.add(callback);
        return () => {
          callback.DONE = true;
        };
    },
    publish(message) {
      polling.forEach(cb => {
        if (cb.DONE !== true) {
          cb(message);
        }
      });
      polling.clear();
    }
};
