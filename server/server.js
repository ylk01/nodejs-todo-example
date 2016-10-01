'use strict';

const fs = require('fs');

const express = require('express');
const bodyparser = require('body-parser');

const indexHTML = fs.readFileSync('./dist/ready/index.html');
const appJS = fs.readFileSync('./dist/ready/app.js');

const todos = require('./todos');

const polling = require('./polling');

const app = express();

const listWithActions = () => todos.list().map(item => {
  item.removeUrl = `/remove/${item.id}`;
  return item;
});

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
    res.json(listWithActions());
});

app.get('/poll', (req, res) => {
    const unsubscribe = polling.subscribe(message => res.json(message));
    req.on('abort', unsubscribe);
    req.on('aborted', unsubscribe);
});

app.post('/add', (req, res) => {
    const item = { text: req.body.text };
    const message = { message: "added successfully" };
    todos.add(item);
    res.json(message);
    polling.publish(listWithActions());
});

app.post('/remove/:id', (req, res) => {
    const id = req.params.id;
    const message = { message: "removed successfully" };
    todos.remove(id);
    res.json(message);
    polling.publish(listWithActions());
});

app.listen(6701);
