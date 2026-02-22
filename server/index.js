const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const fakeDb = [
    {
        "id": 1,
        "name": "Satoru Gojo - Hollow Purple",
        "anime": "Jujutsu Kaisen",
        "price": 85000,
        "image_url": "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?auto=format&fit=crop&q=80&w=1000",
        "stock": 5
    },
    {
        "id": 2,
        "name": "Monkey D. Luffy - Gear 5",
        "anime": "One Piece",
        "price": 92000,
        "image_url": "https://images.unsplash.com/photo-1615657973599-990d6e048704?auto=format&fit=crop&q=80&w=1000",
        "stock": 2
    },
    {
        "id": 3,
        "name": "Denji & Pochita",
        "anime": "Chainsaw Man",
        "price": 60000,
        "image_url": "https://images.unsplash.com/photo-1681285265437-023a9a1496a7?auto=format&fit=crop&q=80&w=1000",
        "stock": 10
    },
    {
        "id": 4,
        "name": "Son Goku - Kaio-ken",
        "anime": "Dragon Ball Z",
        "price": 75000,
        "image_url": "https://images.unsplash.com/photo-1534333230407-b755ed46955d?auto=format&fit=crop&q=80&w=1000",
        "stock": 10
    },
    {
        "id": 5,
        "name": "Naruto Uzumaki - Rasengan",
        "anime": "Naruto Shippuden",
        "price": 70000,
        "image_url": "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?auto=format&fit=crop&q=80&w=1000",
        "stock": 8
    },
    {
        "id": 6,
        "name": "Eren Yeager - Attack Titan",
        "anime": "Attack on Titan",
        "price": 88000,
        "image_url": "https://images.unsplash.com/photo-1608889175123-8ee362201f81?auto=format&fit=crop&q=80&w=1000",
        "stock": 4
    },
    {
        "id": 7,
        "name": "Tanjiro Kamado - Hinokami Kagura",
        "anime": "Demon Slayer",
        "price": 82000,
        "image_url": "https://images.unsplash.com/photo-1601850494422-3cf14624b0bb?auto=format&fit=crop&q=80&w=1000",
        "stock": 6
    }
];

// API Endpoints
app.get('/api/products', (req, res) => {
    res.json(fakeDb);
});

app.get('/api/health', (req, res) => {
    res.json({ status: "online" });
});

// Serve static files from the React app
const path = require('path');
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
