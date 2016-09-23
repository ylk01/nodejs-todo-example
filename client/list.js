import createItem from './item';

const createList = items => 
    `<table class="todo-list">
        ${items.map((item, index) => createItem(item, index)).join('')}
    </table>`;

module.exports = createList;