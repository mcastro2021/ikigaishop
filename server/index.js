const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Accurate catalog data based on high-quality anime figures
const fakeDb = [
    {
        "id": 1,
        "name": "Satoru Gojo - Shibuya Incident Ver.",
        "anime": "Jujutsu Kaisen",
        "price": 145000,
        "image_url": "https://m.media-amazon.com/images/I/61M9R-1p8GL._AC_SL1500_.jpg",
        "stock": 3
    },
    {
        "id": 2,
        "name": "Monkey D. Luffy - Gear 5 High Spec",
        "anime": "One Piece",
        "price": 185000,
        "image_url": "https://m.media-amazon.com/images/I/71Xm0E67e2L._AC_SL1500_.jpg",
        "stock": 2
    },
    {
        "id": 3,
        "name": "Roronoa Zoro - Enma King of Hell",
        "anime": "One Piece",
        "price": 160000,
        "image_url": "https://m.media-amazon.com/images/I/71rI9f7p0HL._AC_SL1200_.jpg",
        "stock": 5
    },
    {
        "id": 4,
        "name": "Naruto Uzumaki - Sage Mode Kizuna",
        "anime": "Naruto Shippuden",
        "price": 120000,
        "image_url": "https://m.media-amazon.com/images/I/61k8u09r-sL._AC_SL1200_.jpg",
        "stock": 8
    },
    {
        "id": 5,
        "name": "Zenitsu Agatsuma - Thunder Breathing",
        "anime": "Demon Slayer",
        "price": 95000,
        "image_url": "https://m.media-amazon.com/images/I/71Y-oR9Y-4L._AC_SL1500_.jpg",
        "stock": 10
    },
    {
        "id": 6,
        "name": "Power - Bunny Ver. 1/4 Scale",
        "anime": "Chainsaw Man",
        "price": 320000,
        "image_url": "https://m.media-amazon.com/images/I/61dI+N4-k4L._AC_SL1500_.jpg",
        "stock": 1
    },
    {
        "id": 7,
        "name": "Eren Yeager - Final Season Attack Titan",
        "anime": "Attack on Titan",
        "price": 140000,
        "image_url": "https://m.media-amazon.com/images/I/71Y-oR9Y-4L._AC_SL1500_.jpg",
        "stock": 4
    },
    {
        "id": 8,
        "name": "Megumi Fushiguro - Divine Dog Totality",
        "anime": "Jujutsu Kaisen",
        "price": 110000,
        "image_url": "https://m.media-amazon.com/images/I/61z-v6M0-iL._AC_SL1200_.jpg",
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
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
