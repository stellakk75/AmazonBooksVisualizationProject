CREATE TABLE authors (
author_id	INTEGER primary key,
author_name VARCHAR(1000)	
);

CREATE TABLE books(
book_id INTEGER primary key,
book_name	VARCHAR(1000),
author_id INTEGER REFERENCES authors(author_id));

CREATE TABLE books_details(
book_id	INTEGER REFERENCES books(book_id),
reviews INTEGER,
rating	NUMERIC,
price		NUMERIC,
year	INTEGER,
genre			VARCHAR(50)	
);
