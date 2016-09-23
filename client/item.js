const createItem = ({ text }, index) => 
    `<tr class="todo-item">
        <td>${text}</td>
        <td><button onclick="actions.deleteItem(${index})">delete</button></td>
    </tr>`;

module.exports = createItem;
