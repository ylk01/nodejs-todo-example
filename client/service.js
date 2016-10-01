import 'whatwg-fetch';

const delayPromise = ms => new Promise(y => setTimeout(y, ms)).then(() => console.log("after fail"));

const todoService = {
    list() {
        return fetch('/list?').then(data => data.json());
    },
    add(item) {
        return fetch('/add', {
            method: 'POST',
            body: JSON.stringify(item),
            headers: new Headers({ 'Content-Type' : 'application/json'})
        }).then(data => data.json());
    },
    remove(removeUrl) {
        return fetch(removeUrl, { method: 'POST' }).then(data => data.json());
    },
    pollChanges() {
        return fetch('/poll?', {
          headers: new Headers({
            'pragma': 'no-cache',
            'cache-control': 'no-cache'
          })
        })
          .then(data => data.json())
          .catch(error => delayPromise(2000));
    }
};

module.exports = todoService;
