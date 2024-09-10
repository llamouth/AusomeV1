\c ausome_dev;

CREATE TABLE IF NOT EXISTS resources (
    id SERIAL PRIMARY KEY,
    url TEXT NOT NULL,
    category VARCHAR(255),
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE, 
    description VARCHAR(255)
);