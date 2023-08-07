-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-08-2023 a las 15:19:33
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ismile`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `billing_addresses`
--

CREATE TABLE `billing_addresses` (
  `id` varchar(36) NOT NULL,
  `street` varchar(255) DEFAULT NULL,
  `apartment` varchar(45) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `provinces_id` int(11) DEFAULT NULL,
  `zip_code` varchar(10) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `billing_addresses`
--

INSERT INTO `billing_addresses` (`id`, `street`, `apartment`, `city`, `provinces_id`, `zip_code`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
('0498c7a9-f133-4b85-beb2-fb8e831024b9', 'Juana Azurduy 1730', '', 'Nuñez', 1, '1429', '2023-07-19 16:01:52', '2023-07-19 16:01:52', NULL),
('072ca0de-9d92-45ae-9c01-757681e54ee8', 'Libertador 1580', '5a', 'Nuñez', 1, '2222', '2023-07-19 13:45:40', '2023-07-19 13:45:40', NULL),
('15097bce-f867-466b-8011-a2a49905bcc0', 'Juana Azurduy 1730', '', 'Nuñez', 1, '1429', '2023-08-05 19:49:26', '2023-08-05 19:49:26', NULL),
('24403f4f-5c3f-47b1-bbfd-76cfe262c97e', 'Av. Libertador 2222', '3F', 'Palermo', 1, '1112', '2023-07-17 14:25:22', '2023-07-17 14:25:22', NULL),
('2c41a0f0-a045-4745-9dce-73efcacfc11f', 'Libertador 1580', '20a', 'Nuñez', 1, '2222', '2023-07-19 13:53:22', '2023-07-19 13:53:22', NULL),
('39a8736e-8fb7-441b-b92e-2229ea6cfe73', '1908 N 58th Way', '', 'Hollywood', 1, '33021', '2023-07-25 11:05:14', '2023-07-25 11:05:14', NULL),
('40d4625a-e539-4ebd-82df-a39ef0990f4f', 'Juana Azurduy 1730', '2a', 'CABA', 1, '1429', '2023-07-21 23:07:40', '2023-07-21 23:07:40', NULL),
('49942240-6749-4d5a-a5b1-572c098da894', 'Juana Azurduy 1730', '12', 'Nuñez', 1, '1429', '2023-07-19 13:57:09', '2023-07-19 13:57:09', NULL),
('5345aa85-682b-4c2c-b908-84107d3914bf', 'Juana Azurduy 1730', '', 'Nuñez', 1, '1429', '2023-08-05 19:46:00', '2023-08-05 19:46:00', NULL),
('5d77b23b-fd8c-45d9-bbae-2fe6b4cbf73f', 'Juana Azurduy 1730', '', 'Nuñez', 1, '1429', '2023-07-19 18:51:36', '2023-07-19 18:51:36', NULL),
('6183530e-3fc9-46c1-b089-8724e54ec5bd', 'Juana Azurduy 1730', '', 'Nuñez', 1, '1429', '2023-08-05 19:41:43', '2023-08-05 19:41:43', NULL),
('66f381f2-de82-41ea-a38f-7cfb102fe3df', 'Juana Azurduy 1730', '', 'Nuñez', 1, '1429', '2023-08-05 19:48:41', '2023-08-05 19:48:41', NULL),
('677964d2-aa7a-4a26-8379-8132fdd4f2ea', 'Juana Azurduy 1730', '', 'Nuñez', 1, '1429', '2023-07-18 00:11:58', '2023-07-18 00:11:58', NULL),
('6a3bc59a-f9aa-484b-bd72-60b7632226b5', 'Libertador 1580', '20a', 'Nuñez', 1, '2222', '2023-07-19 13:55:35', '2023-07-19 13:55:35', NULL),
('6d653043-8048-473b-8149-1de8de673daf', 'Juana Azurduy 1730', '', 'Nuñez', 1, '1429', '2023-08-05 19:39:30', '2023-08-05 19:39:30', NULL),
('7147f039-f430-400f-b6c4-f4ea0f584cd8', 'Juana Azurduy 1730', '', 'Nuñez', 1, '1429', '2023-07-19 14:33:07', '2023-07-19 14:33:07', NULL),
('84e69a73-1210-4c0d-b0e4-cb2ffa14f329', 'Juana Azurduy 1730', '', 'Nuñez', 1, '1429', '2023-07-17 13:42:50', '2023-07-17 13:42:50', NULL),
('8fc54df2-1e59-4df7-9b47-0ebe52d498de', 'Av. Libertador 2222', '10A', 'Belgrano', 1, '1422', '2023-07-17 19:28:42', '2023-07-17 19:28:42', NULL),
('a993d7ba-98d1-4dd4-a479-e6c83fa2b29f', 'Juana Azurduy 1730', '', 'Nuñez', 1, '1429', '2023-07-19 18:53:47', '2023-07-19 18:53:47', NULL),
('bb22b73f-34b0-4013-9a5b-4dff3f16fbe9', 'Juana Azurduy 1730', '', 'Nuñez', 1, '1429', '2023-07-17 19:16:57', '2023-07-17 19:16:57', NULL),
('bc631a0c-8684-4edb-92cd-2010b20f3808', 'Juana Azurduy 1730', '', 'Nuñez', 1, '1429', '2023-08-05 19:42:06', '2023-08-05 19:42:06', NULL),
('bdec0e96-5a12-4809-a9cc-7523ba96dfb0', 'Pepe 1234', '4a', 'CABA', 1, '111111', '2023-07-17 23:34:11', '2023-07-17 23:34:11', NULL),
('be128cc5-d41f-47da-a0a1-aadd458dd6c0', 'Juana Azurduy 1730', '', 'Nuñez', 1, '1429', '2023-07-19 14:31:34', '2023-07-19 14:31:34', NULL),
('c2c08c4b-5220-4e7c-a453-e7472708a260', 'Conde 3229', '2A', 'Coghlan', 1, '1430', '2023-07-17 16:57:11', '2023-07-17 16:57:11', NULL),
('c328920c-0255-41f5-9aed-70817a974cb5', '1908 N 58th Way', '212', 'Hollywood', 1, '33021', '2023-07-25 12:01:51', '2023-07-25 12:01:51', NULL),
('d3cac2a7-c798-4cdc-b5af-2d27936cdff9', 'Juana Azurduy 1730', '', 'Nuñez', 1, '1429', '2023-07-17 22:26:11', '2023-07-17 22:26:11', NULL),
('d5f91132-85b3-4abe-aa1f-60bc18101449', 'Juana Azurduy 1730', '12', 'Nuñez', 1, '1429', '2023-07-19 13:58:12', '2023-07-19 13:58:12', NULL),
('def4d8db-ddaa-42c6-bf8b-a1747fb9bf07', 'Juana Azurduy 1730', '12', 'Nuñez', 1, '1429', '2023-07-19 14:01:17', '2023-07-19 14:01:17', NULL),
('eef923f7-ada6-44c0-a202-77496c2ba424', 'Juana Azurduy 1730', '', 'Nuñez', 1, '1429', '2023-08-05 19:44:17', '2023-08-05 19:44:17', NULL),
('f52d09ec-203f-4993-a026-21bc21f24b2a', 'Juana Azurduy 1730', '', 'Nuñez', 1, '1429', '2023-07-17 17:39:49', '2023-07-17 17:39:49', NULL),
('f7e49784-218f-4c8a-af5c-4fbe92c3bb90', 'Juana Azurduy 1730', '', 'Nuñez', 1, '1429', '2023-08-05 20:15:47', '2023-08-05 20:15:47', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `blogs`
--

CREATE TABLE `blogs` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `text` text NOT NULL,
  `author` varchar(100) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `blogs`
--

INSERT INTO `blogs` (`id`, `title`, `text`, `author`, `createdAt`) VALUES
(25, 'La Verdadera Belleza Es Cuando Te Pones A Quien Realmente Sos💜', '<p>Este texto es de prueba. Un texto es una composición de signos codificados en un sistema de escritura que forma una unidad de sentido. También es una composición de caracteres imprimibles generados por un algoritmo de cifrado que, aunque no tienen sentido para cualquier persona, sí puede ser descifrado por su destinatario original</p>\n<p>Parrafo bien hecho Parrafo mal hecho.Un texto es una composición de signos codificados en un sistema de escritura que forma una unidad de sentido. También es una composición de caracteres imprimibles generados por un algoritmo de cifrado que, aunque no tienen sentido para cualquier persona, sí puede ser descifrado por su destinatario original</p>', 'Jano', '2023-08-03 15:08:03');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `blogs_images`
--

CREATE TABLE `blogs_images` (
  `id` int(11) NOT NULL,
  `filename` varchar(255) NOT NULL,
  `blog_id` int(11) NOT NULL,
  `main_image` int(11) NOT NULL,
  `file_types_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `blogs_images`
--

