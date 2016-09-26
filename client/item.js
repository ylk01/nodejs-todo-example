const createItem = ({ text }, index) => 
    `<tr class="todo-item">
        <td>${text}</td>
        <td><button onclick="actions.remove(${index})">delete</button></td>
    </tr>`;

module.exports = createItem;
