import { todoService } from './service';
import createList from './list';
import createFlash from './flash';
import renderForm from './form';

const renderList = createList(document.querySelector('#todo-list'));

const flash = createFlash(document.querySelector('#flash'));

const list = () => todoService.list().then(renderList);

const add = text => todoService.add({ text })
                            .then(flash('added successfully!'))
                            .then(list);

const remove = index => todoService.remove(index)
                            .then(flash('removed successfully!'))
                            .then(list);

const mainLoop = () => todoService.pollChanges()
                            .then(list)
                            .then(mainLoop);


window.actions = { add, remove };

list();
mainLoop();
renderForm(document.querySelector('#todo-form'));

