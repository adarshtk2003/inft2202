import express from 'express';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dataPath = join(__dirname, '../data/products.json');

// GET all products
router.get('/', (req, res) => {
    const products = JSON.parse(readFileSync(dataPath));
    res.json(products);
});

// GET product by ID
router.get('/:id', (req, res) => {
    const products = JSON.parse(readFileSync(dataPath));
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
});

// POST new product
router.post('/', (req, res) => {
    const products = JSON.parse(readFileSync(dataPath));
    const newProduct = {
        id: products.length + 1,
        ...req.body,
        listedAt: new Date().toISOString()
    };
    products.push(newProduct);
    writeFileSync(dataPath, JSON.stringify(products, null, 2));
    res.status(201).json(newProduct);
});

// PUT update product
router.put('/:id', (req, res) => {
    const products = JSON.parse(readFileSync(dataPath));
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Product not found' });
    products[index] = { ...products[index], ...req.body };
    writeFileSync(dataPath, JSON.stringify(products, null, 2));
    res.json(products[index]);
});

// DELETE product
router.delete('/:id', (req, res) => {
    const products = JSON.parse(readFileSync(dataPath));
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Product not found' });
    products.splice(index, 1);
    writeFileSync(dataPath, JSON.stringify(products, null, 2));
    res.status(204).send();
});

export default router;