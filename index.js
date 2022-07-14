const express = require('express');
const app = express();
const port = 8080;

const database = new require('database.js')();

app.post('/entities/show', (req, res) => {
});

app.post('/entities/index', (req, res) => {
});

app.post('/entities/update', (req, res) => {
});

app.post('/entities/create', (req, res) => {
    database.create()
});

app.post('/entities/delete', (req, res) => {
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
