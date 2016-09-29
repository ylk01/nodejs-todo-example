import createItem from './item';

const createList = element => items =>
     element.innerHTML = `<table class="todo-list">
        ${items.map(item => createItem(item)).join('')}
    </table>`;

module.exports = createList;
