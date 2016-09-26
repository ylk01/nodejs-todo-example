const items = [];

module.exports = {
      add(item) {
          items.push(item);          
      },
      remove(index) {
          items.splice(index, 1);
      },
      list() {
          return items;
      }
};
