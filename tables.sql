	CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT,
  username TEXT,
  password TEXT,
  personality TEXT,
  photo_url TEXT
);

		CREATE TABLE IF NOT EXISTS book (
  id SERIAL PRIMARY KEY,
  owner_id INTEGER,
  title TEXT,
  description TEXT,
  thumbnail TEXT,
  progress INTEGER DEFAULT 0
);