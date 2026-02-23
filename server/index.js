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
    const products = getProducts();
    res.json(products);
});

app.get('/api/health', (req, res) => {
    res.json({ status: "online", timestamp: new Date() });
});

// STATIC ASSETS STRATEGY
// 1. Try to serve from 'dist' first (Production / Render)
app.use(express.static(path.join(__dirname, '../client/dist')));

// 2. Serve images - prioritizing the build folder, falling back to public
app.use('/images', express.static(path.join(__dirname, '../client/dist/images')));
app.use('/images', express.static(path.join(__dirname, '../client/public/images')));

// Fallback for SPA (Single Page Application)
app.get('*', (req, res) => {
    const indexPath = path.join(__dirname, '../client/dist/index.html');
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.status(404).send("Frontend not built yet. Run 'npm run build' in client directory or check deployment logs.");
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
