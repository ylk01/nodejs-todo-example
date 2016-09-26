import 'whatwg-fetch';

const apiURL = 'http://192.168.7.145:6701';
const todoService = {
    list() {
        return fetch(apiURL + '/list').then(data => data.json());
    },
    add(item) {
        return fetch(apiURL + '/add', {
            method: 'POST',
            body: JSON.stringify(item),
            headers: new Headers({ 'Content-Type' : 'application/json'})
        }).then(data => data.json());
    },
    remove(index) {
        return fetch(apiURL + '/remove/' + index, { method: 'POST' }).then(data => data.json());
    },
    pollChanges() {
        return fetch(apiURL + '/poll');
    }
};


//mock service
const items = [
    { text: "item 1" },
    { text: "item 2" },
    { text: "get milk" }
];

const mockService = {
    list() {
        return Promise.resolve(items);
    },
    add(item) {
        items.push(item);
        return Promise.resolve({message: "added successfully"});
    },
    remove(index) {
        items.splice(index, 1);
        return Promise.resolve({message: "removed successfully"});
    }
}

module.exports = { todoService, mockService };
