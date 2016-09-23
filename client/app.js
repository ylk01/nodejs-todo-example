import { todoService } from './service';
import createList from './list';
import createFlash from './flash';

const listUI = document.querySelector('#todo-list');
const inputUI = document.querySelector('#new-todo');

const flash = createFlash(document.querySelector('#flash'));
        
const updateList = () => {
     todoService.list()
        .then(items => { listUI.innerHTML = createList(items); });
};

window.actions = {
    newToDo() {
        todoService.add({ text: inputUI.value }).then(() => {
            inputUI.value = null;
            flash('added successfully!');
            updateList();
        });
        
    },
    deleteItem(index) {
        todoService.remove(index).then(() => {
            flash('removed successfully!');
            updateList();
        });
    }
};

updateList();