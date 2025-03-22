import express from "express";
import productRoutes from './routes/products.js';

const app = express();
const port = 3000;

app.use(express.json());

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(__dirname));

app.use('/products', productRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});
