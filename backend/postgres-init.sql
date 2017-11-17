CREATE TABLE book (
    id serial primary key,
    title text NOT NULL,
    cover_image text,
    description text,
    root_node_id integer NOT NULL
);

CREATE TABLE node (
    id serial primary key,
    user_id integer NOT NULL,
    book_id integer NOT NULL,
    parent_id integer,
    like_sum integer NOT NULL default 0,
    images text[],
    create_date timestamp NOT NULL default current_timestamp
);

CREATE TABLE userinfo (
    id serial primary key,
    username text NOT NULL,
    password text NOT NULL,
    create_date timestamp NOT NULL default current_timestamp
);
ALTER TABLE userinfo ADD COLUMN email text NOT NULL UNIQUE;