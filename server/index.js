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
        return [];
    }
};

// API Endpoints
app.get('/api/products', (req, res) => {
    const products = getProducts();
    res.json(products);
});

// Mercado Pago Checkout Endpoint
// Este endpoint genera un link de pago real que lleva al usuario a Mercado Pago
app.post('/api/create-preference', (req, res) => {
    const { product } = req.body;
    
    // Aquí es donde en el futuro usarías el SDK real de Mercado Pago
    // Por ahora simularemos la respuesta que recibirás de MP
    // para que el frontend pueda redirigir al usuario.
    
    // Simulación de preferencia de pago (esto se cambia por el SDK real en producción)
    const preference = {
        id: "IKIGAI-" + Math.random().toString(36).substring(7),
        init_point: "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=12345678" // URL real de MP
    };
    
    res.json({ id: preference.id, checkout_url: preference.init_point });
});

app.get('/api/health', (req, res) => {
    res.json({ status: "online", timestamp: new Date() });
});

// STATIC ASSETS STRATEGY
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use('/images', express.static(path.join(__dirname, '../client/public/images')));

app.get('*', (req, res) => {
    const indexPath = path.join(__dirname, '../client/dist/index.html');
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.status(404).send("Frontend not built yet.");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
