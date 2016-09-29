const polling = new Set();

module.exports = {
    subscribe(callback) {
        polling.add(callback);
        return () => polling.delete(callback);
    },
    publish(message) {
      polling.forEach(cb => cb(message));
    }
};
