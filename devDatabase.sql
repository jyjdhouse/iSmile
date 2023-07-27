-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: containers-us-west-58.railway.app    Database: railway
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `billing_addresses`
--

DROP TABLE IF EXISTS `billing_addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `billing_addresses` (
  `id` varchar(36) NOT NULL,
  `street` varchar(255) DEFAULT NULL,
  `apartment` varchar(45) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `provinces_id` int DEFAULT NULL,
  `zip_code` varchar(10) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `billing_addresses`
--

LOCK TABLES `billing_addresses` WRITE;
/*!40000 ALTER TABLE `billing_addresses` DISABLE KEYS */;
INSERT INTO `billing_addresses` VALUES ('0498c7a9-f133-4b85-beb2-fb8e831024b9','Juana Azurduy 1730','','Nuñez',1,'1429','2023-07-19 16:01:52','2023-07-19 16:01:52',NULL),('072ca0de-9d92-45ae-9c01-757681e54ee8','Libertador 1580','5a','Nuñez',1,'2222','2023-07-19 13:45:40','2023-07-19 13:45:40',NULL),('24403f4f-5c3f-47b1-bbfd-76cfe262c97e','Av. Libertador 2222','3F','Palermo',1,'1112','2023-07-17 14:25:22','2023-07-17 14:25:22',NULL),('2c41a0f0-a045-4745-9dce-73efcacfc11f','Libertador 1580','20a','Nuñez',1,'2222','2023-07-19 13:53:22','2023-07-19 13:53:22',NULL),('39a8736e-8fb7-441b-b92e-2229ea6cfe73','1908 N 58th Way','','Hollywood',1,'33021','2023-07-25 11:05:14','2023-07-25 11:05:14',NULL),('40d4625a-e539-4ebd-82df-a39ef0990f4f','Juana Azurduy 1730','2a','CABA',1,'1429','2023-07-21 23:07:40','2023-07-21 23:07:40',NULL),('49942240-6749-4d5a-a5b1-572c098da894','Juana Azurduy 1730','12','Nuñez',1,'1429','2023-07-19 13:57:09','2023-07-19 13:57:09',NULL),('5d77b23b-fd8c-45d9-bbae-2fe6b4cbf73f','Juana Azurduy 1730','','Nuñez',1,'1429','2023-07-19 18:51:36','2023-07-19 18:51:36',NULL),('677964d2-aa7a-4a26-8379-8132fdd4f2ea','Juana Azurduy 1730','','Nuñez',1,'1429','2023-07-18 00:11:58','2023-07-18 00:11:58',NULL),('6a3bc59a-f9aa-484b-bd72-60b7632226b5','Libertador 1580','20a','Nuñez',1,'2222','2023-07-19 13:55:35','2023-07-19 13:55:35',NULL),('7147f039-f430-400f-b6c4-f4ea0f584cd8','Juana Azurduy 1730','','Nuñez',1,'1429','2023-07-19 14:33:07','2023-07-19 14:33:07',NULL),('84e69a73-1210-4c0d-b0e4-cb2ffa14f329','Juana Azurduy 1730','','Nuñez',1,'1429','2023-07-17 13:42:50','2023-07-17 13:42:50',NULL),('8fc54df2-1e59-4df7-9b47-0ebe52d498de','Av. Libertador 2222','10A','Belgrano',1,'1422','2023-07-17 19:28:42','2023-07-17 19:28:42',NULL),('a993d7ba-98d1-4dd4-a479-e6c83fa2b29f','Juana Azurduy 1730','','Nuñez',1,'1429','2023-07-19 18:53:47','2023-07-19 18:53:47',NULL),('bb22b73f-34b0-4013-9a5b-4dff3f16fbe9','Juana Azurduy 1730','','Nuñez',1,'1429','2023-07-17 19:16:57','2023-07-17 19:16:57',NULL),('bdec0e96-5a12-4809-a9cc-7523ba96dfb0','Pepe 1234','4a','CABA',1,'111111','2023-07-17 23:34:11','2023-07-17 23:34:11',NULL),('be128cc5-d41f-47da-a0a1-aadd458dd6c0','Juana Azurduy 1730','','Nuñez',1,'1429','2023-07-19 14:31:34','2023-07-19 14:31:34',NULL),('c2c08c4b-5220-4e7c-a453-e7472708a260','Conde 3229','2A','Coghlan',1,'1430','2023-07-17 16:57:11','2023-07-17 16:57:11',NULL),('c328920c-0255-41f5-9aed-70817a974cb5','1908 N 58th Way','212','Hollywood',1,'33021','2023-07-25 12:01:51','2023-07-25 12:01:51',NULL),('d3cac2a7-c798-4cdc-b5af-2d27936cdff9','Juana Azurduy 1730','','Nuñez',1,'1429','2023-07-17 22:26:11','2023-07-17 22:26:11',NULL),('d5f91132-85b3-4abe-aa1f-60bc18101449','Juana Azurduy 1730','12','Nuñez',1,'1429','2023-07-19 13:58:12','2023-07-19 13:58:12',NULL),('def4d8db-ddaa-42c6-bf8b-a1747fb9bf07','Juana Azurduy 1730','12','Nuñez',1,'1429','2023-07-19 14:01:17','2023-07-19 14:01:17',NULL),('f52d09ec-203f-4993-a026-21bc21f24b2a','Juana Azurduy 1730','','Nuñez',1,'1429','2023-07-17 17:39:49','2023-07-17 17:39:49',NULL);
/*!40000 ALTER TABLE `billing_addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blogs`
--

DROP TABLE IF EXISTS `blogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blogs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `text` text NOT NULL,
  `author` varchar(100) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blogs`
--

LOCK TABLES `blogs` WRITE;
/*!40000 ALTER TABLE `blogs` DISABLE KEYS */;
INSERT INTO `blogs` VALUES (1,'Blog Test','<p>asdddddddddddddddddddddddddddddddddddddddddd\ndasssssss.</p>\n<p>asdnkasodspadokjsdampsdaopkasmsadm\nasdknjlasdsa;sda.</p>\n<p>¿Qué quiere decir ? ??</p>\n<p>asd</p>','Jano y Joaco','2023-07-05 18:51:43'),(2,'','<p>asdadsadasdsadsad\nasd\nasd\nasd\nasd\n//\nasd.\n..\nasd..a\n.sad</p>','Jano y Joaco','2023-07-05 18:53:59'),(3,'ASDSADASSADASD','<p>sdfojinjado csifjnaojsd\nfsdfdsaniocfi;sda\nfca\nf\ncdsc\nfdsa\ncfds</p>\n<p>csad\nfcdsa\ncfsdasfd</p>','dsadsaasdasdasdasd','2023-07-05 18:55:12'),(4,'Blog de prueba','<p>Este es un blog de prueba para la creación de blogs.\nHacemos una descripción con parrafo.</p>','Joaquin ','2023-07-05 20:05:27'),(5,'Blog 1 Creacion 2','Este es el contenido de la creación de un parrafo con markdown, probando a HTML. Parrafo 2 para probar Markdown.','Joaquin 2','2023-07-05 20:26:34'),(6,'Blog 1 Creacion 2','Este es el contenido de la creación de un parrafo con markdown, probando a HTML. Parrafo 2 para probar Markdown.','Joaquin 2','2023-07-05 20:27:04'),(7,'Blog 10','<p>Este es un contenido de un blog donde estoy probando los parrafos.\nEste es el segundo parrafo de un blog que pruebo.</p>','Joaquin 10','2023-07-05 20:38:53'),(8,'Blog 15','<p>Este es el tercer intento para generar parrafos.</p>\n<p>Este es el segundo parrafo del tercer intento.</p>','Joaquin 15','2023-07-05 20:40:26'),(9,'Joaquin 17','<p>Este es un parrafo para un blog numero 17.</p>\n<p>Parrafo numero 2 de número 17.</p>','Joaquin','2023-07-06 12:32:07'),(10,'Blog 18','<p>Este es un parrafo para la actualización y creación de un blog.</p>\n<p>El blog este es un parrafo blog.</p>\n<p>El blog tercero este es un parrafo este es un parrafo blog.</p>','Joaquin 18','2023-07-06 18:50:46'),(11,'Jano y Joaco Titulo','<p>Parrafo 1.</p>\n<p>Parrafo 2.</p>\n<p>Parrafo 3.</p>','Jano y Joaco Autor','2023-07-06 19:30:10'),(12,'Blog PRueba Finakl','<p>Cotnenido 1.</p>\n<p>Contenido 2.</p>','Joaquin','2023-07-07 01:01:24'),(13,'Los vinos','<p>Huentala Wines, la prestigiosa bodega ubicada en el corazón del Valle de Uco en Mendoza, se enorgullece en anunciar su destacado desempeño en el aclamado International Wine Challenge 2023. </p>\n<p>Esta competencia global de vinos, donde participan las bodegas más prestigiosas del mundo y reconocida por ser la más imparcial y contar con el jurado más riguroso, ha otorgado a Huentala Wines un notable reconocimiento internacional.</p>\n<p>Los vinos de la bodega han brillado en esta competición, alzando los trofeos a mejor Malbec de Mendoza, mejor Tinto Argentino y mejor Malbec Internacional. Los vinos premiados con medalla de oro fueron Huentala La Isabel Estate Malbec 2021 (95 puntos), Huentala Calizo Albar Block 06 Malbec 2020 (96 puntos), y Huentala Calizo Carmin Block 03 Malbec 2020. Vale destacar, que éste último, fue el único vino argentino y el único Malbec del concurso en recibir 97 puntos. Además, Huentala Wines se convirtió en una de las bodegas más ganadoras con 3 trofeos.</p>','Jano','2023-07-12 13:45:39'),(14,'Los Vinos','<p>Huentala Wines, la prestigiosa bodega ubicada en el corazón del Valle de Uco en Mendoza, se enorgullece en anunciar su destacado desempeño en el aclamado International Wine Challenge 2023. Esta competencia global de vinos, donde participan las bodegas más prestigiosas del mundo y reconocida por ser la más imparcial y contar con el jurado más riguroso, ha otorgado a Huentala Wines un notable reconocimiento internacional.</p>\n<p>Los vinos de la bodega han brillado en esta competición, alzando los trofeos a mejor Malbec de Mendoza, mejor Tinto Argentino y mejor Malbec Internacional. Los vinos premiados con medalla de oro fueron Huentala La Isabel Estate Malbec 2021 (95 puntos), Huentala Calizo Albar Block 06 Malbec 2020 (96 puntos), y Huentala Calizo Carmin Block 03 Malbec 2020. Vale destacar, que éste último, fue el único vino argentino y el único Malbec del concurso en recibir 97 puntos. Además, Huentala Wines se convirtió en una de las bodegas más ganadoras con 3 trofeos.</p>\n<p>Estos galardones reflejan la dedicación, la pasión y el talento de todo el equipo de Huentala Wines, que con su arduo trabajo lograron crear unos vinos excepcionales que conquistaron el paladar de los exigentes jurados de este concurso. </p>','Jano Pereira','2023-07-12 13:52:20'),(15,'Blog de vino','<p>Huentala Wines, la prestigiosa bodega ubicada en el corazón del Valle de Uco en Mendoza, se enorgullece en anunciar su destacado desempeño en el aclamado International Wine Challenge 2023. Esta competencia global de vinos, donde participan las bodegas más prestigiosas del mundo y reconocida por ser la más imparcial y contar con el jurado más riguroso, ha otorgado a Huentala Wines un notable reconocimiento internacional.</p>\n<p>Los vinos de la bodega han brillado en esta competición, alzando los trofeos a mejor Malbec de Mendoza, mejor Tinto Argentino y mejor Malbec Internacional. Los vinos premiados con medalla de oro fueron Huentala La Isabel Estate Malbec 2021 (95 puntos), Huentala Calizo Albar Block 06 Malbec 2020 (96 puntos), y Huentala Calizo Carmin Block 03 Malbec 2020. Vale destacar, que éste último, fue el único vino argentino y el único Malbec del concurso en recibir 97 puntos. Además, Huentala Wines se convirtió en una de las bodegas más ganadoras con 3 trofeos.</p>\n<p>Estos galardones reflejan la dedicación, la pasión y el talento de todo el equipo de Huentala Wines, que con su arduo trabajo lograron crear unos vinos excepcionales que conquistaron el paladar de los exigentes jurados de este concurso. </p>','Jano','2023-07-12 16:13:38'),(16,'Borrar','<p>12321132</p>','12312','2023-07-21 15:46:44'),(17,'borrarr','','12213123','2023-07-21 15:47:02');
/*!40000 ALTER TABLE `blogs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blogs_images`
--

DROP TABLE IF EXISTS `blogs_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blogs_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) NOT NULL,
  `blog_id` int NOT NULL,
  `main_image` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `blogs_images_ibfk_1` (`blog_id`),
  CONSTRAINT `blogs_images_ibfk_1` FOREIGN KEY (`blog_id`) REFERENCES `blogs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blogs_images`
