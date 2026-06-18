require('dotenv').config();

const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static('../'));
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/../index.html");
});

const db = new sqlite3.Database('./database.db', (err) => {

    if (err) {
        console.log(err.message);
    } else {
        console.log("SQLite Connected!");
    }

});
db.run(`
CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    message TEXT
)
`);

app.get('/', (req, res) => {

    res.send("Server running!");

});

app.post('/contact', (req, res) => {

    const { name, email, message } = req.body;

    db.run(

        `INSERT INTO contacts(name,email,message)
         VALUES(?,?,?)`,

        [name, email, message],

        function(err) {

            if (err) {

                return res.status(500).json({
                    message: "Error saving message"
                });

            }

            res.status(200).json({
                message: "Message sent successfully!"
            });

        }

    );

});

app.get('/contacts', (req, res) => {

    db.all(

        `SELECT * FROM contacts`,

        [],

        (err, rows) => {

            if (err) {

                return res.status(500).json(err);

            }

            res.json(rows);

        }

    );

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});