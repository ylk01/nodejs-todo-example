import todoService from './service';
import loginService from './login';
import createList from './list';
import createFlash from './flash';
import renderForm from './form';
import createUserPanel from './user';

const renderUser = createUserPanel(document.querySelector('#user-panel'));

const renderList = createList(document.querySelector('#todo-list'));

const flash = createFlash(document.querySelector('#flash'));

const list = () => todoService.list().then(renderList);

const add = text => todoService.add({ text })
                            .then(flash('added successfully!'));

const remove = removeUrl => todoService.remove(removeUrl)
                            .then(flash('removed successfully!'));

const mainLoop = () => todoService.pollChanges()
                            .then(renderList)
                            .then(mainLoop);

window.actions = { add, remove, login: loginService.promptLogin, logout: loginService.logout };

loginService.getLoggedInUser().then(renderUser);
loginService.onLogin(renderUser);

list();
mainLoop();
renderForm(document.querySelector('#todo-form'));
