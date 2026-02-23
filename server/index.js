const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Helper function to get products from JSON
const getProducts = () => {
    try {
        const data = fs.readFileSync(path.join(__dirname, 'products.json'), 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading products.json:", error);
        return [];
    }
};

// API Endpoints
app.get('/api/products', (req, res) => {
    try {
        const products = getProducts();
        if (!products || products.length === 0) {
            throw new Error("No products found in products.json");
        }
        res.header("Access-Control-Allow-Origin", "*"); // Forzar acceso
        res.json(products);
    } catch (error) {
        console.error("API Error:", error.message);
        res.status(500).json({ error: "Failed to load products", details: error.message });
    }
});

app.get('/api/health', (req, res) => {
    res.json({ status: "online", timestamp: new Date() });
});

// STATIC ASSETS STRATEGY
// Serve all built assets from the frontend's dist folder
// This includes index.html, JS, CSS AND the 'images' folder (which Vite copies there)
app.use(express.static(path.join(__dirname, '../client/dist')));

// Fallback for SPA (Single Page Application)
app.get('*', (req, res) => {
    const indexPath = path.join(__dirname, '../client/dist/index.html');
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.status(404).send("<h1>Frontend not found</h1><p>Run 'npm run build' in client folder.</p>");
    }
});

app.listen(PORT, () => {
    console.log(`
🚀 IKIGAI SERVER RUNNING
-------------------------
Port: ${PORT}
API: http://localhost:${PORT}/api/products
Health: http://localhost:${PORT}/api/health
    `);
});
