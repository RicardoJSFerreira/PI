--  CALL get_service_providers_v2 (NULL, NULL, NULL, NULL, 6, NULL,10,0);
 -- get_service_providers (IN id_category INT, IN id_location INT, IN experience INT, IN price DOUBLE, IN rating DOUBLE, IN in_sex VARCHAR(1),IN limite INT, IN inicio INT)
-- CALL get_companies(NULL,50,0);
-- CALL get_average_rating(55);
-- CALL get_reviews(55);
-- CALL get_service_provider_profile(55);
-- CALL get_joboffer(4,471,18, 10, 0);

-- CALL update_company_endSub(151,13);
-- CALL update_joboffer(4, 'teste', '2026-08-11', 10, '2026-08-14', 6, 180);

-- CALL update_company_endSub(151,9);
 -- CALL update_company_vip(151,3);
 
 -- CALL get_service_providers (1, NULL, NULL, NULL,10, 0) ;
 -- DELETE FROM pi.user WHERE idUser = 207; 
 
-- INSERT INTO Review(idReview,description,rating,postDate,idGive,idReceive)VALUES(0,'Teste.',2,'2022-03-18 10:27:16',17,51);
-- INSERT INTO Review(idReview,description,rating,postDate,idGive,idReceive)VALUES(0,'Teste.',3,'2022-03-18 10:27:16',17,52);
-- INSERT INTO Review(idReview,description,rating,postDate,idGive,idReceive)VALUES(0,'Teste.',4,'2022-03-18 10:27:16',17,52);
-- INSERT INTO Review(idReview,description,rating,postDate,idGive,idReceive)VALUES(0,'Teste.',7,'2022-03-18 10:27:16',17,55);
-- CALL update_last_activity(2);

-- UPDATE pi.review SET review.rating = 10 WHERE review.idReview = 75;
-- CALL update_averageRating(51);

-- category , location, experience, price, rating, sex, limite, offset
-- CALL get_service_providers_v3 (4, 415, 10, 10.70, 9.0, 'M',10,0);

-- CALL get_service_providers_v3 ('["1","5","3"]', NULL, NULL, NULL, NULL, NULL,10,0);
USE PI;
CALL get_service_providers_v3 ('["1","2"]', NULL, NULL, NULL, NULL, NULL,20,0);