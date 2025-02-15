// Name: Adarsh Thekkekulathingal Kuriyachan
// Student ID: 100925209
// Course: Web Development - CSS
// file: product.service.mock.js
// Description: This is my product.service.mock.js for the product shop.

// /client/app/products/product.service.mock.js
import Product from './product.js';

class ProductService {
    constructor() {
        this.products = this.loadProducts();
    }

    loadProducts() {
        const products = localStorage.getItem('products');
        const parsedProducts = products ? JSON.parse(products) : [];
        return parsedProducts.map(p => {
            const product = new Product(p.name, p.description, p.stock, p.price);
            product.id = p.id; 
            return product;
        });
    }


    saveProducts() {
        localStorage.setItem('products', JSON.stringify(this.products));
    }


    addProduct(product) {
        this.products.push(product);
        this.saveProducts();
    }


    getProducts() {
        return this.products;
    }


    deleteProduct(id) {
        this.products = this.products.filter(product => product.id !== id);
        this.saveProducts();
    }

    
    updateProduct(id, updatedProduct) {
        this.products = this.products.map(product => 
            product.id === id ? updatedProduct : product
        );
        this.saveProducts();
    }
}

export default new ProductService();