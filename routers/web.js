// web.js

const express = require('express');
const web = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
  user: 'your_username',
  host: 'localhost',
  database: 'mydatabase',
  password: 'your_password',
  port: 5432,
});

// GET all items and render the web page
web.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM items');
    res.render('index', { items: rows });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).send('Internal Server Error');
  }
});

// GET a specific item and render a detailed view
web.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query('SELECT * FROM items WHERE id = $1', [id]);

    if (rows.length === 1) {
      res.render('itemDetail', { item: rows[0] });
    } else {
      res.status(404).send('Item not found');
    }
  } catch (error) {
    console.error('Error fetching item details:', error);
    res.status(500).send('Internal Server Error');
  }
});

// POST a new item
web.post('/', async (req, res) => {
  const { name, description } = req.body;
  try {
    await pool.query('INSERT INTO items(name, description) VALUES($1, $2)', [name, description]);
    res.status(201).send('Item added successfully');
  } catch (error) {
    console.error('Error adding item:', error);
    res.status(500).send('Internal Server Error');
  }
});

// PUT (Update) an item
web.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    await pool.query('UPDATE items SET name=$1, description=$2 WHERE id=$3', [name, description, id]);
    res.send('Item updated successfully');
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).send('Internal Server Error');
  }
});

// PATCH (Partial Update) an item
web.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    await pool.query('UPDATE items SET name=$1, description=$2 WHERE id=$3', [name, description, id]);
    res.send('Item partially updated successfully');
  } catch (error) {
    console.error('Error partially updating item:', error);
    res.status(500).send('Internal Server Error');
  }
});

// DELETE an item
web.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM items WHERE id=$1', [id]);
    res.send('Item deleted successfully');
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = web;
