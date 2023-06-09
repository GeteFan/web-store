CREATE TABLE store_pages (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  active BOOLEAN DEFAULT TRUE
);

CREATE TABLE store_page_items (
  id SERIAL PRIMARY KEY,
  store_page_id INTEGER REFERENCES store_pages(id),
  name TEXT NOT NULL,
  collected BOOLEAN DEFAULT FALSE
);