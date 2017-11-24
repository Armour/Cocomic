CREATE TABLE book (
    id serial primary key,
    user_id integer NOT NULL,
    title text NOT NULL,
    cover_image text,
    description text,
    like_sum integer NOT NULL default 0 CHECK (like_sum >= 0),
    root_chapter_id integer default 0
);

CREATE TABLE chapter (
    id serial primary key,
    user_id integer NOT NULL,
    book_id integer NOT NULL,
    title text NOT NULL,
    description text,
    parent_id integer default 0,
    like_sum integer NOT NULL default 0 CHECK (like_sum >= 0),
    images text[],
    create_date timestamp NOT NULL default current_timestamp
);

CREATE INDEX book_parent_idx ON chapter (book_id, parent_id);

CREATE TABLE userinfo (
    id serial primary key,
    username text NOT NULL,
    password text NOT NULL,
    email text NOT NULL UNIQUE,
    create_date timestamp NOT NULL default current_timestamp
);

CREATE TABLE likeinfo (
    id serial primary key,
    user_id integer NOT NULL references userinfo(id),
    chapter_id integer NOT NULL references chapter(id),
    UNIQUE (user_id, chapter_id)
);

CREATE FUNCTION update_likesum() RETURNS trigger AS $update_likesum$
    BEGIN
        IF (TG_OP = 'INSERT') THEN
            UPDATE chapter SET like_sum = like_sum + 1 WHERE id = NEW.chapter_id;
            UPDATE book SET like_sum = like_sum + 1 WHERE id = (SELECT book_id FROM chapter AS c WHERE c.id = NEW.id);
        ELSIF (TG_OP = 'DELETE') THEN
            UPDATE chapter SET like_sum = like_sum - 1 WHERE id = NEW.chapter_id;
            UPDATE book SET like_sum = like_sum - 1 WHERE id = (SELECT book_id FROM chapter AS c WHERE c.id = NEW.id);
        END IF;
        RETURN NEW;
    END;
$update_likesum$ LANGUAGE plpgsql;

CREATE TRIGGER update_likesum BEFORE INSERT OR DELETE ON likeinfo
    FOR EACH ROW EXECUTE PROCEDURE update_likesum();
