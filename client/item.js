import escape from 'escape-html';

const createItem = ({ text, removeUrl }) =>
    `<tr class="todo-item">
        <td>${escape(text)}</td>
        <td><button onclick="actions.remove('${removeUrl}')">delete</button></td>
    </tr>`;

module.exports = createItem;
