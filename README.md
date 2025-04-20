Candidate Management API

This is a simple RESTful API for managing candidate data, built with Node.js, Express, and PostgreSQL.

Features

- Add a new candidate (POST)
- Update existing candidate by email (POST)
- Retrieve all candidates (GET)

Technologies Used

- Node.js
- Express
- PostgreSQL
- pg (PostgreSQL client for Node.js)

Setup Instructions

1. Clone the Repository

```bash
git clone https://github.com/abdalrhman010/canapi
cd candidate-api/api1
```

2. Install Dependencies

```bash
npm install
```

3. Configure PostgreSQL

- Create a PostgreSQL database named `candidates_db`
- Create the table using the following SQL:

```sql
CREATE TABLE candidates (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  email VARCHAR(255) UNIQUE NOT NULL,
  phone_number VARCHAR(20),
  preferred_call_time VARCHAR(100),
  linkedin_url TEXT,
  github_url TEXT,
  comment TEXT
);
```

- Update the PostgreSQL connection credentials in `server.js`:

```js
const pool = new Pool({
  user: 'your_user',
  host: 'localhost',
  database: 'candidates_db',
  password: 'your_password',
  port: 5432,
});
```

### 4. Run the Server

```bash
node server.js
```

The server should start at: `http://localhost:3000`

## API Endpoints

### GET /candidates

- Description: Retrieves a list of all candidates.
- Response: JSON array of candidate objects.

### POST /candidates

- Description: Adds a new candidate or updates an existing one (matched by email).
- Body (JSON):

```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "phone_number": "123456789",
  "preferred_call_time": "Evening",
  "linkedin_url": "https://linkedin.com/in/johndoe",
  "github_url": "https://github.com/johndoe",
  "comment": "Great developer"
}
```

## Testing

You can use Postman to test the API endpoints.

- GET `http://localhost:3000/candidates`
- POST `http://localhost:3000/candidates` with JSON body

## Assumptions & Suggestions

- The email field is used as a unique identifier.
- Error handling is minimal and can be expanded.
- In future, consider separating PUT and POST methods explicitly.
- Add input validation and authentication for production use.

## Time Spent

Approximately: **13 hours** (replace with your actual time)

## License

This project is for demonstration purposes and does not include a license by default.