INSERT INTO `blogs_images` (`id`, `filename`, `blog_id`, `main_image`, `file_types_id`) VALUES
(121, 'blog-u8nepii3vl.webp', 25, 1, 1),
(122, 'blog-ekwnz7olde.webp', 25, 0, 1),
(123, 'blog-zal3b57et2.webp', 25, 0, 1),
(128, 'blog-2hlf7lb3nr.mp4', 25, 0, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `category`, `createdAt`, `deletedAt`) VALUES
(1, 'Producto', NULL, NULL),
(2, 'Servicio', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `file_types`
--

CREATE TABLE `file_types` (
  `id` int(11) NOT NULL,
  `type` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `file_types`
--

INSERT INTO `file_types` (`id`, `type`) VALUES
(1, 'image'),
(2, 'video');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `genres`
--

CREATE TABLE `genres` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `genres`
--

INSERT INTO `genres` (`id`, `name`) VALUES
(1, 'Femenino'),
(2, 'Masculino'),
(3, 'No Binario'),
(4, 'Sin especificar');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `home_files`
--

CREATE TABLE `home_files` (
  `id` int(11) NOT NULL,
  `filename` text DEFAULT NULL,
  `file_types_id` int(11) DEFAULT NULL,
  `home_sections_id` int(11) DEFAULT NULL,
  `position` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `home_files`
--

INSERT INTO `home_files` (`id`, `filename`, `file_types_id`, `home_sections_id`, `position`) VALUES
(1, 'homeFilel6grmld6hll.mp4', 2, 1, NULL),
(2, '4zvsp2yino.webp', 1, 2, 1),
(3, 'homeFile-o18xxj9w9u.jpg', 1, 2, 2),
(4, 'nose.jpg', 1, 2, 3),
(5, 'homeFile-yyxix3xbzf.jpg', 1, 2, 4),
(6, 'hair.jpg', 1, 2, 5),
(7, 'homeFilejlxqhb7na3.webp', 1, 3, 1),
(8, 'ig2.jpeg', 1, 3, 2),
(9, 'homeFile-wjeym5q0gi.jpeg', 1, 3, 3),
(10, 'ig4.jpeg', 1, 3, 4),
(11, 'ig5.jpeg', 1, 3, 5),
(12, 'homeFile-qly531ubu8.avif', 1, 4, NULL),
(13, 'galletyPhoto-mjpl80z86z.webp', 1, 5, NULL),
(14, 'galletyPhoto-3bd2rehhhk.webp', 1, 5, NULL),
(15, 'galletyPhoto-659bdxmhp1.webp', 1, 5, NULL),
(16, 'galletyPhoto-b9cv0fbf64.webp', 1, 5, NULL),
(17, 'galletyPhoto-ohl9dfo1x9.webp', 1, 5, NULL),
(18, 'galletyPhoto-jrsap05nrw.webp', 1, 5, 1),
(20, 'galletyPhoto-iaseb9yvsd.webp', 1, 5, NULL),
(22, 'galletyPhoto-7yaspob7f2.webp', 1, 5, NULL),
(25, 'galletyPhoto-sbwvmjwj37.webp', 1, 5, NULL),
(28, 'galletyPhoto-yixqo5gun7.webp', 1, 5, NULL),
(29, 'galletyPhoto-v58nbp0x7w.webp', 1, 5, NULL),
(32, 'galletyPhoto-6o0oh3etzd.webp', 1, 5, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `home_sections`
--

CREATE TABLE `home_sections` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `home_sections`
--

INSERT INTO `home_sections` (`id`, `name`) VALUES
(1, 'video'),
(2, 'home_gallery'),
(3, 'instagram'),
(4, 'blog'),
(5, 'product_gallery');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders`
--

CREATE TABLE `orders` (
  `id` varchar(36) NOT NULL,
  `tra_id` text DEFAULT NULL,
  `users_id` varchar(36) DEFAULT NULL,
  `shipping_addresses_id` varchar(36) DEFAULT NULL,
  `billing_addresses_id` varchar(36) DEFAULT NULL,
  `is_same_address` tinyint(4) DEFAULT NULL,
  `total` int(11) DEFAULT NULL,
  `order_status_id` int(11) DEFAULT NULL,
  `order_types_id` int(11) DEFAULT NULL,
  `payment_methods_id` int(11) DEFAULT NULL,
  `date` timestamp NULL DEFAULT NULL,
  `billing_name` varchar(255) DEFAULT NULL,
  `billing_email` varchar(255) DEFAULT NULL,
  `billing_phone` varchar(45) DEFAULT NULL,
  `billing_id` varchar(45) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `orders`
--

INSERT INTO `orders` (`id`, `tra_id`, `users_id`, `shipping_addresses_id`, `billing_addresses_id`, `is_same_address`, `total`, `order_status_id`, `order_types_id`, `payment_methods_id`, `date`, `billing_name`, `billing_email`, `billing_phone`, `billing_id`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
('05590144-cb8d-41b4-a385-d4b6f93894ff', '1691264503772-554fta47yu', '10', NULL, '6183530e-3fc9-46c1-b089-8724e54ec5bd', 0, 48222, 4, 2, 1, '2023-08-05 19:41:43', 'Jano Pereira Kent', 'janoo.pereira@gmail.com', '+5401158817312', '212212121', '2023-08-05 19:41:43', '2023-08-05 19:41:43', NULL),
('3fba444f-b2e4-4253-a3f0-1936c151f1ae', '1691264921121-mru84pn26n', '10', NULL, '66f381f2-de82-41ea-a38f-7cfb102fe3df', 0, 88222, 4, 2, 1, '2023-08-05 19:48:41', 'Jano Pereira Kent', 'janoo.pereira@gmail.com', '+5401158817312', '12212121', '2023-08-05 19:48:41', '2023-08-05 19:48:41', NULL),
('4af4b51c-c9ab-4b3e-a849-9d47e498bf4b', '1691264966112-rm99oa9591', '10', NULL, '15097bce-f867-466b-8011-a2a49905bcc0', 0, 88222, 2, 2, 1, '2023-08-05 19:49:26', 'Jano Pereira Kent', 'janoo.pereira@gmail.com', '+5401158817312', '12212121', '2023-08-05 19:49:26', '2023-08-05 19:59:18', NULL),
('5b236ed8-75d4-42de-91c4-a11405eeb141', '1691266547618-iij4n8sl7h', '10', NULL, 'f7e49784-218f-4c8a-af5c-4fbe92c3bb90', 1, 26000, 4, 1, 1, '2023-08-05 20:15:47', 'Jano Pereira Kent', 'janoo.pereira@gmail.com', '+5401158817312', '21212112', '2023-08-05 20:15:47', '2023-08-05 20:15:47', NULL),
('8195143a-45f0-4554-b077-a20c4a059cec', '1691264526020-9yrisv0b2i', '10', NULL, 'bc631a0c-8684-4edb-92cd-2010b20f3808', 0, 88222, 4, 2, 1, '2023-08-05 19:42:06', 'Jano Pereira Kent', 'janoo.pereira@gmail.com', '+5401158817312', '12212121', '2023-08-05 19:42:06', '2023-08-05 19:42:06', NULL),
('9e3cb10d-c760-4722-8d29-3e97148cb8f5', '1691264760323-ocxvhyskey', '10', NULL, '5345aa85-682b-4c2c-b908-84107d3914bf', 0, 88222, 4, 2, 1, '2023-08-05 19:46:00', 'Jano Pereira Kent', 'janoo.pereira@gmail.com', '+5401158817312', '12212121', '2023-08-05 19:46:00', '2023-08-05 19:46:00', NULL),
('b2353be1-e708-4e08-a57e-24337533b638', '1691264657492-13lgopc8wx', '10', NULL, 'eef923f7-ada6-44c0-a202-77496c2ba424', 0, 88222, 4, 2, 1, '2023-08-05 19:44:17', 'Jano Pereira Kent', 'janoo.pereira@gmail.com', '+5401158817312', '12212121', '2023-08-05 19:44:17', '2023-08-05 19:44:17', NULL),
('e5cdbd31-e816-4210-9f69-46659c484e64', '1691264370124-44ina3xulr', '10', NULL, '6d653043-8048-473b-8149-1de8de673daf', 0, 88222, 4, 2, 1, '2023-08-05 19:39:30', 'Jano Pereira Kent', 'janoo.pereira@gmail.com', '+5401158817312', '21211212', '2023-08-05 19:39:30', '2023-08-05 19:39:30', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `order_items`
--

CREATE TABLE `order_items` (
  `id` varchar(36) NOT NULL,
  `orders_id` varchar(36) DEFAULT NULL,
  `products_id` varchar(36) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `deletedAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `order_items`
--

INSERT INTO `order_items` (`id`, `orders_id`, `products_id`, `name`, `price`, `quantity`, `createdAt`, `deletedAt`, `updatedAt`) VALUES
('0cd635ab-d3ed-45d5-ad85-f31509ef68b8', '8195143a-45f0-4554-b077-a20c4a059cec', 'ac4abb69-97ed-4d09-87c4-c3da48ce15f8', 'Colageno Fine Power', 20000, 3, '2023-08-05', NULL, '2023-08-05'),
('15ac2fb5-c239-4386-90da-3d9b1db6702f', '5b236ed8-75d4-42de-91c4-a11405eeb141', '83838646-6969-449d-8132-2ad967701c64', 'Colageno Fine Peak ', 24000, 1, '2023-08-05', NULL, '2023-08-05'),
('191d8b69-6158-40b3-86e6-f3528592f8d2', 'e5cdbd31-e816-4210-9f69-46659c484e64', 'ac4abb69-97ed-4d09-87c4-c3da48ce15f8', 'Colageno Fine Power', 20000, 3, '2023-08-05', NULL, '2023-08-05'),
('38466cd9-de2c-470f-89cd-255b26c4f43d', '4af4b51c-c9ab-4b3e-a849-9d47e498bf4b', '79cbdf23-309b-4f2f-9834-9d6fd5de5251', 'Silk Glow Sleepwear  ', 6000, 1, '2023-08-05', NULL, '2023-08-05'),
('531d5c7c-b8a9-42d6-bc17-3413c0c917cc', '3fba444f-b2e4-4253-a3f0-1936c151f1ae', '79cbdf23-309b-4f2f-9834-9d6fd5de5251', 'Silk Glow Sleepwear  ', 6000, 1, '2023-08-05', NULL, '2023-08-05'),
('67b3da30-441f-4357-a83e-dfd2dddab419', 'e5cdbd31-e816-4210-9f69-46659c484e64', 'b2e86191-8b70-431b-9808-ba754697ac2b', 'Objeto para probar mainIM', 22222, 1, '2023-08-05', NULL, '2023-08-05'),
('7596999d-d2b3-4bd5-80e3-e05c3b09811f', '9e3cb10d-c760-4722-8d29-3e97148cb8f5', 'b2e86191-8b70-431b-9808-ba754697ac2b', 'Objeto para probar mainIM', 22222, 1, '2023-08-05', NULL, '2023-08-05'),
('8221a92a-da9c-4000-82aa-0aa588b21f85', '9e3cb10d-c760-4722-8d29-3e97148cb8f5', '79cbdf23-309b-4f2f-9834-9d6fd5de5251', 'Silk Glow Sleepwear  ', 6000, 1, '2023-08-05', NULL, '2023-08-05'),
('8c9cebe3-34fc-4aee-8b72-61b391b0d73e', '05590144-cb8d-41b4-a385-d4b6f93894ff', 'ac4abb69-97ed-4d09-87c4-c3da48ce15f8', 'Colageno Fine Power', 20000, 1, '2023-08-05', NULL, '2023-08-05'),
('8d8870bb-da43-4bc9-8922-0039c41a60fe', 'e5cdbd31-e816-4210-9f69-46659c484e64', '79cbdf23-309b-4f2f-9834-9d6fd5de5251', 'Silk Glow Sleepwear  ', 6000, 1, '2023-08-05', NULL, '2023-08-05'),
('90447dc4-69cf-4bd7-8fbc-9958d64cc4cb', '05590144-cb8d-41b4-a385-d4b6f93894ff', '79cbdf23-309b-4f2f-9834-9d6fd5de5251', 'Silk Glow Sleepwear  ', 6000, 1, '2023-08-05', NULL, '2023-08-05'),
('96ee464e-a9a1-43c7-afe4-30c3e68671ad', '4af4b51c-c9ab-4b3e-a849-9d47e498bf4b', 'ac4abb69-97ed-4d09-87c4-c3da48ce15f8', 'Colageno Fine Power', 20000, 3, '2023-08-05', NULL, '2023-08-05'),
('97d20d04-46b4-462e-b074-545560c42cd4', '4af4b51c-c9ab-4b3e-a849-9d47e498bf4b', 'b2e86191-8b70-431b-9808-ba754697ac2b', 'Objeto para probar mainIM', 22222, 1, '2023-08-05', NULL, '2023-08-05'),
('a9b09a6b-edad-450a-a9a7-325257fba5ea', '05590144-cb8d-41b4-a385-d4b6f93894ff', 'b2e86191-8b70-431b-9808-ba754697ac2b', 'Objeto para probar mainIM', 22222, 1, '2023-08-05', NULL, '2023-08-05'),
('bbdbced2-67a4-4767-92de-8bc3c2b8c02d', '5b236ed8-75d4-42de-91c4-a11405eeb141', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 1, '2023-08-05', NULL, '2023-08-05'),
('c4f1b764-d55d-4c61-af8a-653ae5486e25', '3fba444f-b2e4-4253-a3f0-1936c151f1ae', 'ac4abb69-97ed-4d09-87c4-c3da48ce15f8', 'Colageno Fine Power', 20000, 3, '2023-08-05', NULL, '2023-08-05'),
('d70c0b02-00d9-4b3f-bf2b-95ab0203580e', 'b2353be1-e708-4e08-a57e-24337533b638', 'b2e86191-8b70-431b-9808-ba754697ac2b', 'Objeto para probar mainIM', 22222, 1, '2023-08-05', NULL, '2023-08-05'),
('dd7e566a-37ef-4b68-8276-00d9d99e82b3', 'b2353be1-e708-4e08-a57e-24337533b638', '79cbdf23-309b-4f2f-9834-9d6fd5de5251', 'Silk Glow Sleepwear  ', 6000, 1, '2023-08-05', NULL, '2023-08-05'),
('de17c967-789e-4f32-9bbd-c5a2675a1952', '8195143a-45f0-4554-b077-a20c4a059cec', '79cbdf23-309b-4f2f-9834-9d6fd5de5251', 'Silk Glow Sleepwear  ', 6000, 1, '2023-08-05', NULL, '2023-08-05'),
('e1c1c802-bd28-4fcd-8dbf-661eb5e8535e', '3fba444f-b2e4-4253-a3f0-1936c151f1ae', 'b2e86191-8b70-431b-9808-ba754697ac2b', 'Objeto para probar mainIM', 22222, 1, '2023-08-05', NULL, '2023-08-05'),
('ef9f39a6-8a2e-4a96-b15b-1986a6174908', '8195143a-45f0-4554-b077-a20c4a059cec', 'b2e86191-8b70-431b-9808-ba754697ac2b', 'Objeto para probar mainIM', 22222, 1, '2023-08-05', NULL, '2023-08-05'),
('fc6b2b73-40d8-42d2-a567-2be9f31391be', '9e3cb10d-c760-4722-8d29-3e97148cb8f5', 'ac4abb69-97ed-4d09-87c4-c3da48ce15f8', 'Colageno Fine Power', 20000, 3, '2023-08-05', NULL, '2023-08-05'),
('fee62e32-3130-4e34-8580-9970bbed179b', 'b2353be1-e708-4e08-a57e-24337533b638', 'ac4abb69-97ed-4d09-87c4-c3da48ce15f8', 'Colageno Fine Power', 20000, 3, '2023-08-05', NULL, '2023-08-05');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `order_status`
--

CREATE TABLE `order_status` (
  `id` int(11) NOT NULL,
  `status` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `order_status`
--

INSERT INTO `order_status` (`id`, `status`) VALUES
(1, 'Completa'),
(2, 'Pendiente de envio'),
(3, 'Pendiente de pago'),
(4, 'Pendiente de confirmacion'),
(5, 'Anulada');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `order_types`
--

CREATE TABLE `order_types` (
  `id` int(11) NOT NULL,
  `type` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `order_types`
--

INSERT INTO `order_types` (`id`, `type`) VALUES
(1, 'Venta online - Entrega a domicilio'),
(2, 'Venta online - Retiro por el local'),
(3, 'Venta presencial');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `payment_methods`
--

CREATE TABLE `payment_methods` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `payment_methods`
--

INSERT INTO `payment_methods` (`id`, `name`) VALUES
(1, 'Transferencia'),
(2, 'Tarjeta de crédito'),
(3, 'Tarjeta de débito'),
(4, 'Efectivo'),
(5, 'Dólares');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `ingredients` text DEFAULT NULL,
  `size` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `description`, `category_id`, `createdAt`, `deletedAt`, `updatedAt`, `stock`, `ingredients`, `size`) VALUES
('0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, '<p>Son el complemento ideal de nuestra “Espuma de Limpieza 3 en 1” para una limpieza facial excepcional. Diseñados\npara ayudar a eliminar eficazmente el maquillaje e impurezas, dejando tu piel limpia y fresca.\nCada Pad presenta dos texturas diferentes: una suave y delicada para una limpieza gentil, ideal para zonas sensibles, y otra exfoliante para una limpieza más profunda y efectiva en áreas que necesitan mayor atención. Estas dos opciones te permiten personalizar tu rutina de limpieza según las necesidades de tu piel.</p>\n<p>??Son fáciles de limpiar: simplemente enjuágalos con agua y jabón luego de cada uso y estarán listos para la próxima limpieza facial.</p>', 1, '2023-07-31 16:33:02', NULL, '2023-07-31 16:33:02', NULL, NULL, NULL),
('1c58ddbd-a791-46eb-b98a-611a00af2645', 'Prueba', 5000, 'Descripcion\r\n\r\nOtra mas\r\n\r\nY una mas', 1, '2023-08-01 18:15:28', '2023-08-01 18:21:46', '2023-08-01 18:21:35', NULL, '', ''),
('46bf971d-62f1-4b96-b727-d2cafa725f42', 'Prueba para borrar', 22222, 'asdsdaasads', 1, '2023-07-31 18:05:32', NULL, '2023-08-03 03:09:59', NULL, 'Un ingrediente', '1 blister de 30 pastillas'),
('4d05e5c1-1827-4bfe-8b74-f30bbabca8b0', 'Jano', 2222, 'asddasdsaads', 1, '2023-08-02 16:54:12', NULL, '2023-08-02 16:54:53', NULL, 'Muchos', 'Grande'),
('5a1d4ed8-135f-4177-b7ce-0a239b7f1afc', 'Silk Glow Sleepwear  ', 6000, '<p>Funda de Almohada de Seda.\nUn secreto de belleza olvidado hacía mucho tiempo. \nEsta funda de almohada de seda hipoalergénica es una experiencia de lujo para tu piel y cabello. \nPermite que la piel se beneficie al máximo de las propiedades de los productos de ‘skincare’ y ayuda a prevenir la aparición de arrugas, líneas finas y marcas de presión, lo que resulta en una piel más tersa y radiante. Evita el frizz, reduce el daño causado por el roce y mejora la suavidad y brillo natural de tu melena mientras duermes.\nIdeal para personas con piel sensible o alergias.\n¡Mejora tu rutina de sueño y belleza con este lujo accesible y saludable para tu piel y cabello! ?\nSe recomienda lavar de adentro hacia afuera con agua fría y utilizando jabón líquido neutro suave, para obtener mejores resultados y garantizar su durabilidad.</p>', 1, '2023-07-31 16:32:00', '2023-07-31 16:34:22', '2023-07-31 16:32:00', NULL, NULL, NULL),
('79cbdf23-309b-4f2f-9834-9d6fd5de5251', 'Silk Glow Sleepwear  ', 6000, '<p>Funda de Almohada de Seda.\nUn secreto de belleza olvidado hacía mucho tiempo. \nEsta funda de almohada de seda hipoalergénica es una experiencia de lujo para tu piel y cabello. \nPermite que la piel se beneficie al máximo de las propiedades de los productos de ‘skincare’ y ayuda a prevenir la aparición de arrugas, líneas finas y marcas de presión, lo que resulta en una piel más tersa y radiante. Evita el frizz, reduce el daño causado por el roce y mejora la suavidad y brillo natural de tu melena mientras duermes.\nIdeal para personas con piel sensible o alergias.\n¡Mejora tu rutina de sueño y belleza con este lujo accesible y saludable para tu piel y cabello! ?\nSe recomienda lavar de adentro hacia afuera con agua fría y utilizando jabón líquido neutro suave, para obtener mejores resultados y garantizar su durabilidad.</p>', 1, '2023-07-31 16:31:57', NULL, '2023-07-31 16:31:57', NULL, NULL, NULL),
('7e4b718f-1f11-452f-9aa9-54d9a059d881', 'Bálsamo Lip Glow', 10000, 'HIDRATACIÓN + VOLUMEN 3D ? Este aterciopelado bálsamo con esencia de menta calma, restaura y acondiciona los labios con un toque de máxima suavidad y efecto repulpante. La concentración de activos, su textura y su suave efecto mentolado contribuye a combatir la sequedad al instante, nutriendo, restaurando y fortaleciendo la barrera de hidratación natural de tus labios. Se convertirá en un paso fundamental de tu rutina diaria. ✨.', 1, '2023-07-12 13:35:15', NULL, '2023-08-03 17:49:49', NULL, '', ''),
('83838646-6969-449d-8132-2ad967701c64', 'Colageno Fine Peak ', 24000, '<p>El empujón que necesitabas para llegar a tu cima. Poderoso blend termogénico que te ayuda a bajar de peso. Reduce el apetito, aumenta el gasto calórico y energético y estimula el drenaje linfático.\nEs antioxidante y antiinflamatorio. \nAdemás, por su alta concentración de péptidos bioactivos de colágeno hidrolizado y aminoácidos, retrasa el envejecimiento y mejora el aspecto de la piel, las uñas y el cabello.</p>', 1, '2023-07-31 16:39:56', NULL, '2023-07-31 16:39:56', NULL, NULL, NULL),
('91ca97a0-31e9-4c23-ac71-d18cb19eeb33', 'Colageno Fine Smooth', 23000, '<p>-Combate la celulitis\n-Posee propiedades antiinflamatorias\n-Favorece al drenaje linfático y eliminación de toxinas del organismo\n-Reduce los depositos de grasa del organismo\n-Mejora la salid vascular oxigenando los tejidos\n-Mejora la tenacidad y elasticidad de la piel \n-Previene la pérdida de colágeno\n-Tiene capacidad antioxidante</p>', 1, '2023-07-31 16:41:19', NULL, '2023-07-31 16:41:19', NULL, NULL, NULL),
('9965b799-1f1b-43d1-8537-c9713373188e', 'Crema Anti Age 360', 13000, '\r\nCreamos una crema enfocada en combatir el envejecimiento cutáneo de forma global. Su textura es sedosa y de rápida absorción.  Favorece la renovación celular, fortalece la barrera cutánea y devuelve la elasticidad y flexibilidad a tu piel. ✨Ayuda a combatir los signos del envejecimiento, gracias a su novedosa combinación de activos: Retinol, Matrixyl, Carnosina y Gluconolaciona que actúan en sinergia estimulando la producción de colágeno, elastina y ácido hialurónico. Además, refuerzan la barrera cutánea protegiéndola de los agentes externos y devuelven luminosidad, elasticidad y flexibilidad a la piel✨. Libre de Fragancia. Libre de Parabenos. \r\n??MODO DE USO: Aplicar de día y/o noche sobre la superficie de la piel de rostro, cuello y escote una vez limpia y seca; realizando suaves movimientos ascendentes hasta su absorción.\r\n', 1, '2023-07-21 16:42:49', NULL, '2023-07-31 16:24:11', NULL, NULL, NULL),
('a541d777-7dce-426b-aaa8-421978c2486e', 'Producto prueba Formato', 3333, 'Este es un formato para la prueba del formato esperado. Este producto viene bien. Lorem ipsum lorem ipsum.', 1, '2023-07-26 17:58:28', '2023-07-31 16:48:55', '2023-07-26 18:25:09', NULL, NULL, NULL),
('a9c2dc18-3086-4d3c-94b6-18f5f5db2e6b', 'Espuma de limpieza 3 en 1', 9000, 'Limpia, desmaquilla e hidrata ? La limpieza facial es un paso indispensable y necesario para mantener una piel saludable luminosa y protegida de los contaminantes que generan el envejecimiento prematuro. ??Limpiar es el primer paso fundamental de tu rutina de skincare. Su fórmula en espuma micelar retira rápida, suave y fácilmente el maquillaje y las impurezas. Dejando una piel visiblemente más fresca, limpia e hidratada. Está específicamente pensado para pieles de normales a mixtas. ✨Libre de fragancia, colorantes y parabenos. ✨ \r\n??MODO DE USO: Aplicar por la mañana y por la noche con suaves movimientos circulares en rostro, cuello y escote. Enjuagar con agua y con ayuda de nuestro exclusivo Pad de Limpieza para una mejor remoción. \r\n', 1, '2023-07-12 16:12:02', NULL, '2023-07-31 16:25:53', NULL, NULL, NULL),
('ac4abb69-97ed-4d09-87c4-c3da48ce15f8', 'Colageno Fine Power', 20000, '<ul>\n<li>Contiene los antioxidantes más       poderosos</li>\n<li>Posee un alto contenido en proteínas.</li>\n<li>Mantiene las articulaciones saludables.</li>\n<li>Aumenta la energía y la recuperación post ejercicio</li>\n<li>Reduce la ansiedad y el estrés.</li>\n<li>Promueve el fortalecimiento de tendones y colágeno articular </li>\n<li>Aumenta la asimilación del calcio y el hierro.</li>\n<li>Disminuye y evita la aparición de nuevas arrugas. Ayuda a prevenir lesiones.</li>\n<li>Previene la pérdida de cabello</li>\n<li>Disminuye la adherencia de las lipoproteínas de colesterol.</li>\n</ul>', 1, '2023-07-31 16:38:35', NULL, '2023-07-31 16:38:35', NULL, NULL, NULL),
('b2e86191-8b70-431b-9808-ba754697ac2b', 'Objeto para probar mainIM', 22222, 'adscsadcasdcas', 1, '2023-08-02 16:21:24', NULL, '2023-08-02 17:22:45', NULL, 'adsdsadas', '10g sanax'),
('c1f196b4-8861-4032-ba39-523530df0299', 'Latisse', 15000, 'LATISSE es un tratamiento del laboratorio francés Allergan, aprobado por la FDA y sin parabenos que permite obtener pestañas más largas, gruesas y oscuras. Se aplica por la noche antes de ir a dormir. ??Los resultados comienzan a verse a las 4 semanas de aplicación, viendo resultados completos a la semana 12 del tratamiento. Luego se aplica 1 vez por semana para mantenimiento. Está indicado en cualquier persona que desee mejorar el aspecto de sus pestañas.', 1, '2023-07-21 16:44:41', NULL, '2023-07-31 16:36:00', NULL, NULL, NULL),
('db005c8d-ccd0-4e0e-9d36-aaed244e8559', 'Crema despigmentante', 15000, 'Posee una fórmula innovadora con un poderoso complejo anti-manchas. Su acción despigmentante de rápida absorción ayuda a unificar el color de la piel disminuyendo notablemente manchas e hiperpigmentaciones en rostro, cuello y escote, ayudando también a prevenirlas. Logra un aspecto más uniforme de la piel ✨Su formulación sinérgica aporta luminosidad, brillo y tersura a la piel✨. Ingredientes: Tranexámico 3% + Niacinamida 2% + Vit C 4% + Arbutina 2%. Exfolia y normaliza la renovación celular. Reduce los efectos negativos del estrés y la contaminación. ? Nuestra filosofía de pureza: Sin parabenos. Sin sulfatos. Sin fragancia. Piel simplemente feliz. :) Hipoalergénico. Free Mineral Oil. \r\n??MODO DE USO: Aplicar únicamente por la noche sobre la superficie de la piel a tratar, una vez limpia y seca, en rostro, cuello y escote. Se recomienda complementar con nuestro Serum de Vitamina C. Utilizar protección solar si se aplica durante el día.\r\n', 1, '2023-07-04 11:31:11', NULL, '2023-07-31 16:27:39', NULL, NULL, NULL),
('e3da8d17-89bb-4f42-8ae7-77791d9f4533', 'Contorno de Ojos', 12000, 'Nuestra fórmula ofrece tratamiento y prevención a la delicada piel del contorno de ojos otorgando luminosidad y revitalización de la mirada ✨?️. Posee una concentración de activos que renuevan el aspecto de la piel alisándola y favoreciendo la microcirculación; desacelera la aparición de líneas de expresión y prolonga la duración de la toxina botulínica por su gran concentración de Argireline. ? Nuestra presentación con dosificador ofrece excelente comodidad en su uso y garantiza la efectividad del tratamiento. Para todo tipo de piel. Sin fragancias ni parabenos. \r\n?? MODO DE USO: Extrae una pequeña cantidad de crema utilizando el aplicador a presión. Aplica la crema en pequeños puntos alrededor del contorno de los ojos. Con movimientos suaves y circulares difumina la crema utilizando el aplicador. Esto ayudará a mejorar la absorción y promoverá una apariencia más rejuvenecida.\r\n', 1, '2023-07-12 16:10:48', NULL, '2023-07-31 16:26:41', NULL, NULL, NULL),
('f05669b2-7376-4d5c-9e4a-6f2bd654cd89', 'Serum de Vitamina C', 13000, 'Con su textura perfecta este poderoso concentrado de Vitamina C tiene una triple acción: - Antioxidante. - Revitalizante. - Anti-Age. Además actúa como un potente protector de la polución dejando la piel visiblemente calmada y renovada. Aporta una luminosidad inigualable desde su primera aplicación ✨ Apta para todo tipo de piel.  \r\nMODO DE USO: Aplicar 3 a 4 gotas por día sobre la superficie de la piel, una vez limpia y seca. Puede aplicarse en rostro, cuello, escote y dorso de manos, masajeando suavemente hasta su absorción. Recomendamos dejar actuar unos instantes antes de aplicar su crema de tratamiento habitual y utilizar protección solar de ser aplicado durante el día.\r\n', 1, '2023-07-21 16:35:52', NULL, '2023-07-31 16:28:54', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products_files`
--

CREATE TABLE `products_files` (
  `id` int(11) NOT NULL,
  `filename` text DEFAULT NULL,
  `products_id` varchar(36) DEFAULT NULL,
  `file_types_id` int(11) DEFAULT NULL,
  `main_image` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `products_files`
--

INSERT INTO `products_files` (`id`, `filename`, `products_id`, `file_types_id`, `main_image`) VALUES
(120, 'k99z0dhya8.webp', '9965b799-1f1b-43d1-8537-c9713373188e', 1, NULL),
(121, 'auidrfbvvo.webp', 'a9c2dc18-3086-4d3c-94b6-18f5f5db2e6b', 1, NULL),
(122, 'sy6qxlhc0j.webp', 'e3da8d17-89bb-4f42-8ae7-77791d9f4533', 1, NULL),
(123, 's1qb1vngse.webp', 'db005c8d-ccd0-4e0e-9d36-aaed244e8559', 1, NULL),
(124, 'fnax6jdtlr.webp', 'f05669b2-7376-4d5c-9e4a-6f2bd654cd89', 1, NULL),
(125, 'b8da891hrl.webp', '79cbdf23-309b-4f2f-9834-9d6fd5de5251', 1, NULL),
(126, 'slddsu2f39.webp', '5a1d4ed8-135f-4177-b7ce-0a239b7f1afc', 1, NULL),
(127, 'kag8q89m0h.webp', '0d0cd130-d652-41e1-b7e6-da9553322823', 1, NULL),
(128, 'tg5aklncdz.webp', 'c1f196b4-8861-4032-ba39-523530df0299', 1, NULL),
(129, 'lf2fhx8d.webp', 'ac4abb69-97ed-4d09-87c4-c3da48ce15f8', 1, NULL),
(130, 'kt26rcc2n4.webp', '83838646-6969-449d-8132-2ad967701c64', 1, NULL),
(131, 'jcwqnnzy10.webp', '91ca97a0-31e9-4c23-ac71-d18cb19eeb33', 1, NULL),
(152, 'xfc88j0n2r.webp', 'b2e86191-8b70-431b-9808-ba754697ac2b', 1, 0),
(153, 'cthltv9y5j.webp', 'b2e86191-8b70-431b-9808-ba754697ac2b', 1, 0),
(154, 'vwegx15jrc.webp', 'b2e86191-8b70-431b-9808-ba754697ac2b', 1, 0),
(155, 'z4ie39p9xz.webp', 'b2e86191-8b70-431b-9808-ba754697ac2b', 1, 1),
(160, 'ecxbvfyvls.webp', '46bf971d-62f1-4b96-b727-d2cafa725f42', 1, 0),
(161, 'qklta3qc75.webp', '46bf971d-62f1-4b96-b727-d2cafa725f42', 1, 1),
(162, 'higj0mwtxx.MP4', '46bf971d-62f1-4b96-b727-d2cafa725f42', 2, 0),
(166, '29aqeco5g4.MP4', '46bf971d-62f1-4b96-b727-d2cafa725f42', 2, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `shipping_addresses`
--

CREATE TABLE `shipping_addresses` (
  `id` varchar(36) NOT NULL,
  `street` varchar(255) DEFAULT NULL,
  `apartment` varchar(45) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `provinces_id` int(11) DEFAULT NULL,
  `zip_code` varchar(10) DEFAULT NULL,
  `users_id` varchar(36) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `shipping_addresses`
--

INSERT INTO `shipping_addresses` (`id`, `street`, `apartment`, `city`, `provinces_id`, `zip_code`, `users_id`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
('2', 'Juana Azurduy', NULL, 'Nunez', 1, '1430', '8', NULL, '2023-07-04 14:16:24', NULL),
('3', 'Libertador 2232', '3B', 'Nuñez', 1, '1430', NULL, '2023-07-04 14:35:12', '2023-07-15 23:03:08', NULL),
('30cb8ec9-a017-4399-b920-ed141012af2c', 'Livertador 1300', NULL, 'CABA', 1, '1212', '2e703d70-fbaf-4674-9c76-238d5ec4f44e', '2023-07-13 00:46:10', '2023-07-13 01:06:06', NULL),
('4', 'Corrientes', NULL, 'Nuñez', 1, '1429', '11', '2023-07-04 20:56:40', '2023-07-04 20:56:40', NULL),
('5', 'Santa fe 329', '3f', 'caba', 1, '1111', NULL, '2023-07-12 20:31:05', '2023-07-12 20:31:05', NULL),
('5e26ad3a-5a9a-4f06-960d-036f9597ed41', 'Juncal 2222', '3a', 'Recoleta', 1, '1211', NULL, '2023-07-18 00:10:30', '2023-07-18 00:10:30', NULL),
('6', 'Santa Fe 312', '0', 'CABA', 1, '1111', NULL, '2023-07-12 20:51:28', '2023-07-12 20:51:28', NULL),
('6c6412fa-f589-46f9-a153-3f637b06b287', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', NULL, '2023-07-17 16:57:11', '2023-07-17 16:57:11', NULL),
('73d98bfc-77c4-4da7-9796-f147dd01ab84', 'Juncal 2222', '3a', 'Recoleta', 1, '1211', NULL, '2023-07-18 00:11:58', '2023-07-18 00:11:58', NULL),
('76205f7b-1754-4108-84f2-649147d848d4', NULL, NULL, NULL, 1, NULL, 'f636404c-60bc-41e1-bd7a-14d629ac7f07', '2023-07-17 23:24:15', '2023-07-17 23:24:17', NULL),
('a83e27c8-4833-42a8-b90d-8f320c1e56eb', 'Juncal 2222', '3a', 'Recoleta', 1, '1211', NULL, '2023-07-18 00:08:15', '2023-07-18 00:08:15', NULL),
('e5edf259-8e15-4b62-8a46-6e9df537024f', NULL, NULL, NULL, 1, NULL, '214ee117-1788-4155-8895-9f61d9e2dcf6', '2023-07-31 21:52:04', '2023-07-31 21:52:04', NULL),
('f895b5fe-cade-480e-9f34-0c947fe216ac', 'Callao 6969', '9b', 'CABA', 1, '1469', '10', '2023-07-15 23:03:09', '2023-07-15 23:03:09', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `specialties`
--

CREATE TABLE `specialties` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `src` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `specialties`
--

INSERT INTO `specialties` (`id`, `name`, `src`) VALUES
(1, 'Estética facial', 'servicios1.jpg'),
(2, 'Medicina Regenerativa', 'servicios2.jpg'),
(3, 'Estética corporal', 'servicios3.jpg'),
(4, 'ODONTOLOGIA', 'servicios4.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `specialties_services`
--

CREATE TABLE `specialties_services` (
  `id` int(11) NOT NULL,
  `specialties_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `specialties_services`
--

INSERT INTO `specialties_services` (`id`, `specialties_id`, `name`, `description`) VALUES
(1, 1, 'Armonización facial', 'La percepción de un rostro bello, armónico y natural depende fundamentalmente de las proporciones de una parte de nuestro rostro en relación con otra.'),
(2, 1, 'BOTOX®️', 'Uno de los tratamientos con más demanda a nivel mundial, del que podemos beneficiarnos en sus múltiples usos.'),
(3, 1, 'COSMETOLOGIA', 'La piel que siempre soñaste está mucho más cerca de lo que te imaginas.'),
(4, 1, 'TRATAMIENTO DE PAPADA', 'Una de las zonas que todos queremos mejorar. Siempre con la cabeza en alto y con la ayuda de los tratamientos adecuados en cada caso obtenemos esos resultados que tanto buscamos.'),
(5, 1, 'BIOESTIMULADORES', 'Llegaron para quedarse! Representan los últimos avances en estética facial que todos queremos. Sin aportar volumen estimulan potentemente a nuestras células para que produzcan grandes cantidades de colageno.'),
(6, 4, 'ODONTOLOGIA GENERAL', 'Todos deberíamos saber el bien que una simple sonrisa puede hacer.'),
(7, 4, 'TRATAMIENTO DE BRUXISMO', 'El Bruxismo es el apretamiento o rechinamiento de los dientes que se realiza tanto de forma consciente como inconsciente; y afecta a una gran parte de la población.'),
(8, 4, 'DISEÑO DE SONRISA', 'Para comenzar realizamos un estudio completo del rostro del paciente tomando medidas dentarias y faciales, escaneo digital de la boca y fotografías. Mediante esta información podremos definir el largo, ancho y anatomía ideal de cada uno de sus dientes en perfecta relación a al rostro y a sus labios. Toda esta información es enviada al laboratorio quien confeccionará una impresión digital del modelo de la boca con la forma exacta del diseño realizado, que será probado en el paciente mediante un material provisorio para visualizar el agrado del diseño. Y en base al mismo proceder a confeccionar las carillas.  ');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `temporal_carts`
--

CREATE TABLE `temporal_carts` (
  `id` int(11) NOT NULL,
  `users_id` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `temporal_carts`
--

INSERT INTO `temporal_carts` (`id`, `users_id`) VALUES
(34, '10'),
(35, '12');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `temporal_items`
--

CREATE TABLE `temporal_items` (
  `id` int(11) NOT NULL,
  `temporal_cart_id` int(11) DEFAULT NULL,
  `products_id` varchar(36) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `added_date` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `temporal_items`
--

INSERT INTO `temporal_items` (`id`, `temporal_cart_id`, `products_id`, `quantity`, `added_date`) VALUES
(133, 34, '79cbdf23-309b-4f2f-9834-9d6fd5de5251', 1, NULL),
(134, 34, '91ca97a0-31e9-4c23-ac71-d18cb19eeb33', 1, NULL),
(136, 35, '83838646-6969-449d-8132-2ad967701c64', 1, NULL),
(137, 35, 'ac4abb69-97ed-4d09-87c4-c3da48ce15f8', 1, NULL),
(138, 35, '91ca97a0-31e9-4c23-ac71-d18cb19eeb33', 1, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `treatments`
--

CREATE TABLE `treatments` (
  `id` int(11) NOT NULL,
  `specialties_id` int(11) DEFAULT NULL,
  `specialties_services_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `cash_price` int(11) DEFAULT NULL,
  `application_time` text DEFAULT NULL,
  `duration` text DEFAULT NULL,
  `filename` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `treatments`
--

INSERT INTO `treatments` (`id`, `specialties_id`, `specialties_services_id`, `name`, `description`, `price`, `cash_price`, `application_time`, `duration`, `filename`) VALUES
(1, 1, 1, 'B-UP', 'Es una novedosa técnica realizada con acido hialuronico que consiste en trabajar sobre áreas específicas de la región temporal a nivel del cuero cabelludo, con el objetivo de lograr un reposicionamiento de los tejidos elevándolos  en contra de los vectores de envejecimiento logrando una notable mejoría del rostro, sin cambiar las facciones del mismo.', 100000, 95000, '30 min', '12-18 meses', 'treatment-ev481tobht.webp'),
(2, 1, 1, 'OJERAS', 'El relleno de ojeras se realiza con un ácido hialurónico especial para esa zona, corrige el surco palpebromalar hundido mejorando el aspecto de un rostro aparentemente cansado. Se realiza en una sola sesión y tiene una duración entre 12 a 18 meses. El procedimiento es  prácticamente indoloro y el resultado es inmediato.', 100000, 95000, '30 min', '12-18 meses', NULL),
(3, 1, 1, 'POMULOS', 'Mediante la aplicación de ácido hialurónico podemos crear una estructura de mejillas equilibrada logrando elevación, contorno y definición. Los pómulos en una mujer están asociados con el atractivo facial, un contorno suave y curvo transmite salud y juventud. La estructura fuerte y definida de las mejillas en un hombre se asocia con la masculinidad y el atractivo. La técnica que utilizamos al trabajar sobre pómulos también tiene como objetivo generar puntos de tensión que ayudan a reposicionar tejidos y así reducir los surcos nasogenianos y a suavizar indirectamente ojeras. logrando un rostro más definido, estilizado y atractivo.', 100000, 95000, '30 min', '18-24 meses', NULL),
(4, 1, 1, 'TEMPORALES', 'La pérdida de volumen en la frente y en las sienes durante el proceso de envejecimiento conduce al descenso de las cejas y tiene un impacto negativo en áreas más distantes como las ojeras. Mediante los rellenos de AH devolvemos el volumen perdido en las sienes y la frente logrando un contorno más juvenil y proporcionando apoyo para levantar las cejas naturalmente. Es ideal combinar este tratamiento con BOTOX®️ para reducir sustancialmente la aparición de arrugas y terminar de dar una elevación natural a las cejas.', 100000, 95000, '30 min', '18-24 meses', NULL),
(5, 1, 1, 'RINOMODELACION', 'Utilizamos un acido hialuronico de altísima calidad con una densidad específica para este área, permitiéndonos rectificar y definir el dorso de la nariz para una apariencia más suave, así como para levantar la punta nasal, con resultados potencialmente transformadores. El tratamiento se realiza en una sola sesión y es totalmente ambulatorio, los resultados se ven en el momento, sin hematomas postoperatorios o molestias.', 100000, 95000, '30 min', '12-18 meses', 'treatment-ruerdfi0l0.webp'),
(6, 1, 1, 'SURCO NASOGENIANO', 'Para tratar el surco nasogeniano nos basamos en el estudio de vectores de envejecimiento y reposicionamiento de los tejidos. Para mejorar el surco nasogeniano colocamos ácido hialurónico en áreas específicas de pomulos, no para aportar volumen sino para producir el repocisionamiento facial logrando la mejoría del surco indirectamente y obteniendo como resultado un rostro fresco, natural y armónico.', 100000, 95000, '30 min', '12-18 meses', NULL),
(7, 1, 1, 'LABIOS', 'Previo al tratamiento realizaremos un diseño donde vamos a evaluar tu anatomía, edad, y expectativas para lograr resultados que se ajusten perfectamente a tus necesidades y a tu rostro. Utilizamos un ácido hialurónico con una densidad ideal para este área que nos permitirá optimizar la forma, proporción, estructura y volumen de los labios, como también elevar comisuras y corregir posibles asimetrías. También podemos tratar las \"líneas de fumador\" y mejorar la calidad de la piel ya que genera hidratación, aportando un resultado de labios cuidados y tersos.', 100000, 95000, '30 min', '12-18 meses', 'treatment-nj3aehaw91.webp'),
(9, 1, 1, 'MENTON', 'Utilizamos Ácido un Hialurónico de alta densidad para lograr un mentón bien definido con la altura y proyección ideal en cada rostro, consiguiendo un perfil armónico y un rostro más proporcionado; además nos permite mejorar la papada por tensión indirecta de la piel de la zona. Los resultados son instantáneos, es un procedimiento prácticamente indoloro, y la duración es de 2 años aproximadamente.', 100000, 95000, '30 min', '18-24 meses', NULL),
(10, 1, 1, 'TOP MODEL LOOK', 'La técnica “Top Model Look” tiene como objetivo lograr un rostro más atractivo con un efecto ‘contouring’ mediante la definición de la zona del hueso lateral de las mejillas. Trabajamos con acido hialuronico de alta y baja densidad, consiguiendo además generar un efecto tensor.', NULL, NULL, '60 min', '12-18 meses', NULL),
(11, 1, 1, 'MASCULINIZACION FACIAL', 'Utilizamos Ácido Hialurónico de altísima calidad con una densidad especifica para cada área del rostro; previamente tomamos medidas y proporciones faciales para realizar el diseño correcto. Trabajamos fundamentalmente en áreas claves de mejillas, mandíbula y mentón otorgando definición,  proporción y ángulos en base a una anatomía masculina ideal. Los resultados son siempre naturales y armónicos y se ven de inmediato. El procedimiento es prácticamente indoloro, y la duración es de 2 años aproximadamente.', 100000, 95000, '60 min', '18-24 meses', NULL),
(12, 1, 1, 'FULL FACE', 'La armonización facial es un procedimiento que se basa en un diagnóstico facial completo tomando medidas y proporciones faciales para el tratamiento de múltiples áreas del rostro utilizando Ácido Hialurónico en combinación con BOTOX®️ y bioestimuladores. El principal objetivo es reequilibrar las proporciones faciales, mejorar la definición y contornos, corregir irregularidades, reducir la apariencia de arrugas y ojeras; y reactivar la producción de colageno por parte de nuestras propias células. Los tratamientos se adaptan a cada paciente para lograr la mejor version de sí mismos, con resultados SIEMPRE naturales. La armonización facial puede ser realmente transformadora, proporcionando una mejora estética sustancial de la parte media del rostro (mejillas, área de los ojos, nariz), la parte inferior (mentón, línea de la mandíbula, labios) y la parte superior (frente, sienes y cejas). Este tratamiento requiere técnicas y conceptos avanzados, con un profundo conocimiento de la anatomía facial, vectores de envejecimiento y tecnologías de productos.', 3000, 2700, '60 min', '12-24 meses', NULL),
(13, 1, 1, 'BICHECTOMIA', 'La bichectomia es una cirugía mínimamente invasiva que se realiza una sola vez en la vida, se realiza con anestesia local en un tiempo aproximado de 30 minutos; consiste en extraer las bolsas de Bichat que son unas bolsitas de grasa encapsulada que tenemos naturalmente a cada lado de nuestras mejillas. Se realiza mediante una pequeña incisión por dentro de la mejillas y luego se cierra con un solo punto de cada lado. El resultado es un afinamiento del rostro resaltando pómulos y dejando una cara más angulosa y estética. Al ser un tipo de grasa encapsulada, no se vuelve a regenerar, manteniendo los resultados al margen de un aumento de peso.', 3000, 2700, '60 min', 'permanente', NULL),
(14, 1, 2, 'BOTOX®️ ESTETICO (FRENTE ENTRECEJO Y PATAS DE GALLO)', 'Relaja de forma selectiva los grupos musculares responsables de las arrugas de expresión, ilumina los ojos y elimina el gesto de estar permanentemente preocupado, consiguiendo una mirada fresca y descansada. Tratamos siempre la región de frente, entrecejo y patas de gallo con la dosis necesaria adecuada en cada área, sin excluir ninguna de las zonas, debido a que si se trata una zona aislada surgen arrugas compensatorias en las zonas no tratadas. La aplicación se realiza en pocos minutos pudiendo comenzar a ver los resultados entre 24 a 48 horas y viendo el efecto completo a las 2 semanas de aplicación. La duración del efecto es de 6 meses aproximadamente. Los resultados que obtenemos son siempre naturales gracias a nuestra técnica de aplicación altamente especialidada y personalizada en cada paciente.', 90000, 85000, '30 min', '4-6 meses', 'treatment-fpes5mc8bq.webp'),
(15, 1, 2, 'BOTOX®️ PUNTA NARIZ', 'En algunos pacientes podemos observar que al hablar o sonreír la punta de la nariz es traccionada hacia abajo. Esto surge por la presencia de un pequeño músculo que es inconstante  (no todos los pacientes lo tienen) que se encuentra situado en la base de la nariz y es el responsable del movimiento de la punta nasal durante la expresión y el habla del paciente. En estos casos tenemos la posibilidad de inactivar este musculo mediante la aplicación de BOTOX®️ para evitar la caída de la punta de la nariz a causa de esta tracción constante, permitiendo que la punta quede elevada durante cualquier expresión.', 90000, 85000, '30 min', '4-6 meses', NULL),
(16, 1, 2, 'BOTOX®️ MENTON EMPEDRADO', 'En muchos pacientes podemos observar que al hablar o expresarse se produce un puntillado o empedrado en la zona de la barbilla que se debe a una hiperactividad muscular en esa área. Esto podemos solucionarlo de una manera muy sencilla aplicando una dosis adecuada de BOTOX®️ para relajar estos músculos  hiperactivos y lograr un mentón liso y agradable ante cualquier expresión.', 90000, 85000, '30 min', '4-6 meses', NULL),
(17, 1, 2, 'BOTOX®️ PARA TRATAMIENTO DE CICATRICES', 'El tratamiento de cicatrices con BOTOX®️ es uno de los más novedosos avances que nos permite mejorar notablemente cualquier tipo de cicatriz mediante su aplicación intracicatrizal. La cantidad de sesiones dependerá del tipo de cicatriz y se realizan con un espacio de 4 semanas entre cada sesión.', 3000, 2700, '30 min', '4-6 meses', NULL),
(18, 1, 2, 'MESOBOTOX', 'Consiste en la aplicación de múltiples pequeñas dosis de Botox en la piel de todo el rostro, con el fin reducir el tamaño de poros pronunciados, la secreción de glándulas sebáceas,  brotes y granitos, consiguiendo una piel más tersa, suave y luminosa.', 90000, 85000, '30 min', '4-6 meses', NULL),
(19, 1, 2, 'SONRISA GINGIVAL', 'El tratamiento de sonrisa gingival con BOTOX®️ consiste en la colocación de algunas unidades de  BOTOX®️ en los músculos elevadores del labio superior, para relajarlos y evitar que el labio se suba de manera exagerada y que se muestre la cantidad justa de encía al sonreír. Logrando una sonrisa armónica y estética. En tan solo 48 hs  comienza el efecto y a las dos semanas de aplicación observamos los resultados finales.', NULL, NULL, '30 min', '4-6 meses', NULL),
(20, 1, 2, 'BOTOX®️ BRUXISMO', 'El tratamiento de Bruxismo con Botox es hoy en día el tratamiento más efectivo que soluciona esta afección. Consiste en la colocación de Botox en los músculos que lo provocan haciendo que se relajen y se produzca indefectiblemente un gran alivio, de esta forma evitamos desgastes y roturas dentarias, dolores articulares, de cabeza, oído, y contracturas cervicales asociadas al Bruxismo. La aplicación se lleva a cabo en tan solo unos minutos, y el efecto de relajación comienza a sentirse a las 48 hs luego de la aplicación.', 90000, 85000, '30 min', '4-6 meses', NULL),
(21, 1, 3, 'LIMPIEZA FACIAL PROFUNDA', 'Trabajamos con una técnica específica para mejorar la salud y la apariencia del cutis de forma global. Es el tratamiento cosmetologico más completo para el cuidado de nuestra piel. Eliminamos puntos negros y células muertas, consiguiendo que la piel respire y sean más efectivos los tratamientos subsiguientes. El resultado es una piel limpia, lisa, tersa y renovada. Incluimos en el tratamiento un  ñPeeling Químico que elegimos de forma personalizada acuerdo a los requerimientos de cada piel, también peeling mecánico con puntas de diamante, extracción de comedones y puntos negros de forma manual y con espátula ultrasónica, Ozonoterapia Frío/Calor, mascarilla Descongestiva/Nutritiva y Cabina LED.', NULL, NULL, '60-90 min', 'Requiere diagnostico', NULL),
(22, 1, 3, 'PEELING', 'Realizamos peelings mecánicos, con puntas de diamante y químicos, con diferentes tipos de ácidos de acuerdo a los requerimientos de cada piel. La combinación de ambos nos brinda resultados óptimos produciendo una renovación celular, atenuando manchas y arrugas finas, dejando como resultado una piel  renovada. Trabajamos con “peelings inteligentes” que pueden ser realizados en cualquier época del año. En cada sesión se realiza una limpieza, exfoliación, peeling con Punta de diamente, peeling con el ácido específico según la problemática a tratar y finalizamos con una mascarilla descongestiva y nutritiva elegida para cada caso en particular.', 30000, 28000, '30 min', 'Requiere diagnostico', NULL),
(23, 1, 3, 'OZONOTERAPIA', 'El ozono estimula el colágeno, la elastina, es antioxidante y restablece la circulación sanguínea, tiene efecto desinfectante, neutraliza las bacterias de la piel. Gracias a este tratamiento facial cerramos los poros de la piel y mejoramos las manchas.', NULL, NULL, 'Requiere diagnostico', 'Requiere diagnostico', NULL),
(24, 1, 3, 'EXTRACCION DE COMEDONES', 'Procedimiento no agresivo ni invasivo, destinado a mejorar el aspecto de la piel, corregir la dilatación de los poros, eliminar las células más superficiales y extraer los famosos \"puntos o negros” o “barritos\" (en dermatología denominados \"comedones\") y microquistes que se van acumulando con el tiempo.', 3000, 2700, 'Requiere diagnostico', 'Requiere diagnostico', NULL),
(25, 1, 3, 'MASCARA LED', 'Terapia de luz que ayuda al rejuvenecimiento cutáneo con grandes resultados a la hora de reafirmar la piel y tonificar los músculos faciales. Su luz, penetra en la capa de la dermis activando el metabolismo de las células.', NULL, NULL, 'Requiere diagnostico', 'Requiere diagnostico', NULL),
(26, 1, 3, 'JELLY MASK', 'Mascarillas faciales para el cuidado de la piel que se proporcionan en forma de polvo que toma su forma de mascarilla al agregar agua purificada. Crea una capa oclusiva, lo que fuerza la hidratación y empuja todos los nutrientes beneficiosos profundamente en la piel, lo que aumenta la efectividad del procedimiento.', 10000, 8500, 'Requiere diagnostico', 'Requiere diagnostico', NULL),
(27, 1, 3, 'DERMAPLANING', 'Método de exfoliación físico que consiste en utilizar un bisturí para eliminar suavemente la capa superior de la piel constituida por células muertas como también el vello o pelusa facial, con el fin de revelar una tez más brillante y suave.', 3000, 2700, '30 min', 'Requiere diagnostico', NULL),
(28, 1, 3, 'MASAJE FACIAL', 'Tratamiento de belleza que abarca un conjunto de técnicas basadas en manipulaciones manuales sobre el cutis. Por lo general, se realizan pequeños movimientos sobre el rostro, aplicando diferentes grados de intensidad, superficial o profunda.', NULL, NULL, '30-60 min', 'Requiere diagnostico', NULL),
(29, 1, 3, 'LASER NORDLYS', 'Láser no invasivo de una altísima capacidad rejuvenecedora que te permite continuar con tus actividades de inmediato. En muy pocas sesiones logramos cambios increíbles en la piel logrando un rejuvenecimiento 360* trabajando manchas, telangectasias, rosácea, arañitas, microarrugas, cicatrices de acné, acné activo y estimulando la producción de colageno y elastina de tu piel. Logra un rejuveneccimiento integral de la piel, mejorando la tonalidad y la textura, dando un aspecto brillante y más joven de forma segura y con resultados desde la primera sesión. Podemos utilizarlo en rostro, cuello, manos y escote.', NULL, NULL, '45 min', 'Requiere diagnostico', NULL),
(30, 1, 4, 'LIPOLISIS ENZIMATICA DE PAPADA', 'Tratamiento donde aplicamos enzimas lipolíticas especiales para esta zona en forma de micro inyecciones.Eliminan el tejido adiposo disolviendo las células de grasa en forma segura, rápida y altamente efectiva. Los resultados se ven a los 15 días de la primera sesión evaluando en esa etapa si son necesarias más sesiones.', NULL, NULL, '30 min', 'Requiere diagnostico', NULL),
(31, 1, 4, 'HIFU PAPADA', 'Tecnología no invasiva más efectiva del mercado para la flaccidez de la piel. Indicado también para reducir adiposidad localizada. Genera un efecto tensor ayudando además a definir el contorno facial.', 10000, 8500, '30 min', 'Requiere diagnostico', NULL),
(32, 1, 5, 'RADIESSE', 'Radiesse es un bioestimulador ideal para corregir los signos de envejecimiento facial y redefinir el contorno del rostro, de manera segura, ambulatoria y sin ninguna cirugía. No se utiliza como material de relleno sino que se aplica en puntos claves para estimular naturalmente la producción de colageno propio creando un efecto lifting. Su efecto dura aproximadamente 2 años.', NULL, NULL, '30 min', 'Requiere diagnostico', NULL),
(33, 1, 5, 'LONG LASTING', 'Long Lasting es un ‘Skin Builder’ que estimula a tus células para que comiencen a producir gran cantidad de colágeno y elastina. Su fórmula es a base de un ácido hialurónico especial combinado con poderosísimos antioxidantes. Se aplica en 7 puntos estratégicos a cada lado del rostro; también puede aplicarse en cuello, escote y manos. Revitaliza tu piel, tensando, hidratando y brindándole una luz increíble a los minutos de ser aplicado. Además redensifica la piel, eliminando micro arrugas y mejorando notablemente los surcos nasogenianos. Su aplicación es rápida e indolora y sólo se requiere 1 sesión al año gracias a su efecto de larga duración.', NULL, NULL, '30 min', 'Requiere diagnostico', NULL),
(34, 1, 5, 'GOURI', 'Bioestimulador de colágeno intradérmico de policaprolactona. Su principal ventaja es su forma completamente líquida, sin micropartículas lo que permite que además de no generar volumen, que el producto se extienda y estimule la síntesis de colágeno en todo el rostro minimizando los puntos de inyección. Su aplicación es rápida y sencilla, y abarca la estimulación completa del rostro desde la frente hasta el mentón. Corrige arrugas y pliegues profundos, tensa la piel, redefine los contornos faciales, mejora la flaccidez y las cicatrices notablemente. Gouri continua estimulando la producción de colágeno propio a largo plazo. Fue elegido como el mejor bioestimulador de colágeno por los premios AMWC.', 3000, 2700, '30 min', 'Requiere diagnostico', NULL),
(35, 1, 5, 'PROFHILO', 'Es el más novedoso Ácido Hialurónico de larga duración. Se utiliza para estimular la producción de colágeno, hidrata, tensa, ilumina, mejora notablemente la tonicidad, rejuveneciendo la piel, tanto de rostro, cuello, escote y manos. Su avanzada fórmula contiene la concentración mas alta de ácido Hialurónico en el mercado. Su aplicación es rápida e indolora. Se coloca en 5 puntos estratégicos a cada lado del rostro y se repite una segunda sesión a los 30 días para lograr que los efectos en tu piel se mantengan por más de un año.', NULL, NULL, '30 min', 'Requiere diagnostico', NULL),
(36, 1, 5, 'HARMONYCA', 'Es el último bioestimulador que ingresó a nuestro país. Compuesto por partículas de hidroxiapatita cálcica mezcladas tecnológicamente con ácido hialurónico reticulado. Esta perfecta combinación permite tensar los tejidos del rostro de manera inmediata como también continuar con una estimulación a largo plazo. Mejora notablemente la densidad y el estado de la piel, logrando un rostro más reposicionado y definido.', 3000, 2700, 'Requiere diagnostico', 'Requiere diagnostico', NULL),
(37, 2, NULL, 'SUERO TERAPIA', 'Consiste en la aplicación intravenosa de sustancias como biorreguladores, mega dosis de vitaminas, minerales, aminoácidos, enzimas y oligoelementos que reparan y rejuvenecen las células del cuerpo y neutralizan los radicales libres. Generan bienestar, optimizando la salud y el aspecto físico. Ayudan a estimular los mecanismos de defensa y a la desintoxicación, regeneración y reparación del organismo.', NULL, NULL, '60 min', 'Requiere diagnostico', NULL),
(38, 2, NULL, 'VACUNA ANTI AGE', 'La vacuna anti age es uno de los más novedosos avances de la medicina ortomolecular, compuesta a base de un hidrolizado de células rejuvenecedoras. Tiene un poderoso efecto Anti age, Revitalizante, Antioxidante celular y Preventivo de enfermedades degenerativas. El tratamiento consiste en la aplicación de 1 dosis por semana durante 5 semanas, obteniendo resultados increíbles no solo a nivel de piel, pelo y uñas sino que también genera un gran impacto en el bienestar físico y energético.', NULL, NULL, '30 min', 'Requiere diagnostico', NULL),
(39, 2, NULL, 'SUPLEMENTACION', 'Si bien podemos seguir una dieta muy saludable, nunca llegamos a incorporar la cantidad de nutrientes, vitaminas y minerales que idealmente nuestro cuerpo necesita; es por eso que la suplementación juega un papel importantísimo en nuestro bienestar. Para esto debemos realizar un buen diagnóstico, con análisis correspondientes definiendo qué tipo de suplementación es la ideal para cada paciente.  ', NULL, NULL, 'Requiere diagnostico', 'Requiere diagnostico', NULL),
(40, 2, NULL, 'PLASMA RICO EN PLAQUETAS', 'Procedimiento en el cual se realiza una extracción de sangre, se centrifuga separando las células de la sangre del plasma, que es quien tiene todos los factores de crecimiento; este último se activa y se vuelve a inyectar en la zona a tratar. El protocolo ideal es realizar 3 sesiones con una frecuencia de 30 días. ', NULL, NULL, '45 min', 'Requiere diagnostico', NULL),
(41, 2, NULL, 'PLASMA CAPILAR', 'Detiene la caída del cabello y estimula al crecimiento del cabello mejorando tanto  su calidad como grosor de manera notable.', NULL, NULL, '45 min', 'Requiere diagnostico', NULL),
(42, 2, NULL, 'PLASMA CORPORAL', 'Actúa regenerando los tejidos, mejorando notablemente estrías, flacidez cutánea y celulitis.', NULL, NULL, '45 min', 'Requiere diagnostico', NULL),
(43, 2, NULL, 'PLASMA EN ROSTRO, ESCOTE Y MANOS', 'Otorga una luminosidad inigualable, mejora notablemente líneas de expresión, manchas y cicatrices, cierra poros y tensa la piel.', NULL, NULL, '90 min', 'Requiere diagnostico', NULL),
(45, 2, NULL, 'NUTRICION DEPORTIVA', 'Se especializa en elaborar planes de alimentación adaptados al ejercicio. Es decir, nos enfocamos en crear programas nutricionales acorde al desgaste físico al que se somete cada paciente, logrando optimizar la composición corporal. ', 7000, 3500, 'Requiere diagnostico', 'Requiere diagnostico', NULL),
(46, 2, NULL, 'NUTRICIÓN ESTÉTICA', 'Luego de un estudio exhaustivo de cada paciente, contamos con la información necesaria para modificar ciertos  aspectos en la alimentación y el estilo de vida; impactando positivamente en la salud intestinal, que repercute directamente en la salud de la piel, los procesos de envejecimiento y el bienestar de una persona, alargando así  su juventud.', NULL, NULL, 'Requiere diagnostico', 'Requiere diagnostico', NULL),
(47, 3, NULL, 'HIPERHIDROSIS MANOS, AXILAS Y PIES', 'El tratamiento para la hiperhidrosis o sudoración excesiva de axilas, manos o pies consiste en la aplicación de Botox de forma subcutánea; haciendo que disminuya notablemente la sudoración en el área tratada. Es un procedimiento seguro, sencillo, prácticamente indoloro que no requiere anestesia.', 100000, 95000, '30 min', '4-6 meses', NULL),
(48, 3, NULL, 'HIFU CORPORAL', 'Es una novedosa tecnología que genera increíbles resultados en el retensado de los tejidos. A nivel corporal podemos trabajar zonas como brazos, abdomen, piernas, flacos y gluteos . Contamos con el equipo original en su última versión, que nos brinda resultados sumamente efectivos. La sesión dura 45 min y puede realizarse en cualquier época del año. ', NULL, NULL, '60 min', '12 meses', NULL),
(49, 3, NULL, 'TRATAMIENTOS LIPOLITICOS', 'Tratamiento que sirve para reducir la adiposidad localizada en áreas del cuerpo como abdomen, piernas y glúteos. Aplicamos enzimas lipolíticas en forma de micro inyecciones que actúan disolviendo las células de grasa en forma segura, rápida y efectiva. Los resultados se ven a los 15 días de la primera sesión evaluando en esa etapa si son necesarias más sesiones.', NULL, NULL, 'Requiere diagnostico', 'Requiere diagnostico', NULL),
(50, 4, 6, 'LIMPIEZA DENTAL', 'Mediante un equipo de ultrasonido desprendemos placa bacteriana, manchas y sarro que se acumulan sobre las piezas dentarias con el paso del tiempo. La frecuencia sugerida para realizarla es entre 4 a 6 meses.', 10000, 8500, '30 min', '6 meses', NULL),
(52, 4, 6, 'ORTODONCIA', 'Invisalign es la ortodoncia invisible con mejores resultados finales comprobados en el mercado; finaliza los casos con mayor rapidez que cualquier otro tipo de ortodoncia y permite trabajar desde casos simples hasta casos muy complejos. Para comenzar el tratamiento se realiza un escaneo digital de la boca, se toman fotos y medidas del paciente los cuales son enviados a un laboratorio en California; a los 30 días recibimos el sistema completo de alineadores en Argentina. Los tratamientos están terminados en promedio entre 5 y 11 meses en la mayoría de los casos (con una rapidez mucho mayor a los brackets). Es sin duda el método más cómodo, rápido y estético de alinear tus piezas dentarias.', NULL, NULL, '45 min', 'Requiere diagnostico', NULL),
(53, 4, 6, 'ENDODONCIA', 'Conocido comúnmente como “tratamiento de conducto”; tiene como finalidad preservar las piezas dentales dañadas, evitando su pérdida. Para ello, se extrae la pulpa dental y la cavidad resultante, se rellena y sella con material  biocompatible, avistando así una extracción dentaria.', 3000, 2700, '60 min', 'Permanente', NULL),
(54, 4, 6, 'PERIODONCIA', 'Consiste en la preservación y tratamiento de los tejidos que protegen y rodean nuestros dientes: encía, hueso, ligamento periodontal y raíz. Se lleva a cabo mediante limpiezas dentarias profundas para tratar gingivitis (encías sangrantes) o periodontitis. También  incluye recortes o injertos de encías según sea necesario.', NULL, NULL, '60 min', 'Requiere diagnostico', NULL),
(55, 4, 6, 'IMPLANTES DENTALES', 'Un Implante dental es un tornillo de titanio que se coloca dentro del hueso para reemplazar la raíz de una pieza dentaria perdida. Se realiza mediante una cirugía simple y generalmente se espera un periodo de 3 meses para la colocación de la corona de porcelana o prótesis. Es el tiempo biológico en que tarda en calcificarse el hueso alrededor del implante. Durante ese periodo el paciente estará estéticamente disimulado con un provisorio. La cirugía es totalmente ambulatoria y permite devolver de una manera rápida y simple tanto la estética como la función masticatoria.', NULL, NULL, '60 min', 'Permanente', NULL),
(56, 4, 7, 'PLACA DE RELAJACION', 'Es un dispositivo removible de acrílico que confeccionamos a medida del paciente y tiene ciertas características que ayudan a atenuar el Bruxismo protegiendo las piezas dentarias y la articulación temporomandibular.', NULL, NULL, '30 min', 'Requiere diagnostico', NULL),
(58, 4, 8, 'CARILLAS DE RESINA', 'Se realizan en una sola sesión en el consultorio, siempre recomendamos una limpieza y blanqueamiento previo para unificar colores. No requieren desgaste dentario y nos permiten corregir color, forma y textura de los dientes en el acto. También sirven para corregir fracturas y mal posiciones dentarias leves. Requieren de un mantenimiento de pulido cada 6 meses para mantener su color.', 5000, 4000, 'Requiere diagnostico', '5 años', NULL),
(59, 4, 8, 'CARILLAS DE PORCELANA', 'Las carillas de porcelana que realizamos son unas carillas del tipo “lente de contacto”, muy delgadas que nos permiten evitar desgastes dentarios. Para realizarlas hacemos siempre un diseño de sonrisa previo planificando la anatomía dentaria ideal en cada caso. El  resultado es una sonrisa en perfecta armonía con el rostro que denota total naturalidad.   Una de sus grandes ventajas es que no se pigmentan y se ven como dientes naturales.', 3000, 2700, 'Requiere diagnostico', '10 años', NULL),
(60, 4, 8, 'REHABILITACION ORAL', 'Consiste en un tratamiento bucal integral mediante prótesis fijas, removibles, implantes dentales y ajustes de oclusión. Todo el proceso comienza con un diagnóstico completo de la boca del paciente con la finalidad de devolver salud, estética y funcionalidad.', NULL, NULL, 'Requiere diagnostico', 'Requiere diagnostico', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` varchar(36) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `dni` varchar(8) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `wpp_notifications` int(11) NOT NULL,
  `email_notifications` int(11) NOT NULL,
  `email_newsletter` int(11) NOT NULL,
  `user_categories_id` int(11) DEFAULT NULL,
  `birth_date` timestamp NULL DEFAULT NULL,
  `genres_id` int(11) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `password_token` text DEFAULT NULL,
  `last_cart_email` timestamp NULL DEFAULT NULL,
  `cart_period_type` varchar(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `phone`, `dni`, `password`, `email`, `wpp_notifications`, `email_notifications`, `email_newsletter`, `user_categories_id`, `birth_date`, `genres_id`, `createdAt`, `deletedAt`, `updatedAt`, `password_token`, `last_cart_email`, `cart_period_type`) VALUES
('0b06d883-f6ba-4f64-bf1d-418230fbbc20', '', '', NULL, '', '$2a$10$5gRGlpd3HTeaYunGidwGUeuvQHG9V1AexKU/U4YW.60OrnJxX5gYu', 'prueba@gmail.com', 0, 0, 0, 3, NULL, NULL, '2023-07-12 12:55:21', NULL, '2023-07-12 12:55:21', NULL, NULL, NULL),
('10', 'Jano', 'Pereira Kent', '01158817312', '43083506', '$2a$10$kROb/UzSCL6fuKn/HFMvOuoUMPAJsgtEBGos2aRfUhizr3GbrSKyC', 'janopk789@gmail.com', 0, 0, 0, 1, '2001-02-12 00:00:00', NULL, '2023-07-04 14:35:00', NULL, '2023-08-06 14:58:25', NULL, '2023-08-06 15:17:00', '2'),
('11', 'Jano00', 'Pereira Kent', '01158817312', '', '$2a$10$Vz40dkbxoBxWgbaUrMZbOul97Y59CjL9H6Lq.6Y1boQ5.NLPqiUpq', 'hola@gmail.com', 0, 0, 0, 2, NULL, NULL, '2023-07-04 20:51:27', NULL, '2023-07-04 20:56:39', NULL, NULL, NULL),
('12', 'Joaquin', 'Cataldo', '', '', '$2a$10$VPw7f.Nv6sM8ZDhh3S06oua43xB5fafDXCMBbkHrv/DzP5bbQmTUy', 'janoo.pereira@gmail.com', 0, 0, 0, 1, NULL, NULL, '2023-07-05 11:28:07', NULL, '2023-08-06 15:11:02', NULL, '2023-08-06 15:17:00', '2'),
('13', 'Admin', 'Admin', '', '', '$2a$10$F7R5mDNPyIN755qTjbA6.efd1/xNHMqN2Rn6MuZa/XkyCxodqsUaS', 'info@ismile.com.ar', 0, 0, 0, 2, NULL, NULL, '2023-07-06 22:52:39', NULL, '2023-07-06 23:53:48', '', NULL, NULL),
('15', 'Inés', 'Añó', NULL, NULL, '$2a$10$WMQbFld9.6lnnnGNAqdrl.hYIQprJSgtvBZuW.OxE3a73W0NuMf7W', 'ines.anio@gmail.com', 0, 0, 0, 1, NULL, NULL, '2023-07-06 22:58:58', NULL, '2023-07-30 17:19:54', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE1IiwiaWF0IjoxNjkwNzM3NTk0LCJleHAiOjE2OTA3NDExOTR9.lBO3odlPHYCGdi-NaQ1960LiM_sQZRCPwF7ybD5se-I', NULL, NULL),
('16', 'CJoaquin', 'Cataldo', '', '', '$2a$10$NneD5C8KExxSt8KgwXGcJewSn62J2dYelRMN7eTbwOER07KleOuNm', 'joaco.cataldo3@gmail.com', 0, 0, 0, 2, NULL, NULL, '2023-07-11 11:10:11', NULL, '2023-07-11 11:10:32', NULL, NULL, NULL),
('17', '', '', NULL, '', '$2a$10$H/XGplmwvmq5ah.nwq6DH.0vCUvzdgmb3De/h45iUrqsLvht5BHf6', 'jano@gmail.com', 0, 0, 0, 3, '2023-07-06 00:00:00', NULL, '2023-07-11 20:12:36', NULL, '2023-07-11 20:12:36', NULL, NULL, NULL),
('214ee117-1788-4155-8895-9f61d9e2dcf6', 'Valentina', 'Antonelli', '1139421136', '45479865', '$2a$10$p2DL7DnIQKNOfNG3UuYEPuhcB89vOk/27rCKiH0TooWiZFHivolXm', 'valen@gmail.com', 0, 0, 0, 3, '2004-02-02 00:00:00', 1, '2023-07-31 21:47:48', NULL, '2023-07-31 21:52:04', NULL, NULL, NULL),
('2e703d70-fbaf-4674-9c76-238d5ec4f44e', 'Juan', 'Gomez', '1158817312', '43083507', '$2a$10$g3oVAsn4v2JipXYB2atgIeimRyvq6bT9OfRIM8Mpmnj3F3ShfGVH2', 'chau@gmail.com', 0, 0, 0, 3, '2023-10-10 00:00:00', 2, '2023-07-12 20:22:50', NULL, '2023-07-13 01:06:05', NULL, NULL, NULL),
('8', 'Jano', 'Pereira Kent', '01158817312', '43083507', '$2a$10$wcUai1LYaFAVJ1Kt2OcnnOdPHEiTslzDty5X/SIFCroXIji71qLpS', 'diego@gmail.com', 1, 0, 0, 3, NULL, NULL, '2023-07-04 11:30:00', NULL, '2023-07-04 14:16:24', NULL, NULL, NULL),
('f636404c-60bc-41e1-bd7a-14d629ac7f07', 'Martin', 'Berra', '1144301111', '', '$2a$10$RkdmG6iBhyoiULCLpZQmNOwZb/GV8y4k/7AouZOfk9CJdgTITsgBi', 'martin.berra+test@gmail.com', 0, 0, 0, 3, '2023-10-10 00:00:00', 1, '2023-07-17 23:23:40', NULL, '2023-07-17 23:24:17', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users_categories`
--

CREATE TABLE `users_categories` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users_categories`
--

INSERT INTO `users_categories` (`id`, `name`) VALUES
(1, 'owner'),
(2, 'admin'),
(3, 'cliente');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `billing_addresses`
--
ALTER TABLE `billing_addresses`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `blogs_images`
--
ALTER TABLE `blogs_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `blogs_images_ibfk_1` (`blog_id`);

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `file_types`
--
ALTER TABLE `file_types`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `home_files`
--
ALTER TABLE `home_files`
  ADD PRIMARY KEY (`id`),
  ADD KEY `home_files_ibfk_1` (`file_types_id`),
  ADD KEY `home_files_ibfk_2` (`home_sections_id`);

--
-- Indices de la tabla `home_sections`
--
ALTER TABLE `home_sections`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `users_id` (`users_id`),
  ADD KEY `orders_ibfk_5` (`shipping_addresses_id`),
  ADD KEY `orders_ibfk_4` (`order_status_id`),
  ADD KEY `orders_ibfk_6` (`billing_addresses_id`),
  ADD KEY `orders_ibfk_7` (`order_types_id`),
  ADD KEY `orders_ibfk_8` (`payment_methods_id`);

--
-- Indices de la tabla `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_items_ibfk_1` (`products_id`),
  ADD KEY `order_items_ibfk_2` (`orders_id`);

--
-- Indices de la tabla `order_status`
--
ALTER TABLE `order_status`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `order_types`
--
ALTER TABLE `order_types`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `payment_methods`
--
ALTER TABLE `payment_methods`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indices de la tabla `products_files`
--
ALTER TABLE `products_files`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_files_ibfk_2` (`file_types_id`),
  ADD KEY `products_files_ibfk_3` (`products_id`);

--
-- Indices de la tabla `shipping_addresses`
--
ALTER TABLE `shipping_addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `addresses_ibfk_1` (`users_id`);

--
-- Indices de la tabla `specialties`
--
ALTER TABLE `specialties`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `specialties_services`
--
ALTER TABLE `specialties_services`
  ADD PRIMARY KEY (`id`),
  ADD KEY `specialties_id` (`specialties_id`);

--
-- Indices de la tabla `temporal_carts`
--
ALTER TABLE `temporal_carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `temporal_carts_ibfk_1` (`users_id`);

--
-- Indices de la tabla `temporal_items`
--
ALTER TABLE `temporal_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `temporal_cart_id` (`temporal_cart_id`),
  ADD KEY `temporal_items_ibfk_2` (`products_id`);

--
-- Indices de la tabla `treatments`
--
ALTER TABLE `treatments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `treatments_ibfk_1` (`specialties_id`),
  ADD KEY `treatments_ibfk_2` (`specialties_services_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `users_ibfk_1` (`user_categories_id`),
  ADD KEY `genres_id` (`genres_id`);

--
-- Indices de la tabla `users_categories`
--
ALTER TABLE `users_categories`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `blogs_images`
--
ALTER TABLE `blogs_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=133;

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `genres`
--
ALTER TABLE `genres`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `home_files`
--
ALTER TABLE `home_files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `home_sections`
--
ALTER TABLE `home_sections`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `order_status`
--
ALTER TABLE `order_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `order_types`
--
ALTER TABLE `order_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `payment_methods`
--
ALTER TABLE `payment_methods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `products_files`
--
ALTER TABLE `products_files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=217;

--
-- AUTO_INCREMENT de la tabla `specialties`
--
ALTER TABLE `specialties`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `specialties_services`
--
ALTER TABLE `specialties_services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `temporal_carts`
--
ALTER TABLE `temporal_carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT de la tabla `temporal_items`
--
ALTER TABLE `temporal_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=139;

--
-- AUTO_INCREMENT de la tabla `treatments`
--
ALTER TABLE `treatments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT de la tabla `users_categories`
--
ALTER TABLE `users_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `blogs_images`
--
ALTER TABLE `blogs_images`
  ADD CONSTRAINT `blogs_images_ibfk_1` FOREIGN KEY (`blog_id`) REFERENCES `blogs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `home_files`
--
ALTER TABLE `home_files`
  ADD CONSTRAINT `home_files_ibfk_1` FOREIGN KEY (`file_types_id`) REFERENCES `file_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `home_files_ibfk_2` FOREIGN KEY (`home_sections_id`) REFERENCES `home_sections` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_4` FOREIGN KEY (`order_status_id`) REFERENCES `order_status` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_5` FOREIGN KEY (`shipping_addresses_id`) REFERENCES `shipping_addresses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_6` FOREIGN KEY (`billing_addresses_id`) REFERENCES `billing_addresses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_7` FOREIGN KEY (`order_types_id`) REFERENCES `order_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_8` FOREIGN KEY (`payment_methods_id`) REFERENCES `payment_methods` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`orders_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `products_files`
--
ALTER TABLE `products_files`
  ADD CONSTRAINT `products_files_ibfk_2` FOREIGN KEY (`file_types_id`) REFERENCES `file_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `products_files_ibfk_3` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `shipping_addresses`
--
ALTER TABLE `shipping_addresses`
  ADD CONSTRAINT `shipping_addresses_ibfk_1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `specialties_services`
--
ALTER TABLE `specialties_services`
  ADD CONSTRAINT `specialties_services_ibfk_1` FOREIGN KEY (`specialties_id`) REFERENCES `specialties` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `temporal_carts`
--
ALTER TABLE `temporal_carts`
  ADD CONSTRAINT `temporal_carts_ibfk_1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `temporal_items`
--
ALTER TABLE `temporal_items`
  ADD CONSTRAINT `temporal_items_ibfk_1` FOREIGN KEY (`temporal_cart_id`) REFERENCES `temporal_carts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `temporal_items_ibfk_2` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `treatments`
--
ALTER TABLE `treatments`
  ADD CONSTRAINT `treatments_ibfk_1` FOREIGN KEY (`specialties_id`) REFERENCES `specialties` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `treatments_ibfk_2` FOREIGN KEY (`specialties_services_id`) REFERENCES `specialties_services` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`user_categories_id`) REFERENCES `users_categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`genres_id`) REFERENCES `genres` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
