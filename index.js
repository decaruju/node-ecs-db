const express = require('express');
const app = express();
const port = 8080;

const database = require('./main-database.js');

app.use(express.json());

app.post('/entities/show', (req, res) => {
});

app.post('/entities/index', (req, res) => {
    const componentNames = req.body.componentNames;
    const entities = database.index(componentNames);
    res.send({ entities });
});

app.post('/entities/update', (req, res) => {
});

app.post('/entities/create', (req, res) => {
    const entity = database.create();
    res.send({ entity });
});

app.post('/entities/delete', (req, res) => {
});

app.post('/index/create', (req, res) => {
    const componentNames = req.body.componentNames;
    database.addIndex(componentNames);
    res.send({ success: true });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

module.exports = app;
