--
-- PostgreSQL database dump
--

-- Dumped from database version 10.0
-- Dumped by pg_dump version 10.0

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
2	3	Test book 2	f079751ff41532e36b4bc350e7c1ee76	Description for test book 2	2	2	2017-11-27 05:57:47.269069
1	3	Test book 1	658643f84aba87a24667f9f30bb84583	Test description of book 1	2	1	2017-11-27 05:37:05.888175
3	3	Test book 3	e39a073b04465f91e8011c4ba683762b	Description for test book 3	2	3	2017-11-27 06:00:40.527435
4	4	后宫三千人	bc6b28ad945a7baaa04dfbe90d4a8f0f	reference 4399	5	4	2017-11-28 07:34:40.598844
\.


--
-- Data for Name: chapter; Type: TABLE DATA; Schema: public; Owner: docker
--

COPY chapter (id, user_id, book_id, title, description, parent_id, like_sum, images, create_date) FROM stdin;
2	3	2	Test chapter 1 for test book 2	Its's not a bug it's a feature!!!	0	0	{6ee9e7dd24e2927fc2abbc3983a8304e,8ea0655247ac97b3463b49e36a116c1c,f40d19a5ab6b7bd7b547b7666f4b358b,1ee881e0bc988ebe86031bfbbffd42bb}	2017-11-27 05:57:47.269069
3	3	3	Test chapter 1 for test book 3	0.0 <script> alert("test") </script>	0	0	{d8eae4ecf06ce8c5384a0f31693a42f9,d24200218cd7a29afba2b38c7e9e6455,d7bbed021ba8fc7bb32898b0e9acd29f}	2017-11-27 06:00:40.527435
1	3	1	Test chapter 1 for book 1	23333	0	6	{58166c0ea8b1c4111747917ef747b590,64d38d494c3b735944686a6915bf0630,30daac764f2029edcdbb643b2d0ab898,92de50a684145256dc2a6bbca013dfc6}	2017-11-27 05:37:05.888175
6	4	4	不去	凉了	4	0	{b016b4809e839be3e361a2dcb5e592be}	2017-11-28 07:36:11.588165
4	4	4	入宫	父亲想你入宫	0	1	{e20ace2b6082d94090ca3d016aed9a8d}	2017-11-28 07:34:40.598844
7	4	4	反驳		5	1	{9d4693b8b05565abe5a1a5689453b1b0}	2017-11-28 07:37:20.677447
8	4	4	沉默		5	1	{3af4c9d4535f95a3038fc42414a40031}	2017-11-28 07:39:01.009817
5	4	4	阔以	僵了	4	2	{c0e3d8651b214fce28dc97ef96b99127,8beedc4352242234b6623d9162b5f1a6,b94baaaa528a6c1be46ca0194ff72364}	2017-11-28 07:35:50.443281
9	4	4	冷冷的看		5	2	{d77dd6e439ba85e5ac4211118b9b0e7f}	2017-11-28 07:39:21.563313
\.


--
-- Data for Name: userinfo; Type: TABLE DATA; Schema: public; Owner: docker
--

COPY userinfo (id, username, password, email, create_date) FROM stdin;
1	Kingston	docker	k@k.com	2017-11-27 05:31:37.62178
2	Ruijia	123456	mao@123.com	2017-11-27 05:31:37.623147
3	Armour	123456	armourg@sfu.ca	2017-11-27 05:31:37.623791
4	luyor	luyuhelyh	yuhel@sfu.ca	2017-11-28 07:33:12.279
5	zip	zip	zip@zip.com	2017-11-28 07:33:12.279
\.


--
-- Data for Name: bookmarkinfo; Type: TABLE DATA; Schema: public; Owner: docker
--

COPY bookmarkinfo (id, user_id, book_id, chapter_id) FROM stdin;
\.


--
-- Data for Name: likeinfo; Type: TABLE DATA; Schema: public; Owner: docker
--

COPY likeinfo (id, user_id, book_id, chapter_id) FROM stdin;
1	2	4	4
2	2	4	5
3	2	4	9
\.


--
-- Name: book_id_seq; Type: SEQUENCE SET; Schema: public; Owner: docker
--

SELECT pg_catalog.setval('book_id_seq', 4, true);


--
-- Name: bookmarkinfo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: docker
--

SELECT pg_catalog.setval('bookmarkinfo_id_seq', 1, false);


--
-- Name: chapter_id_seq; Type: SEQUENCE SET; Schema: public; Owner: docker
--

SELECT pg_catalog.setval('chapter_id_seq', 9, true);


--
-- Name: likeinfo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: docker
--

SELECT pg_catalog.setval('likeinfo_id_seq', 3, true);


--
-- Name: userinfo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: docker
--

SELECT pg_catalog.setval('userinfo_id_seq', 4, true);


--
-- PostgreSQL database dump complete
--

