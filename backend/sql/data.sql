INSERT INTO userinfo(username, email, password) VALUES('Kingston', 'k@k.com', 'docker');
INSERT INTO book(user_id, title, cover_image, description, root_chapter_id)
    VALUES(1, 'Conan Escalar Montañas', 'sample-1', 'Conan escalar montañas todos los sábados.', 1);

INSERT INTO book(user_id, title, cover_image, description, root_chapter_id)
    VALUES(1, 'Conan Escalar Montañas', 'conan_cover_1', 'Conan escalar montañas todos los sábados.', 5);

INSERT INTO book(user_id, title, cover_image, description, root_chapter_id)
    VALUES(1, 'Conan Escalar Montañas', 'conan_cover_2', 'Conan escalar montañas todos los sábados.', 7);

INSERT INTO book(user_id, title, cover_image, description, root_chapter_id)
    VALUES(1, 'Conan Escalar Montañas', 'conan_cover_3', 'Conan escalar montañas todos los sábados.', 9);

INSERT INTO book(user_id, title, cover_image, description, root_chapter_id)
    VALUES(1, 'Conan Escalar Montañas', 'conan_cover_4', 'Conan escalar montañas todos los sábados.', 11);

INSERT INTO book(user_id, title, cover_image, description, root_chapter_id)
    VALUES(1, 'Conan Escalar Montañas', 'conan_cover_5', 'Conan escalar montañas todos los sábados.', 13);

INSERT INTO book(user_id, title, cover_image, description, root_chapter_id)
    VALUES(1, 'Conan Escalar Montañas', 'conan_cover_6', 'Conan escalar montañas todos los sábados.', 15);

INSERT INTO chapter(user_id, book_id, title, description, like_sum, images)
    VALUES(1, 1, 'Conan Prepara el Equipaje', 'Conan hace la maleta y reserve un habitación individual', 23, '{"sample-1", "sample-1"}');

INSERT INTO chapter(user_id, book_id, title, description, parent_id, like_sum, images)
    VALUES(1, 1, 'Conan Va a las Montañas', 'Conan compra un pasaje de avión y llega al aeropuerte', 1, 17, '{"sample-1", "sample-1"}');

INSERT INTO chapter(user_id, book_id, title, description, parent_id, like_sum, images)
    VALUES(1, 1, 'Conan acampa', 'Conan duerme en la tienda de campaña', 2, 5, '{"sample-1", "sample-1"}');

INSERT INTO chapter(user_id, book_id, title, description, parent_id, like_sum, images)
    VALUES(1, 1, 'Conan compra un pez', 'Conan ve a hombre qien está pescando, y compra un pez de él.', 3, 15, '{"sample-1", "sample-1"}');

INSERT INTO chapter(user_id, book_id, title, description, like_sum, images)
    VALUES(1, 2, 'Conan compra un pez', 'Conan ve a hombre qien está pescando, y compra un pez de él.', 15, '{"chapter_1_1", "chapter_1_2", "chapter_1_3", "chapter_1_4"}');

INSERT INTO chapter(user_id, book_id, title, description, parent_id, like_sum, images)
    VALUES(1, 2, 'Conan compra un pez', 'Conan ve a hombre qien está pescando, y compra un pez de él.', 5, 15, '{"chapter_2_1", "chapter_2_2", "chapter_2_3", "chapter_2_4"}');

INSERT INTO chapter(user_id, book_id, title, description, like_sum, images)
    VALUES(1, 3, 'Conan compra un pez', 'Conan ve a hombre qien está pescando, y compra un pez de él.', 15, '{"chapter_1_1", "chapter_1_2", "chapter_1_3", "chapter_1_4"}');

INSERT INTO chapter(user_id, book_id, title, description, parent_id, like_sum, images)
    VALUES(1, 3, 'Conan compra un pez', 'Conan ve a hombre qien está pescando, y compra un pez de él.', 7, 15, '{"chapter_2_1", "chapter_2_2", "chapter_2_3", "chapter_2_4"}');

INSERT INTO chapter(user_id, book_id, title, description, like_sum, images)
    VALUES(1, 4, 'Conan compra un pez', 'Conan ve a hombre qien está pescando, y compra un pez de él.', 15, '{"chapter_1_1", "chapter_1_2", "chapter_1_3", "chapter_1_4"}');

INSERT INTO chapter(user_id, book_id, title, description, parent_id, like_sum, images)
    VALUES(1, 4, 'Conan compra un pez', 'Conan ve a hombre qien está pescando, y compra un pez de él.', 9, 15, '{"chapter_2_1", "chapter_2_2", "chapter_2_3", "chapter_2_4"}');

INSERT INTO chapter(user_id, book_id, title, description, like_sum, images)
    VALUES(1, 5, 'Conan compra un pez', 'Conan ve a hombre qien está pescando, y compra un pez de él.', 15, '{"chapter_1_1", "chapter_1_2", "chapter_1_3", "chapter_1_4"}');

INSERT INTO chapter(user_id, book_id, title, description, parent_id, like_sum, images)
    VALUES(1, 5, 'Conan compra un pez', 'Conan ve a hombre qien está pescando, y compra un pez de él.', 11, 15, '{"chapter_2_1", "chapter_2_2", "chapter_2_3", "chapter_2_4"}');

INSERT INTO chapter(user_id, book_id, title, description, like_sum, images)
    VALUES(1, 6, 'Conan compra un pez', 'Conan ve a hombre qien está pescando, y compra un pez de él.', 15, '{"chapter_1_1", "chapter_1_2", "chapter_1_3", "chapter_1_4"}');

INSERT INTO chapter(user_id, book_id, title, description, parent_id, like_sum, images)
    VALUES(1, 6, 'Conan compra un pez', 'Conan ve a hombre qien está pescando, y compra un pez de él.', 13, 15, '{"chapter_2_1", "chapter_2_2", "chapter_2_3", "chapter_2_4"}');

INSERT INTO chapter(user_id, book_id, title, description, like_sum, images)
    VALUES(1, 7, 'Conan compra un pez', 'Conan ve a hombre qien está pescando, y compra un pez de él.', 15, '{"chapter_1_1", "chapter_1_2", "chapter_1_3", "chapter_1_4"}');

INSERT INTO chapter(user_id, book_id, title, description, parent_id, like_sum, images)
    VALUES(1, 7, 'Conan compra un pez', 'Conan ve a hombre qien está pescando, y compra un pez de él.', 15, 15, '{"chapter_2_1", "chapter_2_2", "chapter_2_3", "chapter_2_4"}');


