INSERT INTO userinfo(username, email, password) VALUES('Kingston', 'k@k.com', 'docker');
INSERT INTO book(title, cover_image, description, root_chapter_id)
    VALUES('Conan Escalar Montañas', 'sample-1', 'Conan escalar montañas todos los sábados.', 1);

INSERT INTO chapter(user_id, book_id, title, description, like_sum, depth, images)
    VALUES(1, 1, 'Conan Prepara el Equipaje', 'Conan hace la maleta y reserve un habitación individual', 23, 1, '{"sample-1", "sample-1"}');

INSERT INTO chapter(user_id, book_id, title, description, parent_id, like_sum, depth, images)
    VALUES(1, 1, 'Conan Va a las Montañas', 'Conan compra un pasaje de avión y llega al aeropuerte', 1, 17, 2, '{"sample-1", "sample-1"}');

INSERT INTO chapter(user_id, book_id, title, description, parent_id, like_sum, depth, images)
    VALUES(1, 1, 'Conan acampa', 'Conan duerme en la tienda de campaña', 2, 5, 3, '{"sample-1", "sample-1"}');

INSERT INTO chapter(user_id, book_id, title, description, parent_id, like_sum, depth, images)
    VALUES(1, 1, 'Conan compra un pez', 'Conan ve a hombre qien está pescando, y compra un pez de él.', 3, 15, 4, '{"sample-1", "sample-1"}');
