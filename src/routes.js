import express from 'express';
import db from './database.js';

const router = express.Router();


//api create user
router.post('/', (req, res) => {
    const {name, email} = req.body;
    db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], function(err){
        if (err) {
            return res.status(500).json({error: err.message});
        }
        res.json({id: this.lastID, name, email});
    });
})

//api read users
router.get('/', (req, res) => {
    db.all('SELECT* FROM users', [], (err, rows) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        res.json(rows);
    });
});

//api read user by id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.get('SELECT* FROM users WHERE id = ?',  [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(row);
    });
});

// api update user
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const {name, email } = req.body;
    db.run('UPDATE users SET name = ? , email = ? WHERE id = ?', [name, email, id], function(err) {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        res.json({ id, name, email });
    });
});

// api Delete user
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM users WHERE id = ?', [id], function(err){
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({message: 'User deleted'});
    });
});

export default router;