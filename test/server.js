/* eslint-env mocha */

require('chai').should();

const todos = require('../server/todos');

describe('todo-server', () => {
  it('should be an object', () => {
    todos.should.be.an('object');
  });

  it('should have an add method', () => {
    todos.add.should.be.a('function');
  });

  describe('add(item)', () => {
    it('should throw without an item', () => {
      todos.add.should.throw();
    });
  });
});
