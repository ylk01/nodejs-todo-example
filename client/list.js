import createItem from './item';

const createList = element => items => 
     element.innerHTML = `<table class="todo-list">
        ${items.map((item, index) => createItem(item, index)).join('')}
    </table>`;

module.exports = createList;