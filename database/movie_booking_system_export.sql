-- MySQL dump 10.13  Distrib 9.4.0, for macos15 (arm64)
--
-- Host: localhost    Database: movie_booking_system
-- ------------------------------------------------------
-- Server version	9.4.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `show_id` bigint NOT NULL,
  `seats_booked` int NOT NULL,
  `seat_numbers` varchar(500) DEFAULT NULL,
  `total_amount` decimal(38,2) NOT NULL,
  `booking_reference` varchar(50) NOT NULL,
  `status` enum('CONFIRMED','CANCELLED','COMPLETED') DEFAULT 'CONFIRMED',
  `booking_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `booking_reference` (`booking_reference`),
  KEY `idx_user` (`user_id`),
  KEY `idx_show` (`show_id`),
  KEY `idx_reference` (`booking_reference`),
  KEY `idx_status` (`status`),
  CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`show_id`) REFERENCES `shows` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (1,3,15,1,NULL,290.00,'BK1767154635264','CONFIRMED','2025-12-30 22:47:15'),(2,3,34,3,NULL,900.00,'BK1767155975758','CONFIRMED','2025-12-30 23:09:36');
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cities`
--

DROP TABLE IF EXISTS `cities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cities` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `state` varchar(100) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `description` text,
  `poster_url` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `idx_name` (`name`),
  KEY `idx_active` (`is_active`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cities`
--

LOCK TABLES `cities` WRITE;
/*!40000 ALTER TABLE `cities` DISABLE KEYS */;
INSERT INTO `cities` VALUES (1,'Mumbai','Maharashtra',1,'2025-12-31 06:26:58',NULL,NULL),(2,'Bangalore','Karnataka',1,'2025-12-31 06:26:58',NULL,NULL),(3,'Pune','Maharashtra',1,'2025-12-31 06:26:58',NULL,NULL),(4,'Delhi','Delhi',1,'2025-12-31 06:26:58',NULL,NULL),(5,'Chennai','Tamil Nadu',1,'2025-12-31 06:26:58',NULL,NULL),(6,'Hyderabad','Telangana',1,'2025-12-31 06:26:58',NULL,NULL);
/*!40000 ALTER TABLE `cities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movies`
--

DROP TABLE IF EXISTS `movies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movies` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `genre` varchar(100) NOT NULL,
  `language` varchar(50) NOT NULL,
  `duration` int NOT NULL,
  `director` varchar(100) DEFAULT NULL,
  `cast` text,
  `poster_url` varchar(500) DEFAULT NULL,
  `trailer_url` varchar(500) DEFAULT NULL,
  `rating` decimal(38,2) DEFAULT NULL,
  `release_date` date DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `imdb_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_title` (`title`),
  KEY `idx_genre` (`genre`),
  KEY `idx_language` (`language`),
  KEY `idx_active` (`is_active`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movies`
--

LOCK TABLES `movies` WRITE;
/*!40000 ALTER TABLE `movies` DISABLE KEYS */;
INSERT INTO `movies` VALUES (1,'Pushpa 2: The Rule','The clash is on as Pushpa and Bhanwar Singh continue their rivalry in this epic conclusion to the two-part action thriller.','Action','Hindi',200,NULL,NULL,'https://www.themoviedb.org/t/p/w1280/759mIIerY4Njb8uPoj7AIXGSNh3.jpg','https://www.youtube.com/embed/K8VhooomoDA',4.50,'2024-12-05',1,'2025-12-31 04:08:09','https://www.imdb.com/title/tt21807222/'),(2,'Mufasa: The Lion King','Mufasa, a cub lost and alone, meets a sympathetic lion named Taka, the heir to a royal bloodline. The chance meeting sets in motion an expansive journey.','Animation','English',118,NULL,NULL,'https://www.themoviedb.org/t/p/w1280/lurEK87kukWNaHd0zYnsi3yzJrs.jpg','https://www.youtube.com/embed/o17MF9vnmck',4.20,'2024-12-20',1,'2025-12-31 04:08:09','https://www.imdb.com/title/tt13186482/'),(3,'Sonic the Hedgehog 3','Sonic, Knuckles, and Tails reunite against a powerful new adversary, Shadow, a mysterious villain with powers unlike anything they have faced before.','Action','English',110,NULL,NULL,'https://www.themoviedb.org/t/p/w1280/d8Ryb8AunYAuycVKDp5HpdWPKgC.jpg','https://www.youtube.com/embed/qSu6i2iFMO0',4.30,'2024-12-20',1,'2025-12-31 04:08:09','https://www.imdb.com/title/tt16362404/'),(4,'Wicked','Elphaba, a misunderstood young woman because of her green skin, and Glinda, a popular girl, become friends at Shiz University in the Land of Oz.','Fantasy','English',160,NULL,NULL,'https://image.tmdb.org/t/p/w500/c5Tqxeo1UpBvnAc3csUm7j3hlQl.jpg','https://www.youtube.com/embed/6COmYeLsz4c',4.40,'2024-11-22',1,'2025-12-31 04:08:09','https://www.imdb.com/title/tt1262426/'),(5,'Moana 2','After receiving an unexpected call from her wayfinding ancestors, Moana must journey to the far seas of Oceania for an adventure unlike anything she has faced.','Animation','English',100,NULL,NULL,'https://image.tmdb.org/t/p/w500/yh64qw9mgXBvlaWDi7Q9tpUBAvH.jpg','https://www.youtube.com/embed/hKR4SOqzMPw',4.00,'2024-11-27',1,'2025-12-31 04:08:09','https://www.imdb.com/title/tt13622776/'),(6,'Gladiator II','Years after witnessing the death of Maximus at the hands of his uncle, Lucius must enter the Colosseum after the powerful emperors of Rome conquer his home.','Action','English',148,NULL,NULL,'https://image.tmdb.org/t/p/w500/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg','https://www.youtube.com/embed/4rgYUipGJNo',4.10,'2024-11-13',1,'2025-12-31 04:08:09','https://www.imdb.com/title/tt9218128/'),(7,'Red One','After Santa Claus is kidnapped, the North Poles Head of Security must team up with a bounty hunter to save Christmas.','Action','English',123,NULL,NULL,'https://image.tmdb.org/t/p/w500/cdqLnri3NEGcmfnqwk2TSIYtddg.jpg','https://www.youtube.com/embed/7l3hfD74X-4',3.80,'2024-11-06',1,'2025-12-31 04:08:09','https://www.imdb.com/title/tt14948432/'),(8,'Venom: The Last Dance','Eddie and Venom are on the run. Hunted by both of their worlds and with the net closing in, the duo are forced into a devastating decision.','Action','English',109,NULL,NULL,'https://image.tmdb.org/t/p/w500/k42Owka8v91trK1qMYwCQCNwJKr.jpg','https://www.youtube.com/embed/__2bjWbetsA',3.90,'2024-10-22',1,'2025-12-31 04:08:09','https://www.imdb.com/title/tt16366836/'),(9,'Interstellar','The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel.','Sci-Fi','English',169,NULL,NULL,'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg','https://www.youtube.com/embed/zSWdZVtXT7E',4.70,'2014-11-07',1,'2025-12-31 04:08:09','https://www.imdb.com/title/tt0816692/'),(10,'The Shawshank Redemption','Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.','Drama','English',142,NULL,NULL,'https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg','https://www.youtube.com/embed/NmzuHjWmXOc',4.90,'1994-09-23',1,'2025-12-31 04:08:09','https://www.imdb.com/title/tt0111161/'),(11,'The Dark Knight','When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest tests to fight injustice.','Action','English',152,NULL,NULL,'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg','https://www.youtube.com/embed/EXeTwQWrcwY',4.80,'2008-07-18',1,'2025-12-31 04:08:09','https://www.imdb.com/title/tt0468569/'),(12,'Inception','A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea.','Sci-Fi','English',148,NULL,NULL,'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg','https://www.youtube.com/embed/YoHD9XEInc0',4.60,'2010-07-16',1,'2025-12-31 04:08:09','https://www.imdb.com/title/tt1375666/'),(13,'Kalki 2898 AD','In the year 2898 AD, around 6000 years after Kurukshetra war, Ashwatthama gears up for his final battle of redemption.','Sci-Fi','Hindi',180,NULL,NULL,'https://www.themoviedb.org/t/p/w1280/rstcAnBeCkxNQjNp3YXrF6IP1tW.jpg','https://www.youtube.com/embed/MWOlnZSnXJo',4.30,'2024-06-27',1,'2025-12-31 04:08:09','https://www.imdb.com/title/tt11858396/'),(14,'Stree 2','After the events of Stree, the town of Chanderi is being haunted again. This time, women are mysteriously abducted by a terrifying headless entity.','Horror','Hindi',149,NULL,NULL,'https://www.themoviedb.org/t/p/w1280/nfnhwfUEFuSOxxf4jDdBlY6Lccw.jpg','https://www.youtube.com/embed/KVaT4chRiKc',4.20,'2024-08-15',1,'2025-12-31 04:08:09','https://www.imdb.com/title/tt11968134/'),(15,'Devara: Part 1','A cop trying to trace few brutal murders chances upon a case involving a huge racket of organ trafficking.','Action','Telugu',176,NULL,NULL,'https://www.themoviedb.org/t/p/w1280/lQfuaXjANoTsdx5iS0gCXlK9D2L.jpg','https://www.youtube.com/embed/OUPgPkvbcKE',4.00,'2024-09-27',1,'2025-12-31 04:08:09','https://www.imdb.com/title/tt15837338/');
/*!40000 ALTER TABLE `movies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shows`
--

DROP TABLE IF EXISTS `shows`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shows` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `movie_id` bigint NOT NULL,
  `theater_id` bigint NOT NULL,
  `show_date` date NOT NULL,
  `show_time` time NOT NULL,
  `price` decimal(38,2) NOT NULL,
  `total_seats` int NOT NULL,
  `available_seats` int NOT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_movie` (`movie_id`),
  KEY `idx_theater` (`theater_id`),
  KEY `idx_date` (`show_date`),
  KEY `idx_active` (`is_active`),
  CONSTRAINT `shows_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE,
  CONSTRAINT `shows_ibfk_2` FOREIGN KEY (`theater_id`) REFERENCES `theaters` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shows`
--

LOCK TABLES `shows` WRITE;
/*!40000 ALTER TABLE `shows` DISABLE KEYS */;
INSERT INTO `shows` VALUES (1,1,1,'2025-12-31','10:00:00',350.00,250,200,1,'2025-12-31 04:08:09'),(2,1,1,'2025-12-31','14:00:00',400.00,250,200,1,'2025-12-31 04:08:09'),(3,1,1,'2025-12-31','18:00:00',450.00,250,180,1,'2025-12-31 04:08:09'),(4,1,1,'2025-12-31','22:00:00',400.00,250,200,1,'2025-12-31 04:08:09'),(5,1,2,'2025-12-31','11:00:00',300.00,300,250,1,'2025-12-31 04:08:09'),(6,1,2,'2025-12-31','15:00:00',350.00,300,230,1,'2025-12-31 04:08:09'),(7,1,2,'2025-12-31','19:00:00',400.00,300,200,1,'2025-12-31 04:08:09'),(8,1,3,'2025-12-31','12:00:00',320.00,200,180,1,'2025-12-31 04:08:09'),(9,1,3,'2025-12-31','16:00:00',370.00,200,150,1,'2025-12-31 04:08:09'),(10,1,3,'2025-12-31','20:00:00',420.00,200,160,1,'2025-12-31 04:08:09'),(11,2,1,'2025-12-31','09:30:00',300.00,250,220,1,'2025-12-31 04:08:09'),(12,2,1,'2025-12-31','13:30:00',350.00,250,210,1,'2025-12-31 04:08:09'),(13,2,2,'2025-12-31','10:30:00',280.00,300,270,1,'2025-12-31 04:08:09'),(14,2,2,'2025-12-31','14:30:00',330.00,300,260,1,'2025-12-31 04:08:09'),(15,2,3,'2025-12-31','11:30:00',290.00,200,179,1,'2025-12-31 04:08:09'),(16,2,4,'2025-12-31','15:30:00',310.00,180,160,1,'2025-12-31 04:08:09'),(17,3,1,'2025-12-31','10:30:00',280.00,250,230,1,'2025-12-31 04:08:09'),(18,3,2,'2025-12-31','12:30:00',260.00,300,280,1,'2025-12-31 04:08:09'),(19,3,3,'2025-12-31','14:30:00',270.00,200,190,1,'2025-12-31 04:08:09'),(20,3,4,'2025-12-31','16:30:00',290.00,180,170,1,'2025-12-31 04:08:09'),(21,4,1,'2025-12-31','17:00:00',380.00,250,200,1,'2025-12-31 04:08:09'),(22,4,1,'2025-12-31','21:00:00',380.00,250,190,1,'2025-12-31 04:08:09'),(23,4,2,'2025-12-31','18:00:00',350.00,300,270,1,'2025-12-31 04:08:09'),(24,4,3,'2025-12-31','19:00:00',360.00,200,180,1,'2025-12-31 04:08:09'),(25,5,2,'2025-12-31','09:00:00',250.00,300,290,1,'2025-12-31 04:08:09'),(26,5,2,'2025-12-31','13:00:00',300.00,300,280,1,'2025-12-31 04:08:09'),(27,5,3,'2025-12-31','10:00:00',260.00,200,190,1,'2025-12-31 04:08:09'),(28,5,4,'2025-12-31','14:00:00',270.00,180,170,1,'2025-12-31 04:08:09'),(29,6,1,'2025-12-31','15:00:00',360.00,250,210,1,'2025-12-31 04:08:09'),(30,6,1,'2025-12-31','19:30:00',410.00,250,190,1,'2025-12-31 04:08:09'),(31,6,2,'2025-12-31','16:00:00',340.00,300,260,1,'2025-12-31 04:08:09'),(32,6,3,'2025-12-31','17:00:00',350.00,200,180,1,'2025-12-31 04:08:09'),(33,9,1,'2025-12-31','20:00:00',320.00,250,220,1,'2025-12-31 04:08:09'),(34,9,2,'2025-12-31','21:00:00',300.00,300,277,1,'2025-12-31 04:08:09'),(35,9,3,'2025-12-31','21:30:00',310.00,200,190,1,'2025-12-31 04:08:09'),(36,11,1,'2025-12-31','23:00:00',280.00,250,230,1,'2025-12-31 04:08:09'),(37,11,2,'2025-12-31','23:30:00',260.00,300,290,1,'2025-12-31 04:08:09'),(38,14,1,'2025-12-31','16:30:00',300.00,250,210,1,'2025-12-31 04:08:09'),(39,14,2,'2025-12-31','17:30:00',280.00,300,270,1,'2025-12-31 04:08:09'),(40,14,3,'2025-12-31','18:30:00',290.00,200,180,1,'2025-12-31 04:08:09'),(41,1,1,'2026-01-01','10:00:00',350.00,250,250,1,'2025-12-31 04:08:09'),(42,1,1,'2026-01-01','14:00:00',400.00,250,250,1,'2025-12-31 04:08:09'),(43,1,1,'2026-01-01','18:00:00',450.00,250,230,1,'2025-12-31 04:08:09'),(44,2,1,'2026-01-01','09:30:00',300.00,250,240,1,'2025-12-31 04:08:09'),(45,4,1,'2026-01-01','17:00:00',380.00,250,240,1,'2025-12-31 04:08:09'),(46,6,1,'2026-01-01','15:00:00',360.00,250,240,1,'2025-12-31 04:08:09');
/*!40000 ALTER TABLE `shows` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `theaters`
--

DROP TABLE IF EXISTS `theaters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `theaters` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `location` varchar(200) NOT NULL,
  `city` varchar(100) NOT NULL,
  `capacity` int NOT NULL,
  `facilities` text,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `address` varchar(255) DEFAULT NULL,
  `city_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_city` (`city`),
  KEY `idx_active` (`is_active`),
  KEY `fk_theaters_city` (`city_id`),
  CONSTRAINT `fk_theaters_city` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `theaters`
--

LOCK TABLES `theaters` WRITE;
/*!40000 ALTER TABLE `theaters` DISABLE KEYS */;
INSERT INTO `theaters` VALUES (1,'PVR Cinemas Phoenix','High Street Phoenix, Lower Parel','Mumbai',250,NULL,1,'2025-12-31 04:08:09',NULL,1),(2,'INOX Megaplex','Sector 18, Noida','Delhi',300,NULL,1,'2025-12-31 04:08:09',NULL,4),(3,'Cinepolis Fun Republic','MG Road, Bangalore','Bangalore',200,NULL,1,'2025-12-31 04:08:09',NULL,2),(4,'Carnival Cinemas','Seasons Mall, Magarpatta','Pune',180,NULL,1,'2025-12-31 04:08:09',NULL,3),(5,'AGS Cinemas','T Nagar, Chennai','Chennai',220,NULL,1,'2025-12-31 04:08:09',NULL,5),(6,'Miraj Cinemas','Banjara Hills, Hyderabad','Hyderabad',190,NULL,1,'2025-12-31 04:08:09',NULL,6),(7,'Mukta A2 Cinemas','South City Mall, Kolkata','Kolkata',210,NULL,1,'2025-12-31 04:08:09',NULL,NULL);
/*!40000 ALTER TABLE `theaters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `role` enum('USER','ADMIN') DEFAULT 'USER',
  `theme` varchar(10) DEFAULT 'light',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_username` (`username`),
  KEY `idx_email` (`email`),
  KEY `idx_role` (`role`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','admin@moviebooking.com','admin123','Admin User','1234567890','ADMIN','light','2025-12-31 03:15:33'),(2,'user','user@test.com','user123','Test User','9876543210','USER','light','2025-12-31 03:15:33'),(3,'rahulsharma027','rahulsharma@gmail.com','rahulhu','Rahul Sharma','7777777777','USER','dark','2025-12-30 22:46:34');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-31 13:29:41
