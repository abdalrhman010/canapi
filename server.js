const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'candidates_db',
  password: 'aaaaaa', // ← عدل هنا بالباسورد الحقيقي
  port: 5432,
});

app.get('/', (req, res) => {
  res.send('Welcome to API - listening on http://localhost:3000');
});

app.get('/candidates', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM candidates');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching candidates');
  }
});

app.post('/candidates', async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    phone_number,
    preferred_call_time,
    linkedin_url,
    github_url,
    comment
  } = req.body;

  try {
    const existing = await pool.query('SELECT * FROM candidates WHERE email = $1', [email]);

    if (existing.rows.length > 0) {
      // Update
      await pool.query(
        `
        UPDATE candidates SET
          first_name = $1,
          last_name = $2,
          phone_number = $3,
          preferred_call_time = $4,
          linkedin_url = $5,
          github_url = $6,
          comment = $7
        WHERE email = $8
        `,
        [first_name, last_name, phone_number, preferred_call_time, linkedin_url, github_url, comment, email]
      );
      res.json({ message: 'Candidate updated successfully' });
    } else {
      // Insert
      await pool.query(
        `
        INSERT INTO candidates
          (first_name, last_name, email, phone_number, preferred_call_time, linkedin_url, github_url, comment)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `,
        [first_name, last_name, email, phone_number, preferred_call_time, linkedin_url, github_url, comment]
      );
      res.json({ message: 'Candidate added successfully' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving candidate');
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Welcome to API - listening on http://localhost:${PORT}`);
});
