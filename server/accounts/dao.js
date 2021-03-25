import dotenv from 'dotenv';
dotenv.config();

import pg from 'pg';

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
client.connect();

// TODO: Use database
const users = [
  {
    id: '1',
    email: 'first@gmail.com',
    password: 'password',
  },
  {
    id: '2',
    email: 'second@gmail.com',
    password: 'password',
  },
];

export function testDB() {
  client.query('SELECT table_schema, table_name FROM information_schema.tables;', (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
    }
    client.end();
  });
}

export function findUser(email, password) {
  if (isFinite(email)) {
    const userId = email;
    return users.find((user) => user.id === userId);
  }
  if (password == null) {
    return users.find((user) => user.email === email);
  }
  return users.find((user) => user.email === email && user.password === password);
}
