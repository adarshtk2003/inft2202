import express from "express";
import productRoutes from './routes/products.js';

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.static('client'));

// Routes
app.use('/api/products', productRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});
