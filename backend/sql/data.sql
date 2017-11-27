--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.10
-- Dumped by pg_dump version 10.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET search_path = public, pg_catalog;

--
-- Data for Name: book; Type: TABLE DATA; Schema: public; Owner: docker
--

COPY book (id, user_id, title, cover_image, description, like_sum, root_chapter_id, created_at) FROM stdin;
1	3	Test book 1	658643f84aba87a24667f9f30bb84583	Test description of book 1	0	1	2017-11-27 05:37:05.888175
2	3	Test book 2	f079751ff41532e36b4bc350e7c1ee76	Description for test book 2	0	2	2017-11-27 05:57:47.269069
3	3	Test book 3	e39a073b04465f91e8011c4ba683762b	Description for test book 3	0	3	2017-11-27 06:00:40.527435
\.


--
-- Data for Name: chapter; Type: TABLE DATA; Schema: public; Owner: docker
--

COPY chapter (id, user_id, book_id, title, description, parent_id, like_sum, images, create_date) FROM stdin;
1	3	1	Test chapter 1 for book 1	23333	0	0	{58166c0ea8b1c4111747917ef747b590,64d38d494c3b735944686a6915bf0630,30daac764f2029edcdbb643b2d0ab898,92de50a684145256dc2a6bbca013dfc6}	2017-11-27 05:37:05.888175
2	3	2	Test chapter 1 for test book 2	Its's not a bug it's a feature!!!	0	0	{6ee9e7dd24e2927fc2abbc3983a8304e,8ea0655247ac97b3463b49e36a116c1c,f40d19a5ab6b7bd7b547b7666f4b358b,1ee881e0bc988ebe86031bfbbffd42bb}	2017-11-27 05:57:47.269069
3	3	3	Test chapter 1 for test book 3	0.0 <script> alert("test") </script>	0	0	{d8eae4ecf06ce8c5384a0f31693a42f9,d24200218cd7a29afba2b38c7e9e6455,d7bbed021ba8fc7bb32898b0e9acd29f}	2017-11-27 06:00:40.527435
\.


--
-- Data for Name: userinfo; Type: TABLE DATA; Schema: public; Owner: docker
--

COPY userinfo (id, username, password, email, create_date) FROM stdin;
1	Kingston	docker	k@k.com	2017-11-27 05:31:37.62178
2	Ruijia	123456	mao@123.com	2017-11-27 05:31:37.623147
3	Armour	123456	armourg@sfu.ca	2017-11-27 05:31:37.623791
\.


--
-- Data for Name: likeinfo; Type: TABLE DATA; Schema: public; Owner: docker
--

COPY likeinfo (id, user_id, chapter_id) FROM stdin;
\.


--
-- Name: book_id_seq; Type: SEQUENCE SET; Schema: public; Owner: docker
--

SELECT pg_catalog.setval('book_id_seq', 3, true);


--
-- Name: chapter_id_seq; Type: SEQUENCE SET; Schema: public; Owner: docker
--

SELECT pg_catalog.setval('chapter_id_seq', 3, true);


--
-- Name: likeinfo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: docker
--

SELECT pg_catalog.setval('likeinfo_id_seq', 1, false);


--
-- Name: userinfo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: docker
--

SELECT pg_catalog.setval('userinfo_id_seq', 3, true);


--
-- PostgreSQL database dump complete
--

