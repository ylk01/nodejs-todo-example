'use strict';

const fs = require('fs');
const express = require('express');
const bodyparser = require('body-parser');

const indexHTML = fs.readFileSync('./dist/ready/index.html');
const appJS = fs.readFileSync('./dist/ready/app.js');

const app = express();

let hooks = [];
const items = [],
      addItem = item => {
          items.push(item);
          hooks.forEach(hook => hook());
          hooks = [];
      },
      removeItem = index => {
          items.splice(index, 1);
          hooks.forEach(hook => hook());
          hooks = [];
      };

app.use(bodyparser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
    res.end(indexHTML);
});

app.get('/app.js', (req, res) => {
    res.end(appJS);
});

app.get('/list', (req, res) => {
    res.json(items);
});

app.get('/polling', (req, res) => {
    hooks.push(() => {
        res.send('1');
    });
});

app.post('/add', (req, res) => {
    const item = { text: req.body.text };
    addItem(item);
    res.json({message: "added successfully"});
});

app.post('/remove/:id', (req, res) => {
    const index = req.params.id;
    removeItem(index);
    res.json({message: "removed successfully"});
});

app.listen(6701);