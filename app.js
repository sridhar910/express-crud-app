// app.js
// ExpressJS app with GET, POST, PUT, DELETE routes

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON body
app.use(bodyParser.json());

// In-memory data store
let items = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" }
];

// GET all items
app.get('/items', (req, res) => {
    res.status(200).json(items);
});

// POST a new item
app.post('/items', (req, res) => {
    const { name } = req.body;
    if(!name) {
        return res.status(400).send('Name is required');
    }
    const newItem = { id: items.length + 1, name };
    items.push(newItem);
    res.status(201).json(newItem);
});

// PUT (update) an item by id
app.put('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;
    const item = items.find(i => i.id === id);
    if(!item) {
        return res.status(404).send('Item not found');
    }
    item.name = name || item.name;
    res.status(200).json(item);
});

// DELETE an item by id
app.delete('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = items.findIndex(i => i.id === id);
    if(index === -1) {
        return res.status(404).send('Item not found');
    }
    const deletedItem = items.splice(index, 1);
    res.status(200).json(deletedItem);
});

// Start server
app.listen(port, () => {
    console.log(`Express app running at http://localhost:${port}/`);
});
