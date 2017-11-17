CREATE TABLE book (
    id serial primary key,
    title text NOT NULL,
    cover_image text,
    description text,
    root_chapter_id integer NOT NULL
);

CREATE TABLE chapter (
    id serial primary key,
    user_id integer NOT NULL,
    book_id integer NOT NULL,
    title text NOT NULL,
    description text,
    parent_id integer,
    like_sum integer NOT NULL default 0,
    depth integer NOT NULL default 0,
    images text[],
    create_date timestamp NOT NULL default current_timestamp
);

CREATE INDEX book_parent_idx ON chapter (book_id, parent_id);

CREATE TABLE userinfo (
    id serial primary key,
    username text NOT NULL,
    password text NOT NULL,
    create_date timestamp NOT NULL default current_timestamp
);
ALTER TABLE userinfo ADD COLUMN email text NOT NULL UNIQUE;
INSERT INTO userinfo(username, email, password) VALUES('Kingston', 'k@k.com', 'docker');
INSERT INTO book(title, cover_image, description, root_chapter_id)
    VALUES('Conan Escalar Montañas', 'sample-1', 'Conan escalar montañas todos los sábados.', 1);

INSERT INTO chapter(user_id, book_id, title, description, like_sum, depth, images)
    VALUES(1, 1, 'Conan Prepara el Equipaje', 'Conan hace la maleta y reserve un habitación individual', 23, 1, '{"sample-1", "sample-1"}');

INSERT INTO chapter(user_id, book_id, title, description, parent_id, like_sum, depth, images)
    VALUES(1, 1, 'Conan Va a las Montañas', 'Conan compra un pasaje de avión y llega al aeropuerte', 1, 23, 2, '{"sample-1", "sample-1"}');
