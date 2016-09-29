const createItem = ({ text, removeUrl }) =>
    `<tr class="todo-item">
        <td>${text}</td>
        <td><button onclick="actions.remove('${removeUrl}')">delete</button></td>
    </tr>`;

module.exports = createItem;
