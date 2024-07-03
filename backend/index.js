const express = require('express');
const con = require('./config.js');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    con.query('SELECT * FROM student', (err, result) => {
        if (err) res.json({ err, message: 'Error Inside Server' });
        else res.json(result);
    })  
});

app.get('/:id', (req, res) => {
    con.query('SELECT * FROM student WHERE id=?', [req.params.id],
        (err, result) => {
            if (err) res.json({ err, message: 'Error Inside Server' });
            else res.json(result);
        }
    )
});

app.post('/create', (req, res) => {
    const data = req.body;
    con.query('INSERT INTO student SET ?', data, (err, result) => {
        if (err) res.json({ err, message: 'Error Inside Server' });
        else res.json({ message: 'User Creatd Successfully', result });
    })
});

app.put('/update/:id', (req, res) => {
    const { name, email, phone } = req.body;
    con.query('UPDATE student SET name=?, email=?, phone=? WHERE id=?',
        [name, email, phone, req.params.id],
        (err, result) => {
            if (err) res.json({ err, message: 'Error Inside Server' });
            else res.json({ message: 'User Updated Successfully', result });
        }
    )
});

app.delete('/delete/:id', (req, res) => {
    con.query('DELETE FROM student WHERE id=?', req.params.id,
        (err, result) => {
            if (err) res.json({ err, message: 'Error Inside Server' });
            else res.json({ message: 'User Deleted Successfully', result });
        }
    )
})


app.listen(port, (err) => {
    if (!err) console.log(`Server IS Running ON ${port}...`);
});