DROP TABLE if EXISTS todos;
CREATE TABLE IF NOT EXISTS todos(
  id SERIAL PRIMARY KEY,
  name VARCHAR(24) NOT NULL,
  description TEXT NOT NULL UNIQUE
);


DROP TABLE if EXISTS completed;
CREATE TABLE IF NOT EXISTS completed(
  id SERIAL PRIMARY KEY,
  name VARCHAR(24) NOT NULL,
  description TEXT NOT NULL UNIQUE
);

DROP TABLE if EXISTS todo_complete;
CREATE TABLE IF NOT EXISTS todo_complete(
  todo_id INTEGER REFERENCES todos(id),
  completed_id INTEGER REFERENCES completed(id)
);
