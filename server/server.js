const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/portfolioDB')
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// Route test
app.get('/', (req, res) => {
    res.send("Server is running");
});

// Start server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});

//Creat API route
const Contact = require('./models/Contact');

app.post('/contact', async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save();
        res.status(200).json({ message: "Message saved!" });
    } catch (error) {
        res.status(500).json({ error: "Error saving message" });
    }
});

app.get('/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ error: "Error fetching data" });
    }
});