--

LOCK TABLES `blogs_images` WRITE;
/*!40000 ALTER TABLE `blogs_images` DISABLE KEYS */;
INSERT INTO `blogs_images` VALUES (1,'images-6p0h1inahy.webp',3,0),(2,'images-kqvhb2hah7.jpg',3,1),(3,'images-stnan9szp0.webp',3,0),(4,'images-y8efrq1dka.webp',3,0),(5,'images-cm44h44kyd.png',4,1),(6,'images-opur9oij9u.png',4,0),(7,'images-84njjjlry0.png',4,0),(8,'images-5fui8yc8xq.png',5,0),(9,'images-jslxmhttjf.png',5,1),(10,'images-f48wajqegk.png',5,0),(11,'images-pqg8ukp8jo.png',6,0),(12,'images-49gt2tb5v4.png',6,0),(13,'images-wregm6o937.png',6,0),(14,'images-dos3fy1a4l.png',7,0),(15,'images-usq8bkvup4.png',7,0),(16,'images-qtmt3issa2.png',7,0),(17,'images-kfjay1g3t3.png',7,0),(18,'images-08v1sgotrp.png',8,1),(19,'images-1jespsouab.png',8,0),(20,'images-s8hlse002x.png',9,1),(21,'images-g1pa52a855.png',9,0),(22,'images-gcdnm1pw34.png',9,0),(23,'images-3n9kas9bgo.jpg',9,0),(24,'images-lssyv8ob6a.jpg',9,0),(29,'images-c48y6f42p2.jpg',10,1),(30,'images-lk17t2ktx8.jpg',10,0),(31,'images-7jjaboqxrw.png',10,0),(32,'images-1532r5pkhb.png',11,0),(33,'images-629phcb7yz.jpg',11,0),(34,'images-3goihv52ad.jpg',11,1),(54,'images-z23cbek761.jpg',12,0),(55,'images-5iyje771ve.jpg',12,1),(56,'images-f2myxilwkb.jpg',12,0),(57,'images-jysvot3tum.jpg',12,0),(58,'images-sq6tbar5nt.jpg',12,0),(59,'images-4qd5awbg7m.jpg',12,0),(60,'images-5egvfamnhu.webp',13,0),(61,'images-is1yz67jk1.webp',13,0),(62,'images-6oqcztcy3v.webp',13,1),(63,'images-ikfjp9kc3k.webp',13,0),(64,'images-7v77uq58zd.webp',14,0),(65,'images-d397z8mn9h.webp',14,0),(66,'images-t4ao1y7o1c.webp',14,1),(67,'images-cs6iezncf5.webp',14,0),(68,'images-zyo3qjj0m6.webp',15,0),(69,'images-4qnk4lvdnh.webp',15,0),(70,'images-82amb9wfpz.webp',15,1),(71,'images-a789galus1.webp',15,0);
/*!40000 ALTER TABLE `blogs_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Producto',NULL,NULL),(2,'Servicio',NULL,NULL);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `file_types`
--

DROP TABLE IF EXISTS `file_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `file_types` (
  `id` int NOT NULL,
  `type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `file_types`
--

LOCK TABLES `file_types` WRITE;
/*!40000 ALTER TABLE `file_types` DISABLE KEYS */;
INSERT INTO `file_types` VALUES (1,'image'),(2,'video');
/*!40000 ALTER TABLE `file_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genres`
--

DROP TABLE IF EXISTS `genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genres` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genres`
--

LOCK TABLES `genres` WRITE;
/*!40000 ALTER TABLE `genres` DISABLE KEYS */;
INSERT INTO `genres` VALUES (1,'Femenino'),(2,'Masculino'),(3,'No Binario'),(4,'Sin especificar');
/*!40000 ALTER TABLE `genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `home_files`
--

DROP TABLE IF EXISTS `home_files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `home_files` (
  `id` int NOT NULL AUTO_INCREMENT,
  `filename` text,
  `file_types_id` int DEFAULT NULL,
  `home_sections_id` int DEFAULT NULL,
  `position` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `home_files_ibfk_1` (`file_types_id`),
  KEY `home_files_ibfk_2` (`home_sections_id`),
  CONSTRAINT `home_files_ibfk_1` FOREIGN KEY (`file_types_id`) REFERENCES `file_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `home_files_ibfk_2` FOREIGN KEY (`home_sections_id`) REFERENCES `home_sections` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `home_files`
--

LOCK TABLES `home_files` WRITE;
/*!40000 ALTER TABLE `home_files` DISABLE KEYS */;
INSERT INTO `home_files` VALUES (1,'homeFilel6grmld6hl.mp4',2,1,NULL),(2,'4zvsp2yino.webp',1,2,1),(3,'homeFile-o18xxj9w9u.jpg',1,2,2),(4,'nose.jpg',1,2,3),(5,'homeFile-yyxix3xbzf.jpg',1,2,4),(6,'hair.jpg',1,2,5),(7,'homeFilejlxqhb7na3.webp',1,3,1),(8,'ig2.jpeg',1,3,2),(9,'homeFile-wjeym5q0gi.jpeg',1,3,3),(10,'ig4.jpeg',1,3,4),(11,'ig5.jpeg',1,3,5),(12,'homeFile-qly531ubu8.avif',1,4,NULL);
/*!40000 ALTER TABLE `home_files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `home_sections`
--

DROP TABLE IF EXISTS `home_sections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `home_sections` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `home_sections`
--

LOCK TABLES `home_sections` WRITE;
/*!40000 ALTER TABLE `home_sections` DISABLE KEYS */;
INSERT INTO `home_sections` VALUES (1,'video'),(2,'gallery'),(3,'instagram'),(4,'blog');
/*!40000 ALTER TABLE `home_sections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id` varchar(36) NOT NULL,
  `orders_id` varchar(36) DEFAULT NULL,
  `products_id` varchar(36) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `deletedAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_items_ibfk_1` (`products_id`),
  KEY `order_items_ibfk_2` (`orders_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`orders_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_status`
--

DROP TABLE IF EXISTS `order_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_status`
--

LOCK TABLES `order_status` WRITE;
/*!40000 ALTER TABLE `order_status` DISABLE KEYS */;
INSERT INTO `order_status` VALUES (1,'Completa'),(2,'Pendiente de envio'),(3,'Pendiente de pago'),(4,'Pendiente de confirmacion'),(5,'Anulada');
/*!40000 ALTER TABLE `order_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_types`
--

DROP TABLE IF EXISTS `order_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_types`
--

LOCK TABLES `order_types` WRITE;
/*!40000 ALTER TABLE `order_types` DISABLE KEYS */;
INSERT INTO `order_types` VALUES (1,'Venta online - Entrega a domicilio'),(2,'Venta online - Retiro por el local'),(3,'Venta presencial');
/*!40000 ALTER TABLE `order_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` varchar(36) NOT NULL,
  `tra_id` text,
  `users_id` varchar(36) DEFAULT NULL,
  `shipping_addresses_id` varchar(36) DEFAULT NULL,
  `billing_addresses_id` varchar(36) DEFAULT NULL,
  `is_same_address` tinyint DEFAULT NULL,
  `total` int DEFAULT NULL,
  `order_status_id` int DEFAULT NULL,
  `order_types_id` int DEFAULT NULL,
  `payment_methods_id` int DEFAULT NULL,
  `date` timestamp NULL DEFAULT NULL,
  `billing_name` varchar(255) DEFAULT NULL,
  `billing_email` varchar(255) DEFAULT NULL,
  `billing_phone` varchar(45) DEFAULT NULL,
  `billing_id` varchar(45) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `users_id` (`users_id`),
  KEY `orders_ibfk_5` (`shipping_addresses_id`),
  KEY `orders_ibfk_4` (`order_status_id`),
  KEY `orders_ibfk_6` (`billing_addresses_id`),
  KEY `orders_ibfk_7` (`order_types_id`),
  KEY `orders_ibfk_8` (`payment_methods_id`),
  CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_4` FOREIGN KEY (`order_status_id`) REFERENCES `order_status` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_5` FOREIGN KEY (`shipping_addresses_id`) REFERENCES `shipping_addresses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_6` FOREIGN KEY (`billing_addresses_id`) REFERENCES `billing_addresses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_7` FOREIGN KEY (`order_types_id`) REFERENCES `order_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_8` FOREIGN KEY (`payment_methods_id`) REFERENCES `payment_methods` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_methods`
--

DROP TABLE IF EXISTS `payment_methods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_methods` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_methods`
--

LOCK TABLES `payment_methods` WRITE;
/*!40000 ALTER TABLE `payment_methods` DISABLE KEYS */;
INSERT INTO `payment_methods` VALUES (1,'Transferencia'),(2,'Tarjeta de crédito'),(3,'Tarjeta de débito'),(4,'Efectivo'),(5,'Dólares');
/*!40000 ALTER TABLE `payment_methods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `description` text,
  `category_id` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `stock` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES ('7e4b718f-1f11-452f-9aa9-54d9a059d881','Bálsamo Lip Glow',10000,'HIDRATACIÓN + VOLUMEN 3D ?\r\n\r\nEl cuidado de los labios es esencial para lucir una boca hidratada y luminosa, mejorar la textura y disminuir sus arrugas. Por ello la hidratación es un paso fundamental de una rutina.\r\n\r\n✨Nuestro bálsamo asegura una regeneración efectiva, mejorando la calidad el aspecto, la tersura y su luminosidad✨.\r\n\r\nModo de uso: Aplicar la cantidad de veces que sea necesario sobre los labios y masajear.\r\n',1,'2023-07-12 13:35:15',NULL,'2023-07-26 13:42:24',NULL),('9965b799-1f1b-43d1-8537-c9713373188e','Crema Anti Age',10000,'Creamos una crema enfocada en combatir el envejecimiento cutáneo, favorece la renovación celular, fortalecer la barrera cutánea y devolverle la elasticidad y flexibilidad a tu piel.\r\n\r\n✨Ayuda a combatir los signos del envejecimiento, gracias a la combinación de activos como: Retinol, Matrixyl, Carnosina y Gluconolaciona que actúan en sinergia estimulando la producción de colágeno, elastina y ácido hialurónico. Además refuerzan la barrera cutánea protegiéndola de los agentes externos y devuelven luminosidad, elasticidad y flexibilidad a la piel✨.\r\n\r\nLibre de Fragancia. Libre de Parabenos.\r\n\r\nMODO DE USO: Aplicar por la noche sobre la superficie de la piel a tratar, una vez limpia y seca, en rostro, cuello y escote realizando un suave masaje hasta su absorción.\r\n',1,'2023-07-21 16:42:49',NULL,'2023-07-21 16:42:49',NULL),('a541d777-7dce-426b-aaa8-421978c2486e','Producto prueba Formato',3333,'Este es un formato para la prueba del formato esperado. Este producto viene bien. Lorem ipsum lorem ipsum.',1,'2023-07-26 17:58:28',NULL,'2023-07-26 18:25:09',NULL),('a9c2dc18-3086-4d3c-94b6-18f5f5db2e6b','Espuma de limpieza 3 en 1',9000,'Limpia, desmaquilla e hidrata ?\r\n\r\nLa limpieza facial es un paso indispensable y necesario para mantener una piel saludable luminosa y protegida de los contaminantes que generan el envejecimiento prematuro. \r\n\r\n??Limpiar es el primer paso de una correcta higiene.\r\nSu fórmula en espuma micelar retira rápida, suave y fácilmente el maquillaje y las impurezas. Deja la piel visiblemente más fresca, limpia e hidratada.\r\n\r\nEstá específicamente pensado para pieles de normales a mixtas.\r\n\r\n✨Libre de fragancia, colorantes y parabenos.✨\r\n\r\nMODO DE USO: Aplicar por la mañana y por la noche en rostro, cuello y escote. Enjuagar con agua.\r\n',1,'2023-07-12 16:12:02',NULL,'2023-07-21 15:16:01',NULL),('c1f196b4-8861-4032-ba39-523530df0299','Latisse',15000,'LATISSE es un tratamiento del laboratorio francés Allergan, aprobado por la FDA y sin parabenos que permite obtener pestañas más largas, gruesas y oscuras. \r\nSe aplica por la noche antes de ir a dormir. \r\n\r\n??Los resultados comienzan a verse a las 4 semanas de aplicación, viendo resultados completos a la semana 12 del tratamiento. Luego se aplica 1 vez por semana para mantenimiento. Está indicado en cualquier persona que desee mejorar el aspecto de sus pestañas.\r\n\r\n\r\n',1,'2023-07-21 16:44:41',NULL,'2023-07-21 16:44:54',NULL),('db005c8d-ccd0-4e0e-9d36-aaed244e8559','Crema despigmentante',15000,'Emulsión con un innovador y poderoso complejo antimanchas, despigmentante e hidratante de rápida absorción que ayuda a unificar el color de la piel disminuyendo manchas e hiperpigmentaciones en rostro, cuello y escote. Logrando el aspecto deseado.\r\n\r\n✨Su formulación sinérgica aporta luminosidad, brillo y tersura a la piel✨.\r\n\r\nIngredientes:Tranexámico 3% + Niacinamida 2% + Vit C 4% + Arbutina 2%. Con Enoxolona.\r\n\r\n?Hipoalergénico.Sin Parabenos. Sin Fragancia. Free Mineral Oil.\r\n\r\n??MODO DE USO: Aplicar únicamente por la noche sobre la superficie de la piel a tratar, una vez limpia y seca, en rostro, cuello y escote. Utilizar protección solar durante el día.\r\n',1,'2023-07-04 11:31:11',NULL,'2023-07-21 15:18:06',NULL),('e3da8d17-89bb-4f42-8ae7-77791d9f4533','Contorno de Ojos',12000,'Esta línea ofrece prevención y tratamiento a la zona del contorno de ojos otorgando luminosidad natural y revitalización de la mirada ✨?️.\r\n\r\nCon ingredientes que renuevan el aspecto de la piel alisandola, y además desacelera la aparición de líneas de expresión. \r\n\r\n?Nuestra presentación con dosificador ofrece excelente comodidad en su uso y garantiza la efectividad del tratamiento.\r\n\r\nPara todo tipo de piel. Sin fragancias.\r\n',1,'2023-07-12 16:10:48',NULL,'2023-07-26 13:35:26',NULL),('f05669b2-7376-4d5c-9e4a-6f2bd654cd89','Serum de Vitamina C',13000,'Triple Acción: \r\n 1- Antioxidante. \r\n 2- Luminosidad. \r\n 3- Antiage.\r\n \r\nAdemás brinda un efecto Antipolusión ✨\r\n\r\nPara todo tipo de piel\r\n\r\nMODO DE USO: Aplicar 3 5 4 gotas por día sobre la superficie de la piel, una vez limpia y seca. Podés aplicarlo en rostro, cuello y escote, masajeando suavemente hasta su absorción. \r\nRecomendamos dejar actuar unos instantes antes de aplicar su crema hidratante habitual y utilizar protección solar durante el día.\r\n',1,'2023-07-21 16:35:52',NULL,'2023-07-21 16:35:52',NULL);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_files`
--

DROP TABLE IF EXISTS `products_files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products_files` (
  `id` int NOT NULL AUTO_INCREMENT,
  `filename` text,
  `products_id` varchar(36) DEFAULT NULL,
  `file_types_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `products_files_ibfk_2` (`file_types_id`),
  KEY `products_files_ibfk_3` (`products_id`),
  CONSTRAINT `products_files_ibfk_2` FOREIGN KEY (`file_types_id`) REFERENCES `file_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `products_files_ibfk_3` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_files`
--

LOCK TABLES `products_files` WRITE;
/*!40000 ALTER TABLE `products_files` DISABLE KEYS */;
INSERT INTO `products_files` VALUES (108,'ll1812pi0i.MP4','a541d777-7dce-426b-aaa8-421978c2486e',2),(109,'o5lhw9lcrr.webp','a541d777-7dce-426b-aaa8-421978c2486e',1),(110,'3xxni8kc17.webp','a541d777-7dce-426b-aaa8-421978c2486e',1);
/*!40000 ALTER TABLE `products_files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipping_addresses`
--

DROP TABLE IF EXISTS `shipping_addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shipping_addresses` (
  `id` varchar(36) NOT NULL,
  `street` varchar(255) DEFAULT NULL,
  `apartment` varchar(45) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `provinces_id` int DEFAULT NULL,
  `zip_code` varchar(10) DEFAULT NULL,
  `users_id` varchar(36) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `addresses_ibfk_1` (`users_id`),
  CONSTRAINT `shipping_addresses_ibfk_1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipping_addresses`
--

LOCK TABLES `shipping_addresses` WRITE;
/*!40000 ALTER TABLE `shipping_addresses` DISABLE KEYS */;
INSERT INTO `shipping_addresses` VALUES ('2','Juana Azurduy',NULL,'Nunez',1,'1430','8',NULL,'2023-07-04 14:16:24',NULL),('3','Libertador 2232','3B','Nuñez',1,'1430',NULL,'2023-07-04 14:35:12','2023-07-15 23:03:08',NULL),('30cb8ec9-a017-4399-b920-ed141012af2c','Livertador 1300',NULL,'CABA',1,'1212','2e703d70-fbaf-4674-9c76-238d5ec4f44e','2023-07-13 00:46:10','2023-07-13 01:06:06',NULL),('4','Corrientes',NULL,'Nuñez',1,'1429','11','2023-07-04 20:56:40','2023-07-04 20:56:40',NULL),('5','Santa fe 329','3f','caba',1,'1111',NULL,'2023-07-12 20:31:05','2023-07-12 20:31:05',NULL),('5e26ad3a-5a9a-4f06-960d-036f9597ed41','Juncal 2222','3a','Recoleta',1,'1211',NULL,'2023-07-18 00:10:30','2023-07-18 00:10:30',NULL),('6','Santa Fe 312','0','CABA',1,'1111',NULL,'2023-07-12 20:51:28','2023-07-12 20:51:28',NULL),('6c6412fa-f589-46f9-a153-3f637b06b287','Juana Azurduy 1730',NULL,'Nuñez',1,'1429',NULL,'2023-07-17 16:57:11','2023-07-17 16:57:11',NULL),('73d98bfc-77c4-4da7-9796-f147dd01ab84','Juncal 2222','3a','Recoleta',1,'1211',NULL,'2023-07-18 00:11:58','2023-07-18 00:11:58',NULL),('76205f7b-1754-4108-84f2-649147d848d4',NULL,NULL,NULL,1,NULL,'f636404c-60bc-41e1-bd7a-14d629ac7f07','2023-07-17 23:24:15','2023-07-17 23:24:17',NULL),('a83e27c8-4833-42a8-b90d-8f320c1e56eb','Juncal 2222','3a','Recoleta',1,'1211',NULL,'2023-07-18 00:08:15','2023-07-18 00:08:15',NULL),('f895b5fe-cade-480e-9f34-0c947fe216ac','Callao 6969','9b','CABA',1,'1469','10','2023-07-15 23:03:09','2023-07-15 23:03:09',NULL);
/*!40000 ALTER TABLE `shipping_addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `specialties`
--

DROP TABLE IF EXISTS `specialties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `specialties` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `src` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `specialties`
--

LOCK TABLES `specialties` WRITE;
/*!40000 ALTER TABLE `specialties` DISABLE KEYS */;
INSERT INTO `specialties` VALUES (1,'Estética facial','servicios1.jpg'),(2,'Medicina Regenerativa','servicios2.jpg'),(3,'Estética corporal','servicios3.jpg'),(4,'ODONTOLOGIA','servicios4.jpg');
/*!40000 ALTER TABLE `specialties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `specialties_services`
--

DROP TABLE IF EXISTS `specialties_services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `specialties_services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `specialties_id` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`),
  KEY `specialties_id` (`specialties_id`),
  CONSTRAINT `specialties_services_ibfk_1` FOREIGN KEY (`specialties_id`) REFERENCES `specialties` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `specialties_services`
--

LOCK TABLES `specialties_services` WRITE;
/*!40000 ALTER TABLE `specialties_services` DISABLE KEYS */;
INSERT INTO `specialties_services` VALUES (1,1,'Armonización facial','La percepción de un rostro bello, armónico y natural depende fundamentalmente de las proporciones de una parte de nuestro rostro en relación con otra.'),(2,1,'BOTOX®️','Uno de los tratamientos con más demanda a nivel mundial, del que podemos beneficiarnos en sus múltiples usos.'),(3,1,'COSMETOLOGIA','La piel que siempre soñaste está mucho más cerca de lo que te imaginas.'),(4,1,'TRATAMIENTO DE PAPADA','Una de las zonas que todos queremos mejorar. Siempre con la cabeza en alto y con la ayuda de los tratamientos adecuados en cada caso obtenemos esos resultados que tanto buscamos.'),(5,1,'BIOESTIMULADORES','Llegaron para quedarse! Representan los últimos avances en estética facial que todos queremos. Sin aportar volumen estimulan potentemente a nuestras células para que produzcan grandes cantidades de colageno.'),(6,4,'ODONTOLOGIA GENERAL','Todos deberíamos saber el bien que una simple sonrisa puede hacer.'),(7,4,'TRATAMIENTO DE BRUXISMO','El Bruxismo es el apretamiento o rechinamiento de los dientes que se realiza tanto de forma consciente como inconsciente; y afecta a una gran parte de la población.'),(8,4,'DISEÑO DE SONRISA','Para comenzar realizamos un estudio completo del rostro del paciente tomando medidas dentarias y faciales, escaneo digital de la boca y fotografías. Mediante esta información podremos definir el largo, ancho y anatomía ideal de cada uno de sus dientes en perfecta relación a al rostro y a sus labios. Toda esta información es enviada al laboratorio quien confeccionará una impresión digital del modelo de la boca con la forma exacta del diseño realizado, que será probado en el paciente mediante un material provisorio para visualizar el agrado del diseño. Y en base al mismo proceder a confeccionar las carillas.  ');
/*!40000 ALTER TABLE `specialties_services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `temporal_carts`
--

DROP TABLE IF EXISTS `temporal_carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `temporal_carts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `users_id` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `temporal_carts_ibfk_1` (`users_id`),
  CONSTRAINT `temporal_carts_ibfk_1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `temporal_carts`
--

LOCK TABLES `temporal_carts` WRITE;
/*!40000 ALTER TABLE `temporal_carts` DISABLE KEYS */;
INSERT INTO `temporal_carts` VALUES (27,'10'),(29,'12'),(26,'2e703d70-fbaf-4674-9c76-238d5ec4f44e'),(28,'f636404c-60bc-41e1-bd7a-14d629ac7f07');
/*!40000 ALTER TABLE `temporal_carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `temporal_items`
--

DROP TABLE IF EXISTS `temporal_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `temporal_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `temporal_cart_id` int DEFAULT NULL,
  `products_id` varchar(36) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `temporal_cart_id` (`temporal_cart_id`),
  KEY `temporal_items_ibfk_2` (`products_id`),
  CONSTRAINT `temporal_items_ibfk_1` FOREIGN KEY (`temporal_cart_id`) REFERENCES `temporal_carts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `temporal_items_ibfk_2` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `temporal_items`
--

LOCK TABLES `temporal_items` WRITE;
/*!40000 ALTER TABLE `temporal_items` DISABLE KEYS */;
INSERT INTO `temporal_items` VALUES (85,26,'e3da8d17-89bb-4f42-8ae7-77791d9f4533',1),(86,26,'a9c2dc18-3086-4d3c-94b6-18f5f5db2e6b',1),(88,27,'db005c8d-ccd0-4e0e-9d36-aaed244e8559',1),(92,28,'7e4b718f-1f11-452f-9aa9-54d9a059d881',1),(93,28,'db005c8d-ccd0-4e0e-9d36-aaed244e8559',1),(95,29,'7e4b718f-1f11-452f-9aa9-54d9a059d881',1),(96,29,'e3da8d17-89bb-4f42-8ae7-77791d9f4533',1);
/*!40000 ALTER TABLE `temporal_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `treatments`
--

DROP TABLE IF EXISTS `treatments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `treatments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `specialties_id` int DEFAULT NULL,
  `specialties_services_id` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `price` int DEFAULT NULL,
  `cash_price` int DEFAULT NULL,
  `application_time` text,
  `duration` text,
  `filename` text,
  PRIMARY KEY (`id`),
  KEY `treatments_ibfk_1` (`specialties_id`),
  KEY `treatments_ibfk_2` (`specialties_services_id`),
  CONSTRAINT `treatments_ibfk_1` FOREIGN KEY (`specialties_id`) REFERENCES `specialties` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `treatments_ibfk_2` FOREIGN KEY (`specialties_services_id`) REFERENCES `specialties_services` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `treatments`
--

LOCK TABLES `treatments` WRITE;
/*!40000 ALTER TABLE `treatments` DISABLE KEYS */;
INSERT INTO `treatments` VALUES (1,1,1,'B-UP','Es una novedosa técnica realizada con acido hialuronico que consiste en trabajar sobre áreas específicas de la región temporal a nivel del cuero cabelludo, con el objetivo de lograr un reposicionamiento de los tejidos elevándolos  en contra de los vectores de envejecimiento logrando una notable mejoría del rostro, sin cambiar las facciones del mismo.',5000,4500,'30 min','12-18 meses',NULL),(2,1,1,'OJERAS','El relleno de ojeras se realiza con un ácido hialurónico especial para esa zona, corrige el surco palpebromalar hundido mejorando el aspecto de un rostro aparentemente cansado. Se realiza en una sola sesión y tiene una duración entre 12 a 18 meses. El procedimiento es  prácticamente indoloro y el resultado es inmediato.',7000,3500,'30','12-18 meses',NULL),(3,1,1,'POMULOS','Mediante la aplicación de ácido hialurónico podemos crear una estructura de mejillas equilibrada logrando elevación, contorno y definición. Los pómulos en una mujer están asociados con el atractivo facial, un contorno suave y curvo transmite salud y juventud. La estructura fuerte y definida de las mejillas en un hombre se asocia con la masculinidad y el atractivo. La técnica que utilizamos al trabajar sobre pómulos también tiene como objetivo generar puntos de tensión que ayudan a reposicionar tejidos y así reducir los surcos nasogenianos y a suavizar indirectamente ojeras. logrando un rostro más definido, estilizado y atractivo.',NULL,NULL,'30 min','18-24 meses',NULL),(4,1,1,'TEMPORALES','La pérdida de volumen en la frente y en las sienes durante el proceso de envejecimiento conduce al descenso de las cejas y tiene un impacto negativo en áreas más distantes como las ojeras. Mediante los rellenos de AH devolvemos el volumen perdido en las sienes y la frente logrando un contorno más juvenil y proporcionando apoyo para levantar las cejas naturalmente. Es ideal combinar este tratamiento con BOTOX®️ para reducir sustancialmente la aparición de arrugas y terminar de dar una elevación natural a las cejas.',NULL,NULL,'30 min','18-24 meses',NULL),(5,1,1,'RINOMODELACION','Utilizamos un acido hialuronico de altísima calidad con una densidad específica para este área, permitiéndonos rectificar y definir el dorso de la nariz para una apariencia más suave, así como para levantar la punta nasal, con resultados potencialmente transformadores. El tratamiento se realiza en una sola sesión y es totalmente ambulatorio, los resultados se ven en el momento, sin hematomas postoperatorios o molestias.',NULL,NULL,'30 min','12-18 meses',NULL),(6,1,1,'SURCO NASOGENIANO','Para tratar el surco nasogeniano nos basamos en el estudio de vectores de envejecimiento y reposicionamiento de los tejidos. Para mejorar el surco nasogeniano colocamos ácido hialurónico en áreas específicas de pomulos, no para aportar volumen sino para producir el repocisionamiento facial logrando la mejoría del surco indirectamente y obteniendo como resultado un rostro fresco, natural y armónico.',NULL,NULL,'30 min','12-18 meses',NULL),(7,1,1,'LABIOS','Previo al tratamiento realizaremos un diseño donde vamos a evaluar tu anatomía, edad, y expectativas para lograr resultados que se ajusten perfectamente a tus necesidades y a tu rostro. Utilizamos un ácido hialurónico con una densidad ideal para este área que nos permitirá optimizar la forma, proporción, estructura y volumen de los labios, como también elevar comisuras y corregir posibles asimetrías. También podemos tratar las \"líneas de fumador\" y mejorar la calidad de la piel ya que genera hidratación, aportando un resultado de labios cuidados y tersos.',NULL,NULL,'30 min','12-18 meses',NULL),(8,1,1,'DEFINICION MANDIBULAR','Utilizamos un Ácido Hialurónico de altísima calidad con una densidad específica para tratar este área. Previamente tomamos medidas y proporciones faciales para realizar el diseño correcto para cada rostro. Cabe destacar que tenemos en cuenta ángulos y proporciones muy diferentes en hombres y en mujeres. Los resultados se ven de inmediato, es un procedimiento prácticamente indoloro, y la duración es de 2 años aproximadamente. El resultado es un rostro más definido y estilizado en perfecta proporción con el resto del rostro.',3000,2700,'30-45 min','12-18 meses',NULL),(9,1,1,'MENTON','Utilizamos Ácido un Hialurónico de alta densidad para lograr un mentón bien definido con la altura y proyección ideal en cada rostro, consiguiendo un perfil armónico y un rostro más proporcionado; además nos permite mejorar la papada por tensión indirecta de la piel de la zona. Los resultados son instantáneos, es un procedimiento prácticamente indoloro, y la duración es de 2 años aproximadamente.',NULL,NULL,'30 min','18-24 meses',NULL),(10,1,1,'TOP MODEL LOOK','La técnica “Top Model Look” tiene como objetivo lograr un rostro más atractivo con un efecto ‘contouring’ mediante la definición de la zona del hueso lateral de las mejillas. Trabajamos con acido hialuronico de alta y baja densidad, consiguiendo además generar un efecto tensor.',NULL,NULL,'60 min','12-18 meses',NULL),(11,1,1,'MASCULINIZACION FACIAL','Utilizamos Ácido Hialurónico de altísima calidad con una densidad especifica para cada área del rostro; previamente tomamos medidas y proporciones faciales para realizar el diseño correcto. Trabajamos fundamentalmente en áreas claves de mejillas, mandíbula y mentón otorgando definición,  proporción y ángulos en base a una anatomía masculina ideal. Los resultados son siempre naturales y armónicos y se ven de inmediato. El procedimiento es prácticamente indoloro, y la duración es de 2 años aproximadamente.',NULL,NULL,'60 min','18-24 meses',NULL),(12,1,1,'FULL FACE','La armonización facial es un procedimiento que se basa en un diagnóstico facial completo tomando medidas y proporciones faciales para el tratamiento de múltiples áreas del rostro utilizando Ácido Hialurónico en combinación con BOTOX®️ y bioestimuladores. El principal objetivo es reequilibrar las proporciones faciales, mejorar la definición y contornos, corregir irregularidades, reducir la apariencia de arrugas y ojeras; y reactivar la producción de colageno por parte de nuestras propias células. Los tratamientos se adaptan a cada paciente para lograr la mejor version de sí mismos, con resultados SIEMPRE naturales. La armonización facial puede ser realmente transformadora, proporcionando una mejora estética sustancial de la parte media del rostro (mejillas, área de los ojos, nariz), la parte inferior (mentón, línea de la mandíbula, labios) y la parte superior (frente, sienes y cejas). Este tratamiento requiere técnicas y conceptos avanzados, con un profundo conocimiento de la anatomía facial, vectores de envejecimiento y tecnologías de productos.',3000,2700,'60 min','12-24 meses',NULL),(13,1,1,'BICHECTOMIA','La bichectomia es una cirugía mínimamente invasiva que se realiza una sola vez en la vida, se realiza con anestesia local en un tiempo aproximado de 30 minutos; consiste en extraer las bolsas de Bichat que son unas bolsitas de grasa encapsulada que tenemos naturalmente a cada lado de nuestras mejillas. Se realiza mediante una pequeña incisión por dentro de la mejillas y luego se cierra con un solo punto de cada lado. El resultado es un afinamiento del rostro resaltando pómulos y dejando una cara más angulosa y estética. Al ser un tipo de grasa encapsulada, no se vuelve a regenerar, manteniendo los resultados al margen de un aumento de peso.',3000,2700,'60 min','permanente',NULL),(14,1,2,'BOTOX®️ ESTETICO (FRENTE ENTRECEJO Y PATAS DE GALLO)','Relaja de forma selectiva los grupos musculares responsables de las arrugas de expresión, ilumina los ojos y elimina el gesto de estar permanentemente preocupado, consiguiendo una mirada fresca y descansada. Tratamos siempre la región de frente, entrecejo y patas de gallo con la dosis necesaria adecuada en cada área, sin excluir ninguna de las zonas, debido a que si se trata una zona aislada surgen arrugas compensatorias en las zonas no tratadas. La aplicación se realiza en pocos minutos pudiendo comenzar a ver los resultados entre 24 a 48 horas y viendo el efecto completo a las 2 semanas de aplicación. La duración del efecto es de 6 meses aproximadamente. Los resultados que obtenemos son siempre naturales gracias a nuestra técnica de aplicación altamente especialidada y personalizada en cada paciente.',5000,4500,'30 min','4-6 meses',NULL),(15,1,2,'BOTOX®️ PUNTA NARIZ','En algunos pacientes podemos observar que al hablar o sonreír la punta de la nariz es traccionada hacia abajo. Esto surge por la presencia de un pequeño músculo que es inconstante  (no todos los pacientes lo tienen) que se encuentra situado en la base de la nariz y es el responsable del movimiento de la punta nasal durante la expresión y el habla del paciente. En estos casos tenemos la posibilidad de inactivar este musculo mediante la aplicación de BOTOX®️ para evitar la caída de la punta de la nariz a causa de esta tracción constante, permitiendo que la punta quede elevada durante cualquier expresión.',3000,2700,'30 min','4-6 meses',NULL),(16,1,2,'BOTOX®️ MENTON EMPEDRADO','En muchos pacientes podemos observar que al hablar o expresarse se produce un puntillado o empedrado en la zona de la barbilla que se debe a una hiperactividad muscular en esa área. Esto podemos solucionarlo de una manera muy sencilla aplicando una dosis adecuada de BOTOX®️ para relajar estos músculos  hiperactivos y lograr un mentón liso y agradable ante cualquier expresión.',3000,2700,'30 min','4-6 meses',NULL),(17,1,2,'BOTOX®️ PARA TRATAMIENTO DE CICATRICES','El tratamiento de cicatrices con BOTOX®️ es uno de los más novedosos avances que nos permite mejorar notablemente cualquier tipo de cicatriz mediante su aplicación intracicatrizal. La cantidad de sesiones dependerá del tipo de cicatriz y se realizan con un espacio de 4 semanas entre cada sesión.',3000,2700,'30 min','4-6 meses',NULL),(18,1,2,'MESOBOTOX','Consiste en la aplicación de múltiples pequeñas dosis de Botox en la piel de todo el rostro, con el fin reducir el tamaño de poros pronunciados, la secreción de glándulas sebáceas,  brotes y granitos, consiguiendo una piel más tersa, suave y luminosa.',7000,3500,'30 min','4-6 meses',NULL),(19,1,2,'SONRISA GINGIVAL','El tratamiento de sonrisa gingival con BOTOX®️ consiste en la colocación de algunas unidades de  BOTOX®️ en los músculos elevadores del labio superior, para relajarlos y evitar que el labio se suba de manera exagerada y que se muestre la cantidad justa de encía al sonreír. Logrando una sonrisa armónica y estética. En tan solo 48 hs  comienza el efecto y a las dos semanas de aplicación observamos los resultados finales.',NULL,NULL,'30 min','4-6 meses',NULL),(20,1,2,'BOTOX®️ BRUXISMO','El tratamiento de Bruxismo con Botox es hoy en día el tratamiento más efectivo que soluciona esta afección. Consiste en la colocación de Botox en los músculos que lo provocan haciendo que se relajen y se produzca indefectiblemente un gran alivio, de esta forma evitamos desgastes y roturas dentarias, dolores articulares, de cabeza, oído, y contracturas cervicales asociadas al Bruxismo. La aplicación se lleva a cabo en tan solo unos minutos, y el efecto de relajación comienza a sentirse a las 48 hs luego de la aplicación.',5000,4500,'30 min','4-6 meses',NULL),(21,1,3,'LIMPIEZA FACIAL PROFUNDA','Trabajamos con una técnica específica para mejorar la salud y la apariencia del cutis de forma global. Es el tratamiento cosmetologico más completo para el cuidado de nuestra piel. Eliminamos puntos negros y células muertas, consiguiendo que la piel respire y sean más efectivos los tratamientos subsiguientes. El resultado es una piel limpia, lisa, tersa y renovada. Incluimos en el tratamiento un  ñPeeling Químico que elegimos de forma personalizada acuerdo a los requerimientos de cada piel, también peeling mecánico con puntas de diamante, extracción de comedones y puntos negros de forma manual y con espátula ultrasónica, Ozonoterapia Frío/Calor, mascarilla Descongestiva/Nutritiva y Cabina LED.',NULL,NULL,'60-90 min','Requiere diagnostico',NULL),(22,1,3,'PEELING','Realizamos peelings mecánicos, con puntas de diamante y químicos, con diferentes tipos de ácidos de acuerdo a los requerimientos de cada piel. La combinación de ambos nos brinda resultados óptimos produciendo una renovación celular, atenuando manchas y arrugas finas, dejando como resultado una piel  renovada. Trabajamos con “peelings inteligentes” que pueden ser realizados en cualquier época del año. En cada sesión se realiza una limpieza, exfoliación, peeling con Punta de diamente, peeling con el ácido específico según la problemática a tratar y finalizamos con una mascarilla descongestiva y nutritiva elegida para cada caso en particular.',NULL,NULL,'30 min','Requiere diagnostico',NULL),(23,1,3,'OZONOTERAPIA','El ozono estimula el colágeno, la elastina, es antioxidante y restablece la circulación sanguínea, tiene efecto desinfectante, neutraliza las bacterias de la piel. Gracias a este tratamiento facial cerramos los poros de la piel y mejoramos las manchas.',NULL,NULL,'Requiere diagnostico','Requiere diagnostico',NULL),(24,1,3,'EXTRACCION DE COMEDONES','Procedimiento no agresivo ni invasivo, destinado a mejorar el aspecto de la piel, corregir la dilatación de los poros, eliminar las células más superficiales y extraer los famosos \"puntos o negros” o “barritos\" (en dermatología denominados \"comedones\") y microquistes que se van acumulando con el tiempo.',3000,2700,'Requiere diagnostico','Requiere diagnostico',NULL),(25,1,3,'MASCARA LED','Terapia de luz que ayuda al rejuvenecimiento cutáneo con grandes resultados a la hora de reafirmar la piel y tonificar los músculos faciales. Su luz, penetra en la capa de la dermis activando el metabolismo de las células.',NULL,NULL,'Requiere diagnostico','Requiere diagnostico',NULL),(26,1,3,'JELLY MASK','Mascarillas faciales para el cuidado de la piel que se proporcionan en forma de polvo que toma su forma de mascarilla al agregar agua purificada. Crea una capa oclusiva, lo que fuerza la hidratación y empuja todos los nutrientes beneficiosos profundamente en la piel, lo que aumenta la efectividad del procedimiento.',10000,8500,'Requiere diagnostico','Requiere diagnostico',NULL),(27,1,3,'DERMAPLANING','Método de exfoliación físico que consiste en utilizar un bisturí para eliminar suavemente la capa superior de la piel constituida por células muertas como también el vello o pelusa facial, con el fin de revelar una tez más brillante y suave.',3000,2700,'30 min','Requiere diagnostico',NULL),(28,1,3,'MASAJE FACIAL','Tratamiento de belleza que abarca un conjunto de técnicas basadas en manipulaciones manuales sobre el cutis. Por lo general, se realizan pequeños movimientos sobre el rostro, aplicando diferentes grados de intensidad, superficial o profunda.',NULL,NULL,'30-60 min','Requiere diagnostico',NULL),(29,1,3,'LASER NORDLYS','Láser no invasivo de una altísima capacidad rejuvenecedora que te permite continuar con tus actividades de inmediato. En muy pocas sesiones logramos cambios increíbles en la piel logrando un rejuvenecimiento 360* trabajando manchas, telangectasias, rosácea, arañitas, microarrugas, cicatrices de acné, acné activo y estimulando la producción de colageno y elastina de tu piel. Logra un rejuveneccimiento integral de la piel, mejorando la tonalidad y la textura, dando un aspecto brillante y más joven de forma segura y con resultados desde la primera sesión. Podemos utilizarlo en rostro, cuello, manos y escote.',NULL,NULL,'45 min','Requiere diagnostico',NULL),(30,1,4,'LIPOLISIS ENZIMATICA DE PAPADA','Tratamiento donde aplicamos enzimas lipolíticas especiales para esta zona en forma de micro inyecciones.Eliminan el tejido adiposo disolviendo las células de grasa en forma segura, rápida y altamente efectiva. Los resultados se ven a los 15 días de la primera sesión evaluando en esa etapa si son necesarias más sesiones.',NULL,NULL,'30 min','Requiere diagnostico',NULL),(31,1,4,'HIFU PAPADA','Tecnología no invasiva más efectiva del mercado para la flaccidez de la piel. Indicado también para reducir adiposidad localizada. Genera un efecto tensor ayudando además a definir el contorno facial.',10000,8500,'30 min','Requiere diagnostico',NULL),(32,1,5,'RADIESSE','Radiesse es un bioestimulador ideal para corregir los signos de envejecimiento facial y redefinir el contorno del rostro, de manera segura, ambulatoria y sin ninguna cirugía. No se utiliza como material de relleno sino que se aplica en puntos claves para estimular naturalmente la producción de colageno propio creando un efecto lifting. Su efecto dura aproximadamente 2 años.',NULL,NULL,'30 min','Requiere diagnostico',NULL),(33,1,5,'LONG LASTING','Long Lasting es un ‘Skin Builder’ que estimula a tus células para que comiencen a producir gran cantidad de colágeno y elastina. Su fórmula es a base de un ácido hialurónico especial combinado con poderosísimos antioxidantes. Se aplica en 7 puntos estratégicos a cada lado del rostro; también puede aplicarse en cuello, escote y manos. Revitaliza tu piel, tensando, hidratando y brindándole una luz increíble a los minutos de ser aplicado. Además redensifica la piel, eliminando micro arrugas y mejorando notablemente los surcos nasogenianos. Su aplicación es rápida e indolora y sólo se requiere 1 sesión al año gracias a su efecto de larga duración.',NULL,NULL,'30 min','Requiere diagnostico',NULL),(34,1,5,'GOURI','Bioestimulador de colágeno intradérmico de policaprolactona. Su principal ventaja es su forma completamente líquida, sin micropartículas lo que permite que además de no generar volumen, que el producto se extienda y estimule la síntesis de colágeno en todo el rostro minimizando los puntos de inyección. Su aplicación es rápida y sencilla, y abarca la estimulación completa del rostro desde la frente hasta el mentón. Corrige arrugas y pliegues profundos, tensa la piel, redefine los contornos faciales, mejora la flaccidez y las cicatrices notablemente. Gouri continua estimulando la producción de colágeno propio a largo plazo. Fue elegido como el mejor bioestimulador de colágeno por los premios AMWC.',3000,2700,'30 min','Requiere diagnostico',NULL),(35,1,5,'PROFHILO','Es el más novedoso Ácido Hialurónico de larga duración. Se utiliza para estimular la producción de colágeno, hidrata, tensa, ilumina, mejora notablemente la tonicidad, rejuveneciendo la piel, tanto de rostro, cuello, escote y manos. Su avanzada fórmula contiene la concentración mas alta de ácido Hialurónico en el mercado. Su aplicación es rápida e indolora. Se coloca en 5 puntos estratégicos a cada lado del rostro y se repite una segunda sesión a los 30 días para lograr que los efectos en tu piel se mantengan por más de un año.',NULL,NULL,'30 min','Requiere diagnostico',NULL),(36,1,5,'HARMONYCA','Es el último bioestimulador que ingresó a nuestro país. Compuesto por partículas de hidroxiapatita cálcica mezcladas tecnológicamente con ácido hialurónico reticulado. Esta perfecta combinación permite tensar los tejidos del rostro de manera inmediata como también continuar con una estimulación a largo plazo. Mejora notablemente la densidad y el estado de la piel, logrando un rostro más reposicionado y definido.',3000,2700,'Requiere diagnostico','Requiere diagnostico',NULL),(37,2,NULL,'SUERO TERAPIA','Consiste en la aplicación intravenosa de sustancias como biorreguladores, mega dosis de vitaminas, minerales, aminoácidos, enzimas y oligoelementos que reparan y rejuvenecen las células del cuerpo y neutralizan los radicales libres. Generan bienestar, optimizando la salud y el aspecto físico. Ayudan a estimular los mecanismos de defensa y a la desintoxicación, regeneración y reparación del organismo.',NULL,NULL,'60 min','Requiere diagnostico',NULL),(38,2,NULL,'VACUNA ANTI AGE','La vacuna anti age es uno de los más novedosos avances de la medicina ortomolecular, compuesta a base de un hidrolizado de células rejuvenecedoras. Tiene un poderoso efecto Anti age, Revitalizante, Antioxidante celular y Preventivo de enfermedades degenerativas. El tratamiento consiste en la aplicación de 1 dosis por semana durante 5 semanas, obteniendo resultados increíbles no solo a nivel de piel, pelo y uñas sino que también genera un gran impacto en el bienestar físico y energético.',NULL,NULL,'30 min','Requiere diagnostico',NULL),(39,2,NULL,'SUPLEMENTACION','Si bien podemos seguir una dieta muy saludable, nunca llegamos a incorporar la cantidad de nutrientes, vitaminas y minerales que idealmente nuestro cuerpo necesita; es por eso que la suplementación juega un papel importantísimo en nuestro bienestar. Para esto debemos realizar un buen diagnóstico, con análisis correspondientes definiendo qué tipo de suplementación es la ideal para cada paciente.  ',NULL,NULL,'Requiere diagnostico','Requiere diagnostico',NULL),(40,2,NULL,'PLASMA RICO EN PLAQUETAS','Procedimiento en el cual se realiza una extracción de sangre, se centrifuga separando las células de la sangre del plasma, que es quien tiene todos los factores de crecimiento; este último se activa y se vuelve a inyectar en la zona a tratar. El protocolo ideal es realizar 3 sesiones con una frecuencia de 30 días. ',NULL,NULL,'45 min','Requiere diagnostico',NULL),(41,2,NULL,'PLASMA CAPILAR','Detiene la caída del cabello y estimula al crecimiento del cabello mejorando tanto  su calidad como grosor de manera notable.',NULL,NULL,'45 min','Requiere diagnostico',NULL),(42,2,NULL,'PLASMA CORPORAL','Actúa regenerando los tejidos, mejorando notablemente estrías, flacidez cutánea y celulitis.',NULL,NULL,'45 min','Requiere diagnostico',NULL),(43,2,NULL,'PLASMA EN ROSTRO, ESCOTE Y MANOS','Otorga una luminosidad inigualable, mejora notablemente líneas de expresión, manchas y cicatrices, cierra poros y tensa la piel.',NULL,NULL,'90 min','Requiere diagnostico',NULL),(44,2,NULL,'ANTROPOMETRIA','Es un estudio de composición corporal que consiste en la medición de partes específicas del cuerpo con el fin de evaluar el estado nutricional de un paciente y así poder crear programas de nutrición personalizados.',3000,2700,'Requiere diagnostico','Requiere diagnostico',NULL),(45,2,NULL,'NUTRICION DEPORTIVA','Se especializa en elaborar planes de alimentación adaptados al ejercicio. Es decir, nos enfocamos en crear programas nutricionales acorde al desgaste físico al que se somete cada paciente, logrando optimizar la composición corporal. ',7000,3500,'Requiere diagnostico','Requiere diagnostico',NULL),(46,2,NULL,'NUTRICIÓN ESTÉTICA','Luego de un estudio exhaustivo de cada paciente, contamos con la información necesaria para modificar ciertos  aspectos en la alimentación y el estilo de vida; impactando positivamente en la salud intestinal, que repercute directamente en la salud de la piel, los procesos de envejecimiento y el bienestar de una persona, alargando así  su juventud.',NULL,NULL,'Requiere diagnostico','Requiere diagnostico',NULL),(47,3,NULL,'HIPERHIDROSIS MANOS, AXILAS Y PIES','El tratamiento para la hiperhidrosis o sudoración excesiva de axilas, manos o pies consiste en la aplicación de Botox de forma subcutánea; haciendo que disminuya notablemente la sudoración en el área tratada. Es un procedimiento seguro, sencillo, prácticamente indoloro que no requiere anestesia.',NULL,NULL,'30 min','4-6 meses',NULL),(48,3,NULL,'HIFU CORPORAL','Es una novedosa tecnología que genera increíbles resultados en el retensado de los tejidos. A nivel corporal podemos trabajar zonas como brazos, abdomen, piernas, flacos y gluteos . Contamos con el equipo original en su última versión, que nos brinda resultados sumamente efectivos. La sesión dura 45 min y puede realizarse en cualquier época del año. ',NULL,NULL,'60 min','12 meses',NULL),(49,3,NULL,'TRATAMIENTOS LIPOLITICOS','Tratamiento que sirve para reducir la adiposidad localizada en áreas del cuerpo como abdomen, piernas y glúteos. Aplicamos enzimas lipolíticas en forma de micro inyecciones que actúan disolviendo las células de grasa en forma segura, rápida y efectiva. Los resultados se ven a los 15 días de la primera sesión evaluando en esa etapa si son necesarias más sesiones.',NULL,NULL,'Requiere diagnostico','Requiere diagnostico',NULL),(50,4,6,'LIMPIEZA DENTAL','Mediante un equipo de ultrasonido desprendemos placa bacteriana, manchas y sarro que se acumulan sobre las piezas dentarias con el paso del tiempo. La frecuencia sugerida para realizarla es entre 4 a 6 meses.',10000,8500,'30 min','6 meses',NULL),(51,4,6,'BLANQUEAMIENTO DENTAL','Lo realizamos mediante una técnica combinada. Consiste en una sesión en nuestra clinica en la que colocamos un gel blanqueador sobre las piezas dentarias que es activado por una luz láser durante el periodo de 1 hora; al finalizar te entregamos unas cubetas confeccionadas a medida, junto a otro producto blanqueador para continuar el tratamiento en tu hogar 1 semana 2 horas al día. Este sistema de blanqueamiento de última generación no causa sensibilidad y protege la integridad del esmalte en su totalidad. Al ser progresivo nos permite llegar al color ideal y tener una larga duración en el tiempo.',3000,2700,'60 min','8-12 meses',NULL),(52,4,6,'ORTODONCIA','Invisalign es la ortodoncia invisible con mejores resultados finales comprobados en el mercado; finaliza los casos con mayor rapidez que cualquier otro tipo de ortodoncia y permite trabajar desde casos simples hasta casos muy complejos. Para comenzar el tratamiento se realiza un escaneo digital de la boca, se toman fotos y medidas del paciente los cuales son enviados a un laboratorio en California; a los 30 días recibimos el sistema completo de alineadores en Argentina. Los tratamientos están terminados en promedio entre 5 y 11 meses en la mayoría de los casos (con una rapidez mucho mayor a los brackets). Es sin duda el método más cómodo, rápido y estético de alinear tus piezas dentarias.',NULL,NULL,'45 min','Requiere diagnostico',NULL),(53,4,6,'ENDODONCIA','Conocido comúnmente como “tratamiento de conducto”; tiene como finalidad preservar las piezas dentales dañadas, evitando su pérdida. Para ello, se extrae la pulpa dental y la cavidad resultante, se rellena y sella con material  biocompatible, avistando así una extracción dentaria.',3000,2700,'60 min','Permanente',NULL),(54,4,6,'PERIODONCIA','Consiste en la preservación y tratamiento de los tejidos que protegen y rodean nuestros dientes: encía, hueso, ligamento periodontal y raíz. Se lleva a cabo mediante limpiezas dentarias profundas para tratar gingivitis (encías sangrantes) o periodontitis. También  incluye recortes o injertos de encías según sea necesario.',NULL,NULL,'60 min','Requiere diagnostico',NULL),(55,4,6,'IMPLANTES DENTALES','Un Implante dental es un tornillo de titanio que se coloca dentro del hueso para reemplazar la raíz de una pieza dentaria perdida. Se realiza mediante una cirugía simple y generalmente se espera un periodo de 3 meses para la colocación de la corona de porcelana o prótesis. Es el tiempo biológico en que tarda en calcificarse el hueso alrededor del implante. Durante ese periodo el paciente estará estéticamente disimulado con un provisorio. La cirugía es totalmente ambulatoria y permite devolver de una manera rápida y simple tanto la estética como la función masticatoria.',NULL,NULL,'60 min','Permanente',NULL),(56,4,7,'PLACA DE RELAJACION','Es un dispositivo removible de acrílico que confeccionamos a medida del paciente y tiene ciertas características que ayudan a atenuar el Bruxismo protegiendo las piezas dentarias y la articulación temporomandibular.',NULL,NULL,'30 min','Requiere diagnostico',NULL),(58,4,8,'CARILLAS DE RESINA','Se realizan en una sola sesión en el consultorio, siempre recomendamos una limpieza y blanqueamiento previo para unificar colores. No requieren desgaste dentario y nos permiten corregir color, forma y textura de los dientes en el acto. También sirven para corregir fracturas y mal posiciones dentarias leves. Requieren de un mantenimiento de pulido cada 6 meses para mantener su color.',5000,4000,'Requiere diagnostico','5 años',NULL),(59,4,8,'CARILLAS DE PORCELANA','Las carillas de porcelana que realizamos son unas carillas del tipo “lente de contacto”, muy delgadas que nos permiten evitar desgastes dentarios. Para realizarlas hacemos siempre un diseño de sonrisa previo planificando la anatomía dentaria ideal en cada caso. El  resultado es una sonrisa en perfecta armonía con el rostro que denota total naturalidad.   Una de sus grandes ventajas es que no se pigmentan y se ven como dientes naturales.',3000,2700,'Requiere diagnostico','10 años',NULL),(60,4,8,'REHABILITACION ORAL','Consiste en un tratamiento bucal integral mediante prótesis fijas, removibles, implantes dentales y ajustes de oclusión. Todo el proceso comienza con un diagnóstico completo de la boca del paciente con la finalidad de devolver salud, estética y funcionalidad.',NULL,NULL,'Requiere diagnostico','Requiere diagnostico',NULL);
/*!40000 ALTER TABLE `treatments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(36) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `dni` varchar(8) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `wpp_notifications` int NOT NULL,
  `email_notifications` int NOT NULL,
  `email_newsletter` int NOT NULL,
  `user_categories_id` int DEFAULT NULL,
  `birth_date` timestamp NULL DEFAULT NULL,
  `genres_id` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `password_token` text,
  PRIMARY KEY (`id`),
  KEY `users_ibfk_1` (`user_categories_id`),
  KEY `genres_id` (`genres_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`user_categories_id`) REFERENCES `users_categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_2` FOREIGN KEY (`genres_id`) REFERENCES `genres` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('0b06d883-f6ba-4f64-bf1d-418230fbbc20','','',NULL,'','$2a$10$5gRGlpd3HTeaYunGidwGUeuvQHG9V1AexKU/U4YW.60OrnJxX5gYu','prueba@gmail.com',0,0,0,3,NULL,NULL,'2023-07-12 12:55:21',NULL,'2023-07-12 12:55:21',NULL),('10','Jano','Pereira Kent','01158817312','43083506','$2a$10$RmzCtFcN7tK1StCTCrULku5nWu.7Fcf.Fy7UwRgkyzQnRB/WQyfDa','janopk789@gmail.com',0,0,0,1,'2001-02-12 00:00:00',NULL,'2023-07-04 14:35:00',NULL,'2023-07-12 14:03:24',NULL),('11','Jano00','Pereira Kent','01158817312','','$2a$10$Vz40dkbxoBxWgbaUrMZbOul97Y59CjL9H6Lq.6Y1boQ5.NLPqiUpq','hola@gmail.com',0,0,0,2,NULL,NULL,'2023-07-04 20:51:27',NULL,'2023-07-04 20:56:39',NULL),('12','Joaquin','Cataldo','','','$2a$10$uNhEJgpj4UeqN3ASr1qsCOsuBqJ4MIRMXeww0gd2Zn/HU3qRVwMou','joaco.cataldo@gmail.com',0,0,0,1,NULL,NULL,'2023-07-05 11:28:07',NULL,'2023-07-05 11:28:30',NULL),('13','Admin','Admin','','','$2a$10$F7R5mDNPyIN755qTjbA6.efd1/xNHMqN2Rn6MuZa/XkyCxodqsUaS','info@ismile.com.ar',0,0,0,2,NULL,NULL,'2023-07-06 22:52:39',NULL,'2023-07-06 23:53:48',''),('15','Inés','Añó',NULL,NULL,'$2a$10$WMQbFld9.6lnnnGNAqdrl.hYIQprJSgtvBZuW.OxE3a73W0NuMf7W','ines.anio@gmail.com',0,0,0,1,NULL,NULL,'2023-07-06 22:58:58',NULL,'2023-07-06 22:58:58',NULL),('16','CJoaquin','Cataldo','','','$2a$10$NneD5C8KExxSt8KgwXGcJewSn62J2dYelRMN7eTbwOER07KleOuNm','joaco.cataldo3@gmail.com',0,0,0,2,NULL,NULL,'2023-07-11 11:10:11',NULL,'2023-07-11 11:10:32',NULL),('17','','',NULL,'','$2a$10$H/XGplmwvmq5ah.nwq6DH.0vCUvzdgmb3De/h45iUrqsLvht5BHf6','jano@gmail.com',0,0,0,3,'2023-07-06 00:00:00',NULL,'2023-07-11 20:12:36',NULL,'2023-07-11 20:12:36',NULL),('2e703d70-fbaf-4674-9c76-238d5ec4f44e','Juan','Gomez','1158817312','43083507','$2a$10$g3oVAsn4v2JipXYB2atgIeimRyvq6bT9OfRIM8Mpmnj3F3ShfGVH2','chau@gmail.com',0,0,0,3,'2023-10-10 00:00:00',2,'2023-07-12 20:22:50',NULL,'2023-07-13 01:06:05',NULL),('8','Jano','Pereira Kent','01158817312','43083507','$2a$10$wcUai1LYaFAVJ1Kt2OcnnOdPHEiTslzDty5X/SIFCroXIji71qLpS','diego@gmail.com',1,0,0,3,NULL,NULL,'2023-07-04 11:30:00',NULL,'2023-07-04 14:16:24',NULL),('f636404c-60bc-41e1-bd7a-14d629ac7f07','Martin','Berra','1144301111','','$2a$10$RkdmG6iBhyoiULCLpZQmNOwZb/GV8y4k/7AouZOfk9CJdgTITsgBi','martin.berra+test@gmail.com',0,0,0,3,'2023-10-10 00:00:00',1,'2023-07-17 23:23:40',NULL,'2023-07-17 23:24:17',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_categories`
--

DROP TABLE IF EXISTS `users_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_categories`
--

LOCK TABLES `users_categories` WRITE;
/*!40000 ALTER TABLE `users_categories` DISABLE KEYS */;
INSERT INTO `users_categories` VALUES (1,'owner'),(2,'admin'),(3,'cliente');
/*!40000 ALTER TABLE `users_categories` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-27 15:16:11
