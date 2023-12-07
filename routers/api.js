// api.js

const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const { Pool } = require('pg');

const api = express.Router();
const pool = new Pool({
  user: 'your_username',
  host: 'localhost',
  database: 'mydatabase',
  password: 'your_password',
  port: 5432,
});

api.use(bodyParser.urlencoded({ extended: true }));
api.use(methodOverride('_method'));

// GET all items
api.get('/items', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM items');
  res.json(rows);
});

// GET a specific item
api.get('/items/:id', async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query('SELECT * FROM items WHERE id = $1', [id]);

  if (rows.length === 1) {
    res.json(rows[0]);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

// POST a new item
api.post('/items', async (req, res) => {
  const { name, description } = req.body;
  await pool.query('INSERT INTO items(name, description) VALUES($1, $2)', [name, description]);
  res.status(201).json({ message: 'Item added successfully' });
});

// PUT (Update) an item
api.put('/items/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  await pool.query('UPDATE items SET name=$1, description=$2 WHERE id=$3', [name, description, id]);
  res.json({ message: 'Item updated successfully' });
});

// PATCH (Partial Update) an item
api.patch('/items/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  await pool.query('UPDATE items SET name=$1, description=$2 WHERE id=$3', [name, description, id]);
  res.json({ message: 'Item partially updated successfully' });
});

// DELETE an item
api.delete('/items/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM items WHERE id=$1', [id]);
  res.json({ message: 'Item deleted successfully' });
});

module.exports = api;
