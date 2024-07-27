import sqlite from 'sqlite3';

const sqlite3 = sqlite.verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run('CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, email TEXT)');
});

export default db;