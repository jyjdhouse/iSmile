-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-10-2023 a las 14:44:20
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
('012d028c-5f31-43fa-a076-a014ab9d6458', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-09-21 16:12:55', '2023-09-21 16:12:55', NULL),
('0498c7a9-f133-4b85-beb2-fb8e831024b9', 'Juana Azurduy 1730', '', 'Nuñez', 1, '1429', '2023-07-19 16:01:52', '2023-07-19 16:01:52', NULL),
('0684549f-4f77-4cab-9e38-4f19f57a5beb', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-09-28 22:28:54', '2023-09-28 22:28:54', NULL),
('072ca0de-9d92-45ae-9c01-757681e54ee8', 'Libertador 1580', '5a', 'Nuñez', 1, '2222', '2023-07-19 13:45:40', '2023-07-19 13:45:40', NULL),
('09b6659c-b535-4b14-a0fd-96b983614a59', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-10-01 14:37:24', '2023-10-01 14:37:24', NULL),
('09cb9d37-c2e7-4f61-8412-7457a95d2c42', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-09-28 22:30:30', '2023-09-28 22:30:30', NULL),
('09ecdc81-f58f-4daa-8649-652b97d85a53', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-09-21 20:55:27', '2023-09-21 20:55:27', NULL),
('10d706fd-85d9-409d-8f53-691b9385b883', 'Juana Azurduy 1730', '', 'Nuñez', 1, '1429', '2023-08-22 22:49:05', '2023-08-22 22:49:05', NULL),
('132185ee-0edd-4d01-b407-fa2836d30877', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-10-03 00:38:47', '2023-10-03 00:38:47', NULL),
('13df2a07-f261-4ef2-9a96-b8aa50ad4951', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-09-22 17:20:04', '2023-09-22 17:20:04', NULL),
('13ec99e7-efe1-4ff4-9db9-244a35c20828', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-09-20 18:20:22', '2023-09-20 18:20:22', NULL),
('148c138a-50fd-4a90-86ff-dc56a0703274', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-10-03 00:19:24', '2023-10-03 00:19:24', NULL),
('15097bce-f867-466b-8011-a2a49905bcc0', 'Juana Azurduy 1730', '', 'Nuñez', 1, '1429', '2023-08-05 19:49:26', '2023-08-05 19:49:26', NULL),
('18b82d88-92cd-43e8-9473-90e71ebef019', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-09-25 15:01:48', '2023-09-25 15:01:48', NULL),
('18d42683-9494-44f5-94f0-448480d3a49c', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-09-21 20:42:54', '2023-09-21 20:42:54', NULL),
('1b5e6c28-2cc8-410e-b86a-8ed848e566a4', 'Juana Azurduy 1730', '', 'Nuñez', 1, '1429', '2023-08-22 22:57:16', '2023-08-22 22:57:16', NULL),
('1c8b6d7d-dc86-4fed-ad41-a499708c1292', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-09-25 15:23:20', '2023-09-25 15:23:20', NULL),
('1cb4e7f4-a4ea-4618-b707-79ec3e518019', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-09-20 19:54:49', '2023-09-20 19:54:49', NULL),
('1f3c278a-8690-46eb-a6e2-9f438f4d7169', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-10-01 15:11:42', '2023-10-01 15:11:42', NULL),
('1f82d9aa-a01d-4416-946c-d458163271a8', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-09-22 17:11:00', '2023-09-22 17:11:00', NULL),
('203d06fa-7536-4a85-9ac6-6d022f3d9da2', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-09-21 15:49:09', '2023-09-21 15:49:09', NULL),
('20694b46-a47e-4b49-a72e-4dc8973e4ee4', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-09-25 15:09:30', '2023-09-25 15:09:30', NULL),
('20c4a468-cc9c-4fcc-ba5f-d45e9dac89fa', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-09-21 16:07:46', '2023-09-21 16:07:46', NULL),
('23ad9a35-11d5-4c48-b6dc-37b2c2a091f9', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-09-20 19:40:32', '2023-09-20 19:40:32', NULL),
('24403f4f-5c3f-47b1-bbfd-76cfe262c97e', 'Av. Libertador 2222', '3F', 'Palermo', 1, '1112', '2023-07-17 14:25:22', '2023-07-17 14:25:22', NULL),
('24eb628e-0d2a-4374-a897-2ebccb7247bd', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-09-25 15:15:29', '2023-09-25 15:15:29', NULL),
('26d8ae84-af45-4397-8275-100e240d03bc', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-08-28 16:04:44', '2023-08-28 16:04:44', NULL),
('26d9dc4b-05a5-472d-b54f-ee389a7562a0', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-08-28 16:13:10', '2023-08-28 16:13:10', NULL),
('279f99aa-b2a0-4494-be3b-d54a67fd7123', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-10-03 18:36:43', '2023-10-03 18:36:43', NULL),
('285cc1a5-6c16-4112-bbcf-b9b63c4810ba', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-09-21 14:22:57', '2023-09-21 14:22:57', NULL),
('2b024305-de78-44d5-b62d-9aa51df99a92', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-09-25 14:00:45', '2023-09-25 14:00:45', NULL),
('2c41a0f0-a045-4745-9dce-73efcacfc11f', 'Libertador 1580', '20a', 'Nuñez', 1, '2222', '2023-07-19 13:53:22', '2023-07-19 13:53:22', NULL),
('2f6f55e3-33d0-4a2e-938e-8121f15f5127', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-09-21 20:34:57', '2023-09-21 20:34:57', NULL),
('308b2866-3e59-4b77-ac44-c72480b1a22b', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-10-03 18:38:29', '2023-10-03 18:38:29', NULL),
('318a0711-7249-4408-95e4-2f40ba829fe9', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-09-25 15:11:30', '2023-09-25 15:11:30', NULL),
('3195f951-03ad-4747-89c1-0285821ef1bf', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-09-21 21:59:08', '2023-09-21 21:59:08', NULL),
('32c078ee-ceb4-4b13-a35e-3da4e333de8a', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-09-20 19:31:46', '2023-09-20 19:31:46', NULL),
('38004a15-ebaa-4596-ad09-ebc019eff909', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-09-22 16:38:32', '2023-09-22 16:38:32', NULL),
('3880540e-17f1-484a-8cc3-790715751b47', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-09-21 20:41:42', '2023-09-21 20:41:42', NULL),
('39940e35-d311-4454-8fa6-4aea6d9cce28', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-09-22 17:06:36', '2023-09-22 17:06:36', NULL),
('39a8736e-8fb7-441b-b92e-2229ea6cfe73', '1908 N 58th Way', '', 'Hollywood', 1, '33021', '2023-07-25 11:05:14', '2023-07-25 11:05:14', NULL),
('3a5587ee-e039-404f-a0d4-76d5b987cd87', 'Juana Azurduy 1730', '', 'CABA', 2, '1429', '2023-08-24 21:56:36', '2023-08-24 21:56:36', NULL),
('3ce31b91-f94f-4904-bef1-e0c5fdf3dd6f', 'Juana Azurduy 1730', '', 'CABA', 2, '1429', '2023-08-22 22:55:04', '2023-08-22 22:55:04', NULL),
('3e433c15-45d9-4a88-b6bf-fad5bb2667ba', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-09-21 20:26:43', '2023-09-21 20:26:43', NULL),
('3f739aac-3c82-488d-88f1-7ce847fc1a46', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-09-28 22:20:01', '2023-09-28 22:20:01', NULL),
('40d4625a-e539-4ebd-82df-a39ef0990f4f', 'Juana Azurduy 1730', '2a', 'CABA', 1, '1429', '2023-07-21 23:07:40', '2023-07-21 23:07:40', NULL),
('40f5e07b-ec66-4848-95a8-b77424076428', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-09-25 14:05:31', '2023-09-25 14:05:31', NULL),
('41e9ba01-9907-4dac-9734-cfe849b2094c', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-08-28 16:01:53', '2023-08-28 16:01:53', NULL),
('439d2fe4-b684-4f6a-9274-d83fd1ce3419', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-08-28 15:54:47', '2023-08-28 15:54:47', NULL),
('44008cc0-9642-4368-a231-df48d8f3e6fe', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-10-02 03:18:16', '2023-10-02 03:18:16', NULL),
('46136a57-6a4f-42c6-9ad0-e0b7cbfdcb50', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-09-28 22:27:57', '2023-09-28 22:27:57', NULL),
('46d45a14-dfe0-4644-a784-891c4294cb94', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-09-25 15:14:04', '2023-09-25 15:14:04', NULL),
('47e26aba-94cb-4340-930a-01e3d918ab9c', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-08-28 16:33:34', '2023-08-28 16:33:34', NULL),
('49942240-6749-4d5a-a5b1-572c098da894', 'Juana Azurduy 1730', '12', 'Nuñez', 1, '1429', '2023-07-19 13:57:09', '2023-07-19 13:57:09', NULL),
('4c275412-9807-4875-a450-aedaf7431ac3', 'Juana Azurduy 1730', '', 'CABA', 2, '1429', '2023-08-22 22:50:40', '2023-08-22 22:50:40', NULL),
('4e332979-b333-49b5-acdd-31035a77ab05', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-10-01 14:06:18', '2023-10-01 14:06:18', NULL),
('4ff6eae4-7481-469d-86fa-98e0c59dc987', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-09-20 18:09:27', '2023-09-20 18:09:27', NULL),
('507b9085-0541-4efb-a5e8-ee00b774a124', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-09-29 04:33:18', '2023-09-29 04:33:18', NULL),
('513f6d92-c307-44e5-8fbd-c886d0a62802', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-09-25 14:06:10', '2023-09-25 14:06:10', NULL),
('52d09dde-bbe7-4fa5-9ad0-fad014cb972a', 'Juana Azurduy 1730', '', 'Nuñez', 1, '1429', '2023-08-24 21:46:18', '2023-08-24 21:46:18', NULL),
('5345aa85-682b-4c2c-b908-84107d3914bf', 'Juana Azurduy 1730', '', 'Nuñez', 1, '1429', '2023-08-05 19:46:00', '2023-08-05 19:46:00', NULL),
('565f6ac9-eaf6-4933-b474-8b997c5af225', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-09-20 19:39:11', '2023-09-20 19:39:11', NULL),
('59a9f3c9-35cc-4ace-9230-7351d4e71ca5', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-09-21 20:59:35', '2023-09-21 20:59:35', NULL),
('5b875db7-4ba9-4446-9420-8a1e0e28912d', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-09-22 16:19:23', '2023-09-22 16:19:23', NULL),
('5c665e3a-4d92-4452-9f7b-0641e99f9089', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-09-21 14:20:40', '2023-09-21 14:20:40', NULL),
('5d77b23b-fd8c-45d9-bbae-2fe6b4cbf73f', 'Juana Azurduy 1730', '', 'Nuñez', 1, '1429', '2023-07-19 18:51:36', '2023-07-19 18:51:36', NULL),
('5de1fcaf-4329-46b7-84b9-d20e9d41e546', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-09-25 15:01:58', '2023-09-25 15:01:58', NULL),
('5f598b35-9422-465c-9e90-f8d16ce9b0b8', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-09-21 21:01:53', '2023-09-21 21:01:53', NULL),
('610a0d8d-f147-4a51-9f17-e6a7567fbb0d', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-09-28 23:14:48', '2023-09-28 23:14:48', NULL),
('6183530e-3fc9-46c1-b089-8724e54ec5bd', 'Juana Azurduy 1730', '', 'Nuñez', 1, '1429', '2023-08-05 19:41:43', '2023-08-05 19:41:43', NULL),
('6376f0db-4174-4779-891f-5aa73247f39c', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-10-02 13:12:47', '2023-10-02 13:12:47', NULL),
('65cbdc47-a86d-4651-bbcb-6581a9b2d0f9', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-10-01 22:53:51', '2023-10-01 22:53:51', NULL),
('66f381f2-de82-41ea-a38f-7cfb102fe3df', 'Juana Azurduy 1730', '', 'Nuñez', 1, '1429', '2023-08-05 19:48:41', '2023-08-05 19:48:41', NULL),
('673c605c-e137-4180-858b-de74894cd554', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-10-02 03:23:37', '2023-10-02 03:23:37', NULL),
('677964d2-aa7a-4a26-8379-8132fdd4f2ea', 'Juana Azurduy 1730', '', 'Nuñez', 1, '1429', '2023-07-18 00:11:58', '2023-07-18 00:11:58', NULL),
('6a3bc59a-f9aa-484b-bd72-60b7632226b5', 'Libertador 1580', '20a', 'Nuñez', 1, '2222', '2023-07-19 13:55:35', '2023-07-19 13:55:35', NULL),
('6b695289-b6fe-488f-9b01-7227aa9a09ca', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-10-01 15:51:04', '2023-10-01 15:51:04', NULL),
('6d653043-8048-473b-8149-1de8de673daf', 'Juana Azurduy 1730', '', 'Nuñez', 1, '1429', '2023-08-05 19:39:30', '2023-08-05 19:39:30', NULL),
('6e3b5fce-4b02-4906-a547-b5c9fe378109', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-09-25 14:08:32', '2023-09-25 14:08:32', NULL),
('70e84fb6-a917-481a-9719-d16ff70c51ef', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-09-25 15:25:15', '2023-09-25 15:25:15', NULL),
('710da430-f70c-48c9-8822-69177c183c8c', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-09-25 15:08:07', '2023-09-25 15:08:07', NULL),
('713a292f-7dfd-4d22-8677-ed4e703aecde', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-09-20 19:50:31', '2023-09-20 19:50:31', NULL),
('7147f039-f430-400f-b6c4-f4ea0f584cd8', 'Juana Azurduy 1730', '', 'Nuñez', 1, '1429', '2023-07-19 14:33:07', '2023-07-19 14:33:07', NULL),
('7371f1d7-9e97-4d72-8d3b-9a3892e02e17', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-09-20 18:51:25', '2023-09-20 18:51:25', NULL),
('74b2c2df-39e8-439d-aa4f-ea8143311e29', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-09-20 19:24:03', '2023-09-20 19:24:03', NULL),
('768e04cf-36f5-4cf4-88c4-d0f5060760fb', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-09-28 22:42:54', '2023-09-28 22:42:54', NULL),
('7696a7fe-27b7-44a5-9962-27494a975cbf', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-09-21 20:48:19', '2023-09-21 20:48:19', NULL),
('76a98a90-1e87-4fac-b71d-81b1d9e42aef', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-09-21 20:27:56', '2023-09-21 20:27:56', NULL),
('77ecbbfa-c87e-44e9-92e9-9de26f58b72b', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-08-28 16:31:41', '2023-08-28 16:31:41', NULL),
('7b6b66d2-db54-4530-9149-c2181e6cc200', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-09-21 16:04:31', '2023-09-21 16:04:31', NULL),
('7be98597-2e1c-402b-a89c-df32424375f8', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-08-28 16:05:18', '2023-08-28 16:05:18', NULL),
('7c2e70c5-8c9c-4327-a7e0-8808ffd88d13', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-09-22 17:09:05', '2023-09-22 17:09:05', NULL),
('7db6f5bb-1aea-4f2f-80f8-ce5792599752', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-09-21 20:34:15', '2023-09-21 20:34:15', NULL),
('7e383508-8c4a-487c-8477-73bd2b38b6f5', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-09-21 14:59:48', '2023-09-21 14:59:48', NULL),
('7f2e1c3b-2cbd-4b93-a1d6-0cdbd5a7d0b2', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-09-21 15:05:51', '2023-09-21 15:05:51', NULL),
('82551b4a-5e96-4f83-b820-71eefca02c97', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-09-21 14:47:39', '2023-09-21 14:47:39', NULL),
('82685496-2118-44fa-9d8c-b29c24e056b1', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-09-28 22:22:51', '2023-09-28 22:22:51', NULL),
('82b674be-67fb-4445-aed5-7b8540c69a76', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-09-20 18:24:59', '2023-09-20 18:24:59', NULL),
('831f76d0-4b27-4a7d-842b-5b3c6fe0350a', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-09-21 15:07:09', '2023-09-21 15:07:09', NULL),
('83457f7d-aa31-44cb-b7f7-2d6c77c1f55d', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-09-25 14:07:40', '2023-09-25 14:07:40', NULL),
('8434feaa-c6a2-4b27-a631-521ec9f049eb', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-08-28 16:08:20', '2023-08-28 16:08:20', NULL),
('84d1bcbf-32f8-4fa8-9d72-62cfeaafd6ce', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-09-21 15:26:05', '2023-09-21 15:26:05', NULL),
('84e69a73-1210-4c0d-b0e4-cb2ffa14f329', 'Juana Azurduy 1730', '', 'Nuñez', 1, '1429', '2023-07-17 13:42:50', '2023-07-17 13:42:50', NULL),
('85075ed3-e657-4106-a16b-a0e002366b8e', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-09-21 15:23:41', '2023-09-21 15:23:41', NULL),
('8672ddeb-c898-4391-8339-88274d945852', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-09-25 13:56:20', '2023-09-25 13:56:20', NULL),
('8e1a6dc0-330d-4cad-ab6a-17b20c6bc5c9', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-09-21 14:49:05', '2023-09-21 14:49:05', NULL),
('8fc54df2-1e59-4df7-9b47-0ebe52d498de', 'Av. Libertador 2222', '10A', 'Belgrano', 1, '1422', '2023-07-17 19:28:42', '2023-07-17 19:28:42', NULL),
('9174d63a-d832-4041-8baa-97f76e918c78', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-09-21 21:58:02', '2023-09-21 21:58:02', NULL),
('91d84b77-baeb-4251-9a4f-0ca79709fdbd', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-09-21 20:22:10', '2023-09-21 20:22:10', NULL),
('923e9daf-d0b6-4683-8e1d-39d9dc895514', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-09-25 15:19:09', '2023-09-25 15:19:09', NULL),
('926e529e-f5ff-4983-b9c7-35c522f80186', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-10-03 01:05:41', '2023-10-03 01:05:41', NULL),
('92a99815-8b60-4db1-8e81-458a48ec040e', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-09-25 15:06:55', '2023-09-25 15:06:55', NULL),
('93bd4b0e-0f2d-4567-bd88-ff7674fe310e', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-09-22 16:29:28', '2023-09-22 16:29:28', NULL),
('95b10173-939a-4a78-8c6c-c76951df008b', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-09-25 14:09:53', '2023-09-25 14:09:53', NULL),
('9d180357-d351-432e-a888-fcd8fbc5073c', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-09-28 22:05:55', '2023-09-28 22:05:55', NULL),
('9eb986d7-0d82-40e1-bacd-211c97329230', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-09-22 17:13:54', '2023-09-22 17:13:54', NULL),
('9efd180a-f190-40a8-a8eb-873b9ed609df', 'Juana Azurduy 1730', '', 'CABA', 2, '1429', '2023-08-22 22:55:39', '2023-08-22 22:55:39', NULL),
('9f0742ae-7c45-4d20-9c01-828f2f077a3a', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-09-21 20:43:36', '2023-09-21 20:43:36', NULL),
('a15db14e-8d64-4701-a8ba-34cd770c9b22', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-09-22 17:13:11', '2023-09-22 17:13:11', NULL),
('a5f1bf3c-d8db-4a93-bdbd-872a901c4dc0', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-09-21 20:46:09', '2023-09-21 20:46:09', NULL),
('a6545522-681c-4b88-8e6e-a999aa9f7054', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-09-25 15:07:32', '2023-09-25 15:07:32', NULL),
('a993d7ba-98d1-4dd4-a479-e6c83fa2b29f', 'Juana Azurduy 1730', '', 'Nuñez', 1, '1429', '2023-07-19 18:53:47', '2023-07-19 18:53:47', NULL),
('aa4e0f0a-e23f-4f6f-8814-3999d666841a', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-08-28 16:07:48', '2023-08-28 16:07:48', NULL),
('aa6034dd-7f5d-47f9-bd91-7c308161a541', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-09-20 19:22:44', '2023-09-20 19:22:44', NULL),
('abafcfd7-7925-4522-aa78-065de3da7f47', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-09-28 22:39:59', '2023-09-28 22:39:59', NULL),
('afb40d77-5392-4d8e-934d-833d86dab69e', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-09-21 20:27:34', '2023-09-21 20:27:34', NULL),
('b23272dc-e3bd-49e0-9487-6389cb474852', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-08-28 16:17:04', '2023-08-28 16:17:04', NULL),
('b46d0f75-9f43-4784-97ce-0327ac54fd09', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-09-20 18:23:00', '2023-09-20 18:23:00', NULL),
('b497876c-f2f1-47e7-b3dd-75e421c09a90', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-10-02 03:19:49', '2023-10-02 03:19:49', NULL),
('b70c1f18-1c74-4ab8-93bf-37e185712c13', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-10-01 15:50:35', '2023-10-01 15:50:35', NULL),
('b835e5d2-df3d-407d-a81d-40172c8c8543', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-09-21 14:16:32', '2023-09-21 14:16:32', NULL),
('b8b86ec6-7d2c-429a-b3cc-91aa61cc8c8c', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-09-25 15:34:22', '2023-09-25 15:34:22', NULL),
('b8d25a1a-16cd-4587-8040-a069b730e7d0', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-09-25 15:17:34', '2023-09-25 15:17:34', NULL),
('b9635622-d926-4fd3-aba5-0d9fd56eedce', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-10-02 13:10:41', '2023-10-02 13:10:41', NULL),
('b9964d38-cc70-440c-be12-8696ca449fdd', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-09-22 17:16:44', '2023-09-22 17:16:44', NULL),
('ba72c8c7-e693-468a-9979-af2ad6a04ac4', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-09-20 18:54:57', '2023-09-20 18:54:57', NULL),
('bb22b73f-34b0-4013-9a5b-4dff3f16fbe9', 'Juana Azurduy 1730', '', 'Nuñez', 1, '1429', '2023-07-17 19:16:57', '2023-07-17 19:16:57', NULL),
('bc631a0c-8684-4edb-92cd-2010b20f3808', 'Juana Azurduy 1730', '', 'Nuñez', 1, '1429', '2023-08-05 19:42:06', '2023-08-05 19:42:06', NULL),
('bdec0e96-5a12-4809-a9cc-7523ba96dfb0', 'Pepe 1234', '4a', 'CABA', 1, '111111', '2023-07-17 23:34:11', '2023-07-17 23:34:11', NULL),
('be128cc5-d41f-47da-a0a1-aadd458dd6c0', 'Juana Azurduy 1730', '', 'Nuñez', 1, '1429', '2023-07-19 14:31:34', '2023-07-19 14:31:34', NULL),
('be699dab-3691-4fb3-9dd4-3336c81aef27', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-09-21 20:16:08', '2023-09-21 20:16:08', NULL),
('bee01a2c-7715-494e-a287-cce042a48eb3', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-09-21 20:25:15', '2023-09-21 20:25:15', NULL),
('c1446cf1-4784-4d20-8292-5d8074a82cbc', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-09-28 22:03:06', '2023-09-28 22:03:06', NULL),
('c1d3b183-d659-46ec-a481-98e417597503', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-10-01 22:54:01', '2023-10-01 22:54:01', NULL),
('c2c08c4b-5220-4e7c-a453-e7472708a260', 'Conde 3229', '2A', 'Coghlan', 1, '1430', '2023-07-17 16:57:11', '2023-07-17 16:57:11', NULL),
('c328920c-0255-41f5-9aed-70817a974cb5', '1908 N 58th Way', '212', 'Hollywood', 1, '33021', '2023-07-25 12:01:51', '2023-07-25 12:01:51', NULL),
('c329584e-1d12-4340-ba69-61b3bac39e9e', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-09-21 15:28:04', '2023-09-21 15:28:04', NULL),
('c7443de8-ad63-4435-8d16-d947c4a98bdc', 'Juana Azurduy 1730', '', 'CABA', 2, '1429', '2023-08-22 22:47:47', '2023-08-22 22:47:47', NULL),
('c76e98d0-f5f5-4ff5-baa3-b67ddb67c806', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-09-21 21:11:58', '2023-09-21 21:11:58', NULL),
('cac08335-8b74-41d9-9d97-89755a46490d', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-09-28 22:33:45', '2023-09-28 22:33:45', NULL),
('cc1a3c25-eafd-4b1c-a019-f0cdad733f91', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-10-01 22:53:37', '2023-10-01 22:53:37', NULL),
('cf583bcf-3f43-4115-a77a-442e2b33c591', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-10-03 19:42:42', '2023-10-03 19:42:42', NULL),
('d05fc665-adc8-4ee0-83ae-8af937e87376', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-09-21 20:10:58', '2023-09-21 20:10:58', NULL),
('d3cac2a7-c798-4cdc-b5af-2d27936cdff9', 'Juana Azurduy 1730', '', 'Nuñez', 1, '1429', '2023-07-17 22:26:11', '2023-07-17 22:26:11', NULL),
('d4099a1b-eeb7-4308-a678-4ebc9288c71b', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-09-25 15:04:42', '2023-09-25 15:04:42', NULL),
('d56df0a8-253f-4c0c-aa44-d8054c031708', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-08-28 16:22:50', '2023-08-28 16:22:50', NULL),
('d5f91132-85b3-4abe-aa1f-60bc18101449', 'Juana Azurduy 1730', '12', 'Nuñez', 1, '1429', '2023-07-19 13:58:12', '2023-07-19 13:58:12', NULL),
('d9fcceda-23ae-47e8-8ac7-e689b58186c5', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-10-03 18:39:32', '2023-10-03 18:39:32', NULL),
('dc095bc6-d2dc-4b5c-9169-208acfa6cc62', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-09-21 20:11:32', '2023-09-21 20:11:32', NULL),
('dc36f020-4e0c-49bd-9dcd-6af2fa86912c', 'Conde 1730', '2', 'Koglan', 1, '1423', '2023-08-08 21:23:42', '2023-08-08 21:23:42', NULL),
('dc56ccf5-75be-4646-aff5-f45c3267460e', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-08-28 16:41:01', '2023-08-28 16:41:01', NULL),
('def4d8db-ddaa-42c6-bf8b-a1747fb9bf07', 'Juana Azurduy 1730', '12', 'Nuñez', 1, '1429', '2023-07-19 14:01:17', '2023-07-19 14:01:17', NULL),
('e18f594c-287d-4709-a4e7-fdbb85266f2c', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-10-02 23:34:41', '2023-10-02 23:34:41', NULL),
('e251ce76-5c50-491d-8730-f537558b3018', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-09-28 22:24:36', '2023-09-28 22:24:36', NULL),
('e4e21b9e-e5ad-4245-89f6-e5ba5733dc1b', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-09-22 17:07:30', '2023-09-22 17:07:30', NULL),
('e8c80a98-0cf8-4502-8f2a-481fa4d7d95f', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-10-02 23:34:11', '2023-10-02 23:34:11', NULL),
('eb2b038a-ccdd-450d-b14f-1d32551a3c73', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-09-21 22:01:43', '2023-09-21 22:01:43', NULL),
('eb3a97b4-ddb4-4ee4-af45-25f96c2c02cd', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-09-25 14:00:04', '2023-09-25 14:00:04', NULL),
('ecb08f61-6a87-48b8-bd87-60e0e2cd5679', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-09-21 20:29:20', '2023-09-21 20:29:20', NULL),
('eef923f7-ada6-44c0-a202-77496c2ba424', 'Juana Azurduy 1730', '', 'Nuñez', 1, '1429', '2023-08-05 19:44:17', '2023-08-05 19:44:17', NULL),
('ef57f05e-c09c-4fb1-ac62-40e47bb67a47', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-09-25 14:04:05', '2023-09-25 14:04:05', NULL),
('f00f3ac8-6762-45d2-840e-92364eecccec', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-09-25 13:59:22', '2023-09-25 13:59:22', NULL),
('f52d09ec-203f-4993-a026-21bc21f24b2a', 'Juana Azurduy 1730', '', 'Nuñez', 1, '1429', '2023-07-17 17:39:49', '2023-07-17 17:39:49', NULL),
('f7e49784-218f-4c8a-af5c-4fbe92c3bb90', 'Juana Azurduy 1730', '', 'Nuñez', 1, '1429', '2023-08-05 20:15:47', '2023-08-05 20:15:47', NULL),
('f966a34e-a310-4df7-b921-86b5e5f973c7', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-09-25 15:12:53', '2023-09-25 15:12:53', NULL),
('fa6a2a86-078f-4bdb-b447-aced6f8414a4', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-09-21 22:02:34', '2023-09-21 22:02:34', NULL),
('fae1291d-8083-4fd1-86bd-3f5dafc0c1ff', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-09-21 16:12:09', '2023-09-21 16:12:09', NULL),
('fe850fc7-da9d-44b1-aa77-36ef244ac2d5', 'Juana Azurduy 1730', NULL, 'CABA', 2, '1429', '2023-09-20 19:08:23', '2023-09-20 19:08:23', NULL),
('ff86f8f8-c7ad-497b-b631-0327fd88944b', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-08-28 16:20:00', '2023-08-28 16:20:00', NULL);

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
(25, 'La Verdadera Belleza Es Cuando Te Pones A Quien Realmente Sos💜', '<p>Este texto es de prueba. Un texto es una composición de signos codificados en un sistema de escritura que forma una unidad de sentido. También es una composición de caracteres imprimibles generados por un algoritmo de cifrado que, aunque no tienen sentido para cualquier persona, sí puede ser descifrado por su destinatario original</p>\n<p>Parrafo bien hecho Parrafo mal hecho.Un texto es una composición de signos codificados en un sistema de escritura que forma una unidad de sentido. También es una composición de caracteres imprimibles generados por un algoritmo de cifrado que, aunque no tienen sentido para cualquier persona, sí puede ser descifrado por su destinatario original</p>', 'Jano', '2023-08-08 01:35:45'),
(26, 'Blog de belleza facial', '<p>Bienvenidos a nuestro blog de belleza facial, donde exploraremos los secretos para lograr una piel radiante y saludable. La belleza facial es mucho más que una simple rutina de cuidado de la piel; es un reflejo de cómo nos cuidamos interna y externamente. Aquí, descubriremos los mejores consejos, productos y técnicas para mantener una tez luminosa y juvenil, sin importar la edad o el tipo de piel. Ya sea que estés luchando contra el acné, buscando la manera de reducir las arrugas o simplemente deseas mejorar la textura general de tu piel, estamos aquí para acompañarte en tu viaje hacia una belleza facial deslumbrante.</p>\n<p>Una piel sana y hermosa es el lienzo perfecto para cualquier look de maquillaje y, más importante aún, es una señal de una buena salud. En nuestro blog, nos centraremos en los pilares fundamentales del cuidado de la piel, que incluyen la limpieza adecuada, la hidratación, la protección solar y el uso de ingredientes beneficiosos. Aprenderás a adaptar tu rutina según las necesidades únicas de tu piel, ya sea que tengas piel seca, grasa, mixta o sensible. Además, compartiremos recetas caseras de mascarillas y tratamientos naturales para aquellos que prefieren una opción más orgánica. Recuerda, invertir tiempo y dedicación en tu piel hoy es la clave para mantener una apariencia juvenil y saludable en el futuro.</p>\n<p>En nuestro blog de belleza facial, nos mantendremos actualizados sobre las últimas tendencias y avances en el mundo de la cosmética y la belleza. Exploraremos los productos y tratamientos más novedosos, desde serums con ingredientes revolucionarios hasta técnicas de rejuvenecimiento facial no invasivas. Nuestro objetivo es brindarte información detallada y honesta para que puedas tomar decisiones informadas sobre qué productos y procedimientos son los más adecuados para ti. Además, te proporcionaremos consejos de maquillaje que realzarán tus rasgos y complementarán tu piel radiante. Únete a nosotros en este emocionante viaje hacia una belleza facial excepcional, ¡estamos ansiosos por compartir contigo nuestros conocimientos y pasión por el cuidado de la piel!</p>', 'Jano Pereira', '2023-08-08 15:52:29'),
(27, 'Blog de vinos', '<p>¡Bienvenidos a nuestro apasionante blog dedicado al mundo del vino! Aquí, nos sumergiremos en el fascinante universo de los sabores, aromas y culturas que rodean esta sublime bebida. El vino es mucho más que una simple bebida alcohólica; es un arte, una tradición milenaria y una experiencia sensorial única. A través de nuestras publicaciones, te llevaremos a explorar las diversas regiones vinícolas, variedades de uvas, técnicas de elaboración y maridajes perfectos. Ya seas un aficionado curioso o un conocedor apasionado, estamos aquí para compartir nuestro amor por el vino y enriquecer tu comprensión de este elixir que ha cautivado a la humanidad durante siglos.</p>\n<p>Embárcate en un viaje inolvidable mientras recorremos las prestigiosas regiones vinícolas de todo el mundo. Desde los exquisitos vinos tintos de Burdeos hasta los elegantes espumosos de la región de Champagne en Francia, pasando por los robustos Malbecs de Argentina y los refinados Chardonnays de California, exploraremos los secretos de cada lugar y sus vinos distintivos. Conoceremos a los apasionados viticultores y enólogos que trabajan incansablemente para crear estos líquidos tesoros, y aprenderemos sobre las técnicas y tradiciones que hacen que cada vino sea único. Descubriremos cómo el terroir, el clima y la vendimia influyen en el carácter de cada botella, y te ayudaremos a elegir el vino perfecto para cada ocasión.</p>\n<p>En nuestro blog de vinos, te llevaremos a través de emocionantes catas para afinar tu paladar y aprender a apreciar las sutilezas de diferentes cepas y añadas. Te guiaremos en la elección de copas adecuadas, la temperatura ideal para servir cada tipo de vino y los elementos clave para organizar una cata memorable. Además, descubriremos el emocionante arte del maridaje, combinando sabores y texturas para realzar tanto el vino como la comida. Desde maridajes clásicos hasta combinaciones más atrevidas, te inspiraremos para llevar tus experiencias gastronómicas al siguiente nivel. Así que, si eres un entusiasta del vino o simplemente deseas aprender más sobre esta bebida fascinante, te invitamos a compartir con nosotros la pasión por el mundo del vino. ¡Salud!</p>', 'Jano Pereira Kent', '2023-08-10 17:13:48'),
(28, 'El Transito', '<p>Bienvenidos a nuestro blog dedicado al apasionante y a veces desafiante mundo del tránsito. En esta plataforma, exploraremos diversos aspectos relacionados con la movilidad urbana, la seguridad vial, las tendencias en transporte y cómo enfrentar los desafíos del tráfico en nuestras ciudades. El tránsito es una parte esencial de la vida diaria, y entender su dinámica nos permite tomar decisiones más informadas para mejorar nuestros desplazamientos y contribuir a la construcción de ciudades más amigables, eficientes y sostenibles. Únete a nosotros en esta travesía para descubrir soluciones innovadoras, consejos prácticos y reflexiones sobre el presente y futuro del tráfico.</p>\n<p>El crecimiento poblacional y la urbanización plantean desafíos significativos en materia de movilidad urbana. En nuestro blog, analizaremos las diversas opciones de transporte disponibles, desde sistemas de transporte público hasta alternativas de movilidad sostenible, como bicicletas eléctricas y scooters compartidos. Exploraremos cómo el diseño de infraestructuras, como carriles exclusivos y calles peatonales, puede mejorar el flujo del tránsito y promover una convivencia armoniosa entre peatones, ciclistas y automovilistas. También examinaremos iniciativas innovadoras y tecnológicas, como la movilidad autónoma y el uso de aplicaciones para compartir viajes, que están transformando la forma en que nos desplazamos por nuestras ciudades.</p>\n<p>La seguridad vial es una preocupación crucial en el contexto del tráfico y la movilidad. En nuestro blog, nos enfocaremos en la importancia de la educación para conductores y peatones, resaltando la necesidad de fomentar el respeto por las normas de tránsito y la conciencia de los riesgos asociados con comportamientos imprudentes. Abordaremos temas como la conducción defensiva, el respeto a los límites de velocidad y el uso responsable del teléfono móvil mientras se conduce. Además, destacaremos la relevancia de la planificación y el diseño de infraestructuras seguras, así como el papel de las tecnologías de asistencia en la prevención de accidentes de tráfico. Juntos, trabajaremos para promover una cultura vial responsable y forjar un entorno de tránsito más seguro y armonioso para todos.</p>', 'Ines Anio', '2023-08-08 15:58:06');

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
(138, 'blog-6r36znk0ov.mp4', 25, 0, 2),
(143, 'blog-3g1mgv40fo.webp', 26, 0, 1),
(144, 'blog-uyvkonll7f.webp', 26, 1, 1),
(145, 'blog-kw1nckrhhe.webp', 26, 0, 1),
(146, 'blog-121lo7pczp.mp4', 26, 0, 2),
(148, 'blog-cqp0mi7wrd.webp', 27, 1, 1),
(149, 'blog-8derw15me1.webp', 27, 0, 1),
(150, 'blog-ewcpeqe9ah.mp4', 27, 0, 2),
(151, 'blog-1bah05kudu.webp', 28, 0, 1),
(152, 'blog-qfuzu23war.webp', 28, 1, 1),
(153, 'blog-sfsz82por2.webp', 28, 0, 1),
(154, 'blog-fkhvwvo2wh.mp4', 28, 0, 2),
(160, 'blog-kfwqahrm0k.webp', 27, 0, 1);

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
  `position` int(11) DEFAULT NULL,
  `label` text DEFAULT NULL,
  `device_types_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `home_files`
--

INSERT INTO `home_files` (`id`, `filename`, `file_types_id`, `home_sections_id`, `position`, `label`, `device_types_id`) VALUES
(1, 'homeFile-iorzvfl0nt.mp4', 2, 1, NULL, NULL, NULL),
(2, '4zvsp2yino.webp', 1, 2, 1, NULL, NULL),
(3, 'homeFile-o18xxj9w9u.jpg', 1, 2, 2, NULL, NULL),
(4, 'nose.jpg', 1, 2, 3, NULL, NULL),
(5, 'homeFile-yyxix3xbzf.jpg', 1, 2, 4, NULL, NULL),
(6, 'hair.jpg', 1, 2, 5, NULL, NULL),
(7, 'homeFilejlxqhb7na3.webp', 1, 3, 1, NULL, NULL),
(8, 'ig2.jpeg', 1, 3, 2, NULL, NULL),
(9, 'homeFile-wjeym5q0gi.jpeg', 1, 3, 3, NULL, NULL),
(10, 'ig4.jpeg', 1, 3, 4, NULL, NULL),
(11, 'ig5.jpeg', 1, 3, 5, NULL, NULL),
(12, 'homeFile-qly531ubu8.avif', 1, 4, NULL, NULL, NULL),
(13, 'galletyPhoto-mjpl80z86z.webp', 1, 5, NULL, NULL, NULL),
(14, 'galletyPhoto-3bd2rehhhk.webp', 1, 5, NULL, NULL, NULL),
(15, 'galletyPhoto-659bdxmhp1.webp', 1, 5, NULL, NULL, NULL),
(16, 'galletyPhoto-b9cv0fbf64.webp', 1, 5, NULL, NULL, NULL),
(17, 'galletyPhoto-ohl9dfo1x9.webp', 1, 5, NULL, NULL, NULL),
(18, 'galletyPhoto-jrsap05nrw.webp', 1, 5, 1, NULL, NULL),
(20, 'galletyPhoto-iaseb9yvsd.webp', 1, 5, NULL, NULL, NULL),
(22, 'galletyPhoto-7yaspob7f2.webp', 1, 5, NULL, NULL, NULL),
(25, 'galletyPhoto-sbwvmjwj37.webp', 1, 5, NULL, NULL, NULL),
(28, 'galletyPhoto-yixqo5gun7.webp', 1, 5, NULL, NULL, NULL),
(29, 'galletyPhoto-v58nbp0x7w.webp', 1, 5, NULL, NULL, NULL),
(32, 'galletyPhoto-6o0oh3etzd.webp', 1, 5, NULL, NULL, NULL),
(33, NULL, NULL, 6, NULL, 'CYBER MONDAY', NULL);

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
(5, 'product_gallery'),
(6, 'discount_banner');

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
  `deletedAt` timestamp NULL DEFAULT NULL,
  `pending_payment_date` timestamp NULL DEFAULT NULL,
  `is_pending_payment_expired` tinyint(4) DEFAULT NULL,
  `details` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `orders`
--

INSERT INTO `orders` (`id`, `tra_id`, `users_id`, `shipping_addresses_id`, `billing_addresses_id`, `is_same_address`, `total`, `order_status_id`, `order_types_id`, `payment_methods_id`, `date`, `billing_name`, `billing_email`, `billing_phone`, `billing_id`, `createdAt`, `updatedAt`, `deletedAt`, `pending_payment_date`, `is_pending_payment_expired`, `details`) VALUES
('02a7e9b0-8a77-4cc1-a7d4-31dbc0aa67b9', '1692744640123-u4lzaldcm1', NULL, NULL, '4c275412-9807-4875-a450-aedaf7431ac3', 0, 30700, 4, 2, 1, '2023-08-22 22:50:40', 'Jonat Kent', 'janoo.pereira@gmail.com', '+5412211212', '12211212', '2023-08-22 22:50:40', '2023-08-22 22:50:40', NULL, NULL, NULL, NULL),
('03228abd-4443-4f40-8391-395070ed0db6', '1695654773982-9w2cydl1lf', '10', NULL, 'f966a34e-a310-4df7-b921-86b5e5f973c7', 0, 8700, 3, 2, 2, '2023-09-25 15:12:53', 'Jano Pereira Kent', 'janoo.pereira@gmail.com', '+5401158817312', '12122112', '2023-09-25 15:12:53', '2023-09-25 15:12:53', NULL, NULL, NULL, NULL),
('05590144-cb8d-41b4-a385-d4b6f93894ff', '1691264503772-554fta47yu', '10', NULL, '6183530e-3fc9-46c1-b089-8724e54ec5bd', 0, 48222, 1, 2, 1, '2023-08-05 19:41:43', 'Jano Pereira Kent', 'janoo.pereira@gmail.com', '+5401158817312', '212212121', '2023-08-05 19:41:43', '2023-08-05 19:41:43', NULL, NULL, NULL, NULL),
('0f930489-cb90-4f5e-9afe-085abed52c8f', '1695655400422-cayrfdfsym', '10', NULL, '1c8b6d7d-dc86-4fed-ad41-a499708c1292', 0, 15660, 3, 2, 2, '2023-09-25 15:23:20', 'Jano Pereira Kent', 'janoo.pereira@gmail.com', '+5401158817312', '12122112', '2023-09-25 15:23:20', '2023-09-25 15:23:20', NULL, NULL, NULL, NULL),
('12de16a6-6c7b-465e-bb95-ea8a8dd9f73e', '1695654929132-phic2sc0el', '10', NULL, '24eb628e-0d2a-4374-a897-2ebccb7247bd', 0, 10440, 3, 2, 2, '2023-09-25 15:15:29', 'Jano Kent', 'janoo.pereira@gmail.com', '+5412212112', '21212112', '2023-09-25 15:15:29', '2023-09-25 15:15:29', NULL, NULL, NULL, NULL),
('12f8afa6-8307-40fd-bb76-cddaa72b4182', '1695650770730-sdi10qwjaf', '10', NULL, '513f6d92-c307-44e5-8fbd-c886d0a62802', 0, 1740, 3, 2, 2, '2023-09-25 14:06:10', 'Jano Pereira Kent', 'janoo.pereira@gmail.com', '+5401158817312', '12122112', '2023-09-25 14:06:10', '2023-09-25 14:06:10', NULL, NULL, NULL, NULL),
('147ad2ad-dbd8-4572-af9d-b9117b5dfa82', '1695654690347-sh3m15rtyf', '10', NULL, '318a0711-7249-4408-95e4-2f40ba829fe9', 0, 8700, 3, 2, 2, '2023-09-25 15:11:30', 'Jano Pereira Kent', 'janoo.pereira@gmail.com', '+5401158817312', '12122112', '2023-09-25 15:11:30', '2023-09-25 15:11:30', NULL, NULL, NULL, NULL),
('164380d8-2c30-4181-973f-35774d71a8ab', '1692744467543-7x13hktz07', NULL, NULL, 'c7443de8-ad63-4435-8d16-d947c4a98bdc', 0, 30700, 4, 2, 1, '2023-08-22 22:47:47', 'Juan Pascakl', 'janoo.pereira@gmail.com', '+5401158817312', '12121212', '2023-08-22 22:47:47', '2023-08-22 22:47:47', NULL, NULL, NULL, NULL),
('1a356f0e-fff8-4fb2-950b-9bd5dfdd6bb4', '1695654570790-c5c6l6nbpu', '10', NULL, '20694b46-a47e-4b49-a72e-4dc8973e4ee4', 0, 10440, 3, 2, 2, '2023-09-25 15:09:30', 'Jano Pereira Kent', 'janoo.pereira@gmail.com', '+5401158817312', '12122112', '2023-09-25 15:09:30', '2023-09-25 15:09:30', NULL, NULL, NULL, NULL),
('1bbc68f2-6cf4-4148-b4f8-9cab0259c3e3', '1695403004422-y9my89krcj', '10', NULL, 'b9964d38-cc70-440c-be12-8696ca449fdd', 1, 26000, 3, 1, 2, '2023-09-22 17:16:44', 'Jano Kent', 'janoo.pereira@gmail.com', '+5412211212', '12122121', '2023-09-22 17:16:44', '2023-09-22 17:16:44', NULL, NULL, NULL, NULL),
('1d13fb1f-b0b5-47ff-9456-94c89edbb786', '1695654487613-v8gp6cgs50', '10', NULL, '710da430-f70c-48c9-8822-69177c183c8c', 0, 10440, 3, 2, 2, '2023-09-25 15:08:07', 'Jano Pereira Kent', 'janoo.pereira@gmail.com', '+5401158817312', '12122112', '2023-09-25 15:08:07', '2023-09-25 15:08:07', NULL, NULL, NULL, NULL),
('1e96892c-08fb-41ad-84d6-c09a2c56e71b', '1696200841888-oq09if97x5', NULL, NULL, 'c1d3b183-d659-46ec-a481-98e417597503', 0, 1740, 5, 2, 2, '2023-10-01 22:54:01', 'Jano Kent', 'janoo.pereira@gmail.com', '+542111111', '21121212', '2023-10-01 22:54:01', '2023-10-03 18:45:28', NULL, NULL, NULL, 'Anulada por stock insuficiente'),
('21ce4bcf-c9f2-43bd-9035-c4dbcb69c419', '1695650912009-f0tccz9l38', '10', NULL, '6e3b5fce-4b02-4906-a547-b5c9fe378109', 0, 1740, 3, 2, 2, '2023-09-25 14:08:32', 'Jano Pereira Kent', 'janoo.pereira@gmail.com', '+5401158817312', '12122112', '2023-09-25 14:08:32', '2023-09-25 14:08:32', NULL, NULL, NULL, NULL),
('2ae38b2c-42c8-4cf6-ab29-91ebce417edc', '1695403204959-m2b9shqml6', '10', NULL, '13df2a07-f261-4ef2-9a96-b8aa50ad4951', 0, 26000, 3, 2, 2, '2023-09-22 17:20:04', 'Jano Kent', 'janoo.pereira@gmail.com', '+5412211212', '12122121', '2023-09-22 17:20:04', '2023-09-22 17:20:04', NULL, NULL, NULL, NULL),
('2b843690-b382-4d8d-b4b1-f8585eac3985', '1696292364139-2z0f7wkmq9', '10', NULL, '148c138a-50fd-4a90-86ff-dc56a0703274', 0, 15000, 5, 2, 2, '2023-10-03 00:19:24', 'Jano Pereira Kent', 'janoo.pereira@gmail.com', '+5401158817312', '12212121', '2023-10-03 00:19:24', '2023-10-03 00:35:00', NULL, '2023-10-03 00:19:24', 1, 'Compra anulada por vencimiento de pago'),
('2db95889-2f6a-4ca4-8aa6-8ba61ff3eb39', '1695938586484-0usf1rzql0', NULL, NULL, 'c1446cf1-4784-4d20-8292-5d8074a82cbc', 0, 189220, 7, 2, 2, '2023-09-28 22:03:06', 'Jano Kent', 'janoo.pereira@gmail.com', '+541132312123', '43083507', '2023-09-28 22:03:06', '2023-09-28 22:05:40', NULL, NULL, NULL, NULL),
('31769eab-989a-47e1-b59f-4885b51efafb', '1696289681255-0my23xt8gv', '10', NULL, 'e18f594c-287d-4709-a4e7-fdbb85266f2c', 0, 15000, 3, 2, 2, '2023-10-02 23:34:41', 'Jano Pereira Kent', 'janoo.pereira@gmail.com', '+5401158817312', '12212121', '2023-10-02 23:34:41', '2023-10-02 23:34:41', NULL, '2023-10-02 23:34:41', NULL, NULL),
('34b760d5-23cc-4aef-aeef-359cc2c3f1e1', '1696173102446-6a2t5r0e3u', '10', '2be1e035-196a-4762-9252-8b0b690f279f', '1f3c278a-8690-46eb-a6e2-9f438f4d7169', 0, 98960, 2, 1, 2, '2023-10-01 15:11:42', 'Jano Kent', 'janoo.pereira@gmail.com', '+541212212112', '6666666', '2023-10-01 15:11:42', '2023-10-01 15:12:26', NULL, NULL, NULL, 'Mastercard Crédito  **0015'),
('3770d155-c320-4c32-a5e2-a3eb4f27b0ad', '1695650993688-0pusugjzys', '10', NULL, '95b10173-939a-4a78-8c6c-c76951df008b', 0, 6960, 1, 2, 2, '2023-09-25 14:09:53', 'Jano Pereira Kent', 'janoo.pereira@gmail.com', '+5401158817312', '12122112', '2023-09-25 14:09:53', '2023-09-25 14:10:01', NULL, NULL, NULL, NULL),
('3bb6cfb3-c02f-45aa-bcc2-518581e6741d', '1696358372517-zr7lde7gtk', '10', NULL, 'd9fcceda-23ae-47e8-8ac7-e689b58186c5', 0, 15000, 5, 2, 2, '2023-10-03 18:39:32', 'Jano Kent', 'janoo.pereira@gmail.com', '+5422222', '122121212', '2023-10-03 18:39:32', '2023-10-03 19:42:28', NULL, NULL, NULL, NULL),
('3bdc1f1e-a166-4537-9cad-b11cd9cec325', '1696216789156-5oiqb7irsp', NULL, NULL, 'b497876c-f2f1-47e7-b3dd-75e421c09a90', 0, 1740, 5, 2, 2, '2023-10-02 03:19:49', 'Jano Pereira Kent', 'janoo.pereira@gmail.com', '+5401158817312', '21212112', '2023-10-02 03:19:49', '2023-10-02 23:05:32', NULL, NULL, NULL, NULL),
('3e3b280f-2e77-4fda-82d0-144b083b0d00', '1696217017218-rqar3ohx3h', NULL, NULL, '673c605c-e137-4180-858b-de74894cd554', 0, 1740, 6, 2, 2, '2023-10-02 03:23:37', 'Jano Pereira Kent', 'janoo.pereira@gmail.com', '+5401158817312', '21212121', '2023-10-02 03:23:37', '2023-10-02 03:26:29', NULL, NULL, NULL, 'Mastercard Crédito **0015'),
('3e8e576d-bb39-4850-a655-6cf0ab5ddada', '1693240301355-t3lywjchjr', '10', NULL, '77ecbbfa-c87e-44e9-92e9-9de26f58b72b', 1, 8000, 4, 1, 1, '2023-08-28 16:31:41', 'Misma  Direccion', 'janoo.pereira@gmail.com', '+5401158817312', '22121112', '2023-08-28 16:31:41', '2023-08-28 16:31:41', NULL, NULL, NULL, NULL),
('3f4d30d2-2298-41ac-bff3-b288af55edc1', '1695650731376-0gzr1o0tvr', '10', NULL, '40f5e07b-ec66-4848-95a8-b77424076428', 0, 1740, 3, 2, 2, '2023-09-25 14:05:31', 'Jano Pereira Kent', 'janoo.pereira@gmail.com', '+5401158817312', '12122112', '2023-09-25 14:05:31', '2023-09-25 14:05:31', NULL, NULL, NULL, NULL),
('3fba444f-b2e4-4253-a3f0-1936c151f1ae', '1691264921121-mru84pn26n', '10', NULL, '66f381f2-de82-41ea-a38f-7cfb102fe3df', 0, 88222, 5, 2, 1, '2023-08-05 19:48:41', 'Jano Pereira Kent', 'janoo.pereira@gmail.com', '+5401158817312', '12212121', '2023-08-05 19:48:41', '2023-08-05 19:48:41', NULL, NULL, NULL, NULL),
('41c3d4ff-9f2a-4534-9d38-aba6f791ec3f', '1693238513555-l998p2e2z4', '10', NULL, '41e9ba01-9907-4dac-9734-cfe849b2094c', 0, 25000, 4, 1, 1, '2023-08-28 16:01:53', 'Prueba Direccion', 'janoo.pereira@gmail.com', '+5401158817312', '12212121', '2023-08-28 16:01:53', '2023-08-28 16:01:53', NULL, NULL, NULL, NULL),
('4af4b51c-c9ab-4b3e-a849-9d47e498bf4b', '1691264966112-rm99oa9591', '10', NULL, '15097bce-f867-466b-8011-a2a49905bcc0', 0, 88222, 2, 2, 1, '2023-08-05 19:49:26', 'Jano Pereira Kent', 'janoo.pereira@gmail.com', '+5401158817312', '12212121', '2023-08-05 19:49:26', '2023-08-05 19:59:18', NULL, NULL, NULL, NULL),
('4bca66b7-89c1-4749-b419-098a2db120da', '1693239600058-u30kc3li6p', '10', 'b10745d1-6a13-4fe2-87cc-72f5a101f159', 'ff86f8f8-c7ad-497b-b631-0327fd88944b', 0, 23000, 4, 1, 1, '2023-08-28 16:20:00', 'Direccion Jerno', 'janoo.pereira@gmail.com', '+5401158817312', '21211212', '2023-08-28 16:20:00', '2023-08-28 16:20:00', NULL, NULL, NULL, NULL),
('573c5aaa-0554-41c1-b3db-ae6632143c03', '1695400712980-62orpzxy1j', '10', NULL, '38004a15-ebaa-4596-ad09-ebc019eff909', 0, 26000, 3, 2, 2, '2023-09-22 16:38:32', 'Jano Kent', 'janoo.pereira@gmail.com', '+5421211221', '12212121', '2023-09-22 16:38:32', '2023-09-22 16:38:32', NULL, NULL, NULL, NULL),
('57426d78-cded-4dab-bc3b-9c8381d0d104', '1695650645706-9sv872eg3l', '10', NULL, 'ef57f05e-c09c-4fb1-ac62-40e47bb67a47', 0, 1740, 3, 2, 2, '2023-09-25 14:04:05', 'Jano Pereira Kent', 'janoo.pereira@gmail.com', '+5401158817312', '12122112', '2023-09-25 14:04:05', '2023-09-25 14:04:05', NULL, NULL, NULL, NULL),
('594918f1-9dbe-4502-8d5d-3a21e853bd3d', '1696252367279-hv8okuppv8', '10', NULL, '6376f0db-4174-4779-891f-5aa73247f39c', 0, 15000, 1, 2, 2, '2023-10-02 13:12:47', 'Jano Kent', 'janoo.pereira@gmail.com', '+5422222222', '21121212', '2023-10-02 13:12:47', '2023-10-02 22:56:24', NULL, NULL, NULL, 'Cabál Crédito **0008'),
('596cc1db-1091-407e-8e06-77cde7747cf8', '1696252241270-cuuwqw6go9', '10', NULL, 'b9635622-d926-4fd3-aba5-0d9fd56eedce', 1, 28220, 1, 1, 2, '2023-10-02 13:10:41', 'Jano Kent', 'janoo.pereira@gmail.com', '+1 24611111111', '9999999', '2023-10-02 13:10:41', '2023-10-02 22:56:40', NULL, NULL, NULL, 'Mastercard Crédito **0015'),
('5b236ed8-75d4-42de-91c4-a11405eeb141', '1691266547618-iij4n8sl7h', '10', NULL, 'f7e49784-218f-4c8a-af5c-4fbe92c3bb90', 1, 26000, 1, 1, 1, '2023-08-05 20:15:47', 'Jano Pereira Kent', 'janoo.pereira@gmail.com', '+5401158817312', '21212112', '2023-08-05 20:15:47', '2023-08-05 20:15:47', NULL, NULL, NULL, NULL),
('5de5cfc2-4711-4dc7-94b6-65f560239dec', '1693238900986-vz8zj0r84r', '10', NULL, '8434feaa-c6a2-4b27-a631-521ec9f049eb', 0, 25000, 4, 1, 1, '2023-08-28 16:08:20', 'Prueba Direccion', 'janoo.pereira@gmail.com', '+5401158817312', '12212121', '2023-08-28 16:08:20', '2023-08-28 16:08:20', NULL, NULL, NULL, NULL),
('69420a40-cacb-47de-9040-a3bbc8240957', '1692914196007-csxqumzyvt', '10', '564f158e-0cfa-4a02-ba82-dda1b5ce99fb', '3a5587ee-e039-404f-a0d4-76d5b987cd87', 0, 103500, 4, 1, 1, '2023-08-24 21:56:36', 'Valentina Kent', 'janoo.pereira@gmail.com', '+541221212121', '12212121', '2023-08-24 21:56:36', '2023-08-24 21:56:36', NULL, NULL, NULL, NULL),
('763cc76a-3949-4ce8-be11-119e1132cc78', '1695399563205-paj20y3yqn', '10', '399e95d1-5ef1-42ed-b8d2-1adce5317fae', '5b875db7-4ba9-4446-9420-8a1e0e28912d', 0, 15000, 3, 1, 2, '2023-09-22 16:19:23', 'Jano Pereira Kent', 'janoo.pereira@gmail.com', '+5401158817312', '12212121', '2023-09-22 16:19:23', '2023-09-22 16:19:23', NULL, NULL, NULL, NULL),
('76d5138a-d111-4c72-b864-9184367d751d', '1695654415483-79mxvqfnpa', '10', NULL, '92a99815-8b60-4db1-8e81-458a48ec040e', 0, 6960, 3, 2, 2, '2023-09-25 15:06:55', 'Jano Pereira Kent', 'janoo.pereira@gmail.com', '+5401158817312', '12211212', '2023-09-25 15:06:55', '2023-09-25 15:06:55', NULL, NULL, NULL, NULL),
('7b4e08aa-5a43-4675-9cf1-46d37900a163', '1695938755008-y1jjgkru57', NULL, NULL, '9d180357-d351-432e-a888-fcd8fbc5073c', 0, 24740, 6, 2, 2, '2023-09-28 22:05:55', 'Jano Pereira Kent', 'janoo.pereira@gmail.com', '+5401158817312', '43083507', '2023-09-28 22:05:55', '2023-09-28 22:06:34', NULL, NULL, NULL, NULL),
('7e2239f3-3411-41a9-9e3b-51ab66682f20', '1693238718802-a6c6mu9l8d', '10', NULL, '7be98597-2e1c-402b-a89c-df32424375f8', 0, 25000, 4, 1, 1, '2023-08-28 16:05:18', 'Prueba Direccion', 'janoo.pereira@gmail.com', '+5401158817312', '12212121', '2023-08-28 16:05:18', '2023-08-28 16:05:18', NULL, NULL, NULL, NULL),
('8195143a-45f0-4554-b077-a20c4a059cec', '1691264526020-9yrisv0b2i', '10', NULL, 'bc631a0c-8684-4edb-92cd-2010b20f3808', 0, 88222, 4, 2, 1, '2023-08-05 19:42:06', 'Jano Pereira Kent', 'janoo.pereira@gmail.com', '+5401158817312', '12212121', '2023-08-05 19:42:06', '2023-08-05 19:42:06', NULL, NULL, NULL, NULL),
('88aa19cc-130b-4f48-8f7c-f57ff6fb14cd', '1695333754517-1qj6m3wc4y', NULL, NULL, 'fa6a2a86-078f-4bdb-b447-aced6f8414a4', 0, 17000, 3, 2, 2, '2023-09-21 22:02:34', 'Jano Kent', 'janoo.pereira@gmail.com', '+5421212112', '2222112', '2023-09-21 22:02:34', '2023-09-21 22:02:34', NULL, NULL, NULL, NULL),
('898b8246-d996-4a92-85b0-4bbc90f58362', '1695402545102-ovmushultx', '10', NULL, '7c2e70c5-8c9c-4327-a7e0-8808ffd88d13', 0, 26000, 3, 2, 2, '2023-09-22 17:09:05', 'Jano Pereira Kent', 'janoo.pereira@gmail.com', '+5401158817312', '21122112', '2023-09-22 17:09:05', '2023-09-22 17:09:05', NULL, NULL, NULL, NULL),
('8be753c5-d853-4563-ae7b-c4d5c91cd702', '1695333703244-9mhnso66kn', NULL, NULL, 'eb2b038a-ccdd-450d-b14f-1d32551a3c73', 0, 17000, 3, 2, 2, '2023-09-21 22:01:43', 'Jano Pereira Kent', 'janoo.pereira@gmail.com', '+5401158817312', '12212121', '2023-09-21 22:01:43', '2023-09-21 22:01:43', NULL, NULL, NULL, NULL),
('9159dab4-5100-4c0e-878f-35f80cb386aa', '1692744545133-f2ocvr0yz7', NULL, NULL, '10d706fd-85d9-409d-8f53-691b9385b883', 0, 30700, 4, 2, 1, '2023-08-22 22:49:05', 'Jonas Pele', 'janoo.pereira@gmail.com', '+5401158817312', '12212121', '2023-08-22 22:49:05', '2023-08-22 22:49:05', NULL, NULL, NULL, NULL),
('92146667-02f7-4fed-ab4a-9d7a4ab2f919', '1695333548962-s0n2a6maw4', NULL, NULL, '3195f951-03ad-4747-89c1-0285821ef1bf', 0, 17000, 3, 2, 2, '2023-09-21 21:59:08', 'Jano Pereira Kent', 'janoo.pereira@gmail.com', '+5401158817312', '12212121', '2023-09-21 21:59:08', '2023-09-21 21:59:08', NULL, NULL, NULL, NULL),
('92e1cc08-3992-44fa-8039-c8027de0eff2', '1692745036802-560dgqv3ho', NULL, NULL, '1b5e6c28-2cc8-410e-b86a-8ed848e566a4', 0, 20700, 4, 2, 1, '2023-08-22 22:57:16', 'Jano Pereira Kent', 'janoo.pereira@gmail.com', '+5401158817312', '12211212', '2023-08-22 22:57:16', '2023-08-22 22:57:16', NULL, NULL, NULL, NULL),
('9564ee1d-b66e-4ab1-bd66-f669a931f8fe', '1695655054254-vjrdfdsjrm', '10', NULL, 'b8d25a1a-16cd-4587-8040-a069b730e7d0', 0, 3480, 3, 2, 2, '2023-09-25 15:17:34', 'Jano Pereira Kent', 'janoo.pereira@gmail.com', '+5401158817312', '21211212', '2023-09-25 15:17:34', '2023-09-25 15:17:34', NULL, NULL, NULL, NULL),
('95bd8a0b-dcd5-4fe9-aa06-c15d73153735', '1696289651516-e840vd85w6', '10', NULL, 'e8c80a98-0cf8-4502-8f2a-481fa4d7d95f', 0, 15000, 3, 2, 2, '2023-10-02 23:34:11', 'Jano Pereira Kent', 'janoo.pereira@gmail.com', '+5401158817312', '22212121', '2023-10-02 23:34:11', '2023-10-02 23:34:11', NULL, '2023-10-02 23:34:11', NULL, NULL),
('9e3cb10d-c760-4722-8d29-3e97148cb8f5', '1691264760323-ocxvhyskey', '10', NULL, '5345aa85-682b-4c2c-b908-84107d3914bf', 0, 88222, 4, 2, 1, '2023-08-05 19:46:00', 'Jano Pereira Kent', 'janoo.pereira@gmail.com', '+5401158817312', '12212121', '2023-08-05 19:46:00', '2023-08-05 19:46:00', NULL, NULL, NULL, NULL),
('a016e944-637d-4596-ab05-a512fe51a4af', '1692744939896-10ghnrcl45', NULL, NULL, '9efd180a-f190-40a8-a8eb-873b9ed609df', 0, 20700, 4, 2, 1, '2023-08-22 22:55:39', 'Shole Kent', 'janoo.pereira@gmail.com', '+5412212121', '21212112', '2023-08-22 22:55:39', '2023-08-22 22:55:39', NULL, NULL, NULL, NULL),
('a096e365-e966-4505-8531-43707f7b4ab5', '1693238087828-n4iebx8o1q', '10', NULL, '439d2fe4-b684-4f6a-9274-d83fd1ce3419', 0, 144000, 4, 1, 1, '2023-08-28 15:54:47', 'Jano Pereira Kent', 'janoo.pereira@gmail.com', '+5401158817312', '3333232', '2023-08-28 15:54:47', '2023-08-28 15:54:47', NULL, NULL, NULL, NULL),
('a3a73685-3faa-4f65-ac05-5deca7b77f2a', '1692913578725-473zgr4ntc', '10', NULL, '52d09dde-bbe7-4fa5-9ad0-fad014cb972a', 1, 22700, 4, 1, 1, '2023-08-24 21:46:18', 'Valentina Pereira Kent', 'janoo.pereira@gmail.com', '+5401158817312', '12212112', '2023-08-24 21:46:18', '2023-08-24 21:46:18', NULL, NULL, NULL, NULL),
('abcc024b-2609-44aa-817b-c035431b63b2', '1693238684617-zwqx9vkk4y', '10', NULL, '26d8ae84-af45-4397-8275-100e240d03bc', 0, 25000, 4, 1, 1, '2023-08-28 16:04:44', 'Prueba Direccion', 'janoo.pereira@gmail.com', '+5401158817312', '12212121', '2023-08-28 16:04:44', '2023-08-28 16:04:44', NULL, NULL, NULL, NULL),
('abf60064-6682-4ebf-a27e-b979563b65f3', '1695402396030-atg1dz3quy', '10', NULL, '39940e35-d311-4454-8fa6-4aea6d9cce28', 0, 26000, 3, 2, 2, '2023-09-22 17:06:36', 'Jano Pereira Kent', 'janoo.pereira@gmail.com', '+5401158817312', '121211221', '2023-09-22 17:06:36', '2023-09-22 17:06:36', NULL, NULL, NULL, NULL),
('ac29cc6e-ccf6-4eb6-ae59-7d0f30690e97', '1693239770285-d8n6erfcwz', '10', 'b220e5f7-0200-436a-9d5b-fd8049637c89', 'd56df0a8-253f-4c0c-aa44-d8054c031708', 0, 8000, 4, 1, 1, '2023-08-28 16:22:50', 'Modificar Direccion', 'janoo.pereira@gmail.com', '+5401158817312', '21212112', '2023-08-28 16:22:50', '2023-08-28 16:22:50', NULL, NULL, NULL, NULL),
('ae902c4e-8dcf-44e6-af4e-ec16139714da', '1696358309476-e2rop00e4h', '10', NULL, '308b2866-3e59-4b77-ac44-c72480b1a22b', 0, 30000, 4, 2, 2, '2023-10-03 18:38:29', 'Jano Kent', 'janoo.pereira@gmail.com', '+5411122121', '22222222', '2023-10-03 18:38:29', '2023-10-03 18:38:29', '2023-10-03 18:38:29', NULL, NULL, NULL),
('ae9f142c-73b5-446b-9472-b887290cd2bc', '1695402660515-zygfg6823r', '10', NULL, '1f82d9aa-a01d-4416-946c-d458163271a8', 0, 26000, 3, 2, 2, '2023-09-22 17:11:00', 'Jano Kent', 'janoo.pereira@gmail.com', '+5412211212', '12122121', '2023-09-22 17:11:00', '2023-09-22 17:11:00', NULL, NULL, NULL, NULL),
('af3177e3-5465-48a3-931b-58d83b5a7be2', '1691529822765-649cvbarit', NULL, NULL, 'dc36f020-4e0c-49bd-9dcd-6af2fa86912c', 0, 13000, 1, 3, 4, '2023-08-08 00:00:00', 'jano perez', 'janoperez@gmail.com', '+541158817312', '43083507', '2023-08-08 21:23:42', '2023-08-08 21:23:42', NULL, NULL, NULL, NULL),
('b13e0b87-115e-48f6-a4e8-f9d7f4da03f4', '1695650445508-u68ol6kwv7', '10', NULL, '2b024305-de78-44d5-b62d-9aa51df99a92', 0, 1740, 3, 2, 2, '2023-09-25 14:00:45', 'Jano Pereira Kent', 'janoo.pereira@gmail.com', '+5401158817312', '12122112', '2023-09-25 14:00:45', '2023-09-25 14:00:45', NULL, NULL, NULL, NULL),
('b1997aea-c40d-4814-b687-b8270eba33d9', '1693240414643-tvgk0fjg8r', '10', NULL, '47e26aba-94cb-4340-930a-01e3d918ab9c', 1, 6000, 4, 1, 1, '2023-08-28 16:33:34', 'Jano Kent', 'janoo.pereira@gmail.com', '+5401158817312', '43083507', '2023-08-28 16:33:34', '2023-08-28 16:33:34', NULL, NULL, NULL, NULL),
('b2353be1-e708-4e08-a57e-24337533b638', '1691264657492-13lgopc8wx', '10', NULL, 'eef923f7-ada6-44c0-a202-77496c2ba424', 0, 88222, 4, 2, 1, '2023-08-05 19:44:17', 'Jano Pereira Kent', 'janoo.pereira@gmail.com', '+5401158817312', '12212121', '2023-08-05 19:44:17', '2023-08-05 19:44:17', NULL, NULL, NULL, NULL),
('b7141c9d-f7be-400e-8bb4-167e7d637654', '1695654844540-vg0ufuqnqp', '10', NULL, '46d45a14-dfe0-4644-a784-891c4294cb94', 0, 8700, 3, 2, 2, '2023-09-25 15:14:04', 'Jano Kent', 'janoo.pereira@gmail.com', '+5421212121', '1212121', '2023-09-25 15:14:04', '2023-09-25 15:14:04', NULL, NULL, NULL, NULL),
('bbbea3b6-4564-4c2b-831a-4fdac64badcb', '1696358203958-ier7zyn94y', '10', NULL, '279f99aa-b2a0-4494-be3b-d54a67fd7123', 0, 30000, 5, 2, 2, '2023-10-03 18:36:43', 'Jano Kent', 'janoo.pereira@gmail.com', '+5411122121', '22222222', '2023-10-03 18:36:43', '2023-10-03 19:42:07', NULL, NULL, NULL, NULL),
('bd570c03-409b-49e9-bf28-81d1c68917b2', '1696295141137-5n59z2cdt3', '10', NULL, '926e529e-f5ff-4983-b9c7-35c522f80186', 0, 30000, 5, 2, 2, '2023-10-03 01:05:41', 'Jano Pereira Kent', 'janoo.pereira@gmail.com', '+5401158817312', '2222222', '2023-10-03 01:05:41', '2023-10-03 16:42:29', NULL, '2023-10-03 16:42:29', 1, 'Compra anulada por vencimiento de pago'),
('be2cec0d-9c25-4e35-965f-998e6d1887bb', '1695655149803-gj9eurdl33', '10', NULL, '923e9daf-d0b6-4683-8e1d-39d9dc895514', 0, 10440, 3, 2, 2, '2023-09-25 15:19:09', 'Jano Kent', 'janoo.pereira@gmail.com', '+541212112', '1221211', '2023-09-25 15:19:09', '2023-09-25 15:19:09', NULL, NULL, NULL, NULL),
('c2dc8e6a-ab10-4a71-8a2c-aea84a23418c', '1695650180366-3i8czdefeq', NULL, NULL, '8672ddeb-c898-4391-8339-88274d945852', 1, 14000, 4, 1, 1, '2023-09-25 13:56:20', 'Jano Kent', 'janoo.pereira@gmail.com', '+541221122121', '43242323', '2023-09-25 13:56:20', '2023-09-25 13:56:20', NULL, NULL, NULL, NULL),
('c3e168ea-0962-4d0d-a09e-c661335a9869', '1695939876055-5lo0mek1n4', NULL, NULL, 'e251ce76-5c50-491d-8730-f537558b3018', 0, 26480, 3, 2, 2, '2023-09-28 22:24:36', 'Jano Pereira Kent', 'janoo.pereira@gmail.com', '+5401158817312', '43083507', '2023-09-28 22:24:36', '2023-09-28 22:24:36', NULL, NULL, NULL, NULL),
('c9a4a1ec-d1b5-45c3-a0c9-2630cedc2165', '1695402834821-ik4mtntkmm', '10', NULL, '9eb986d7-0d82-40e1-bacd-211c97329230', 0, 26000, 3, 2, 2, '2023-09-22 17:13:54', 'Jano Kent', 'janoo.pereira@gmail.com', '+5412211212', '12122121', '2023-09-22 17:13:54', '2023-09-22 17:13:54', NULL, NULL, NULL, NULL),
('c9c86ab4-b8b4-464f-bfeb-fc02cf1fc84a', '1693238868796-tvqmmwjzhl', '10', NULL, 'aa4e0f0a-e23f-4f6f-8814-3999d666841a', 0, 25000, 4, 1, 1, '2023-08-28 16:07:48', 'Prueba Direccion', 'janoo.pereira@gmail.com', '+5401158817312', '12212121', '2023-08-28 16:07:48', '2023-08-28 16:07:48', NULL, NULL, NULL, NULL),
('ca032370-8c29-4b98-994f-8bde31ee525d', '1693239424726-dppvwzv3r7', '10', 'b7481e1a-d83e-4a1f-8b78-da3f2aab8c60', 'b23272dc-e3bd-49e0-9487-6389cb474852', 0, 41000, 4, 1, 1, '2023-08-28 16:17:04', 'Jeronimo Direccion', 'janoo.pereira@gmail.com', '+5401158817312', '21121212', '2023-08-28 16:17:04', '2023-08-28 16:17:04', NULL, NULL, NULL, NULL),
('cca933c7-b2f1-483d-be4e-3838e72ebaec', '1695655515541-euptjn1yd9', '10', NULL, '70e84fb6-a917-481a-9719-d16ff70c51ef', 0, 15660, 7, 2, 2, '2023-09-25 15:25:15', 'Jano Pereira', 'janoo.pereira@gmail.com', '+5412121212', '12211221', '2023-09-25 15:25:15', '2023-09-25 15:25:25', NULL, NULL, NULL, NULL),
('ccafdf33-da6e-45b2-a144-4194a1e2f536', '1696200817681-g03qbtz0lo', NULL, NULL, 'cc1a3c25-eafd-4b1c-a019-f0cdad733f91', 0, 29960, 4, 2, 2, '2023-10-01 22:53:37', 'Jano Pereira Kent', 'janoo.pereira@gmail.com', '+5401158817312', '22222222', '2023-10-01 22:53:37', '2023-10-01 22:53:37', NULL, NULL, NULL, NULL),
('ccba0726-7d7b-4398-b033-c74be28e78e4', '1695939771310-uwvul4j51l', NULL, NULL, '82685496-2118-44fa-9d8c-b29c24e056b1', 0, 95480, 3, 2, 2, '2023-09-28 22:22:51', 'Jano Kent', 'janoo.pereira@gmail.com', '+54112212121', '4444444', '2023-09-28 22:22:51', '2023-09-28 22:22:51', NULL, NULL, NULL, NULL),
('ccfc22cf-c656-4a64-aec0-86d416151685', '1696200831321-20mno700ua', NULL, NULL, '65cbdc47-a86d-4651-bbcb-6581a9b2d0f9', 0, 29960, 5, 2, 2, '2023-10-01 22:53:51', 'Jano Kent', 'janoo.pereira@gmail.com', '+5411221121212', '22222222', '2023-10-01 22:53:51', '2023-10-03 18:45:47', NULL, NULL, NULL, 'Anulada por stock insuficiente'),
('ce4d46a9-89b2-46a6-8abd-5caeea62a43c', '1695654108093-y7hxm42ber', '10', NULL, '18b82d88-92cd-43e8-9473-90e71ebef019', 0, 10440, 1, 2, 2, '2023-09-25 15:01:48', 'Jano Pereira Kent', 'janoo.pereira@gmail.com', '+5401158817312', '12212121', '2023-09-25 15:01:48', '2023-09-25 15:02:41', NULL, NULL, NULL, NULL),
('d36e2f74-87eb-48c6-8780-f87ebc44a6d1', '1695654118309-zt4vjllqtf', '10', NULL, '5de1fcaf-4329-46b7-84b9-d20e9d41e546', 0, 10440, 3, 2, 2, '2023-09-25 15:01:58', 'Jano Pereira Kent', 'janoo.pereira@gmail.com', '+5401158817312', '12212121', '2023-09-25 15:01:58', '2023-09-25 15:01:58', NULL, NULL, NULL, NULL),
('d3886528-8981-4d59-99b3-e1ad6123ae06', '1695402791325-4dud84qz0m', '10', NULL, 'a15db14e-8d64-4701-a8ba-34cd770c9b22', 0, 26000, 3, 2, 2, '2023-09-22 17:13:11', 'Jano Kent', 'janoo.pereira@gmail.com', '+5412211212', '12122121', '2023-09-22 17:13:11', '2023-09-22 17:13:11', NULL, NULL, NULL, NULL),
('d53bf083-f698-4492-b443-80b48c7cbdab', '1693240861494-ilijnwq1au', '10', NULL, 'dc56ccf5-75be-4646-aff5-f45c3267460e', 0, 6000, 4, 2, 1, '2023-08-28 16:41:01', 'Producto  Discount', 'janoo.pereira@gmail.com', '+5401158817312', '12211212', '2023-08-28 16:41:01', '2023-08-28 16:41:01', NULL, NULL, NULL, NULL),
('d543f4dd-078d-445d-b74d-577b8b50ef52', '1696362162281-gvty3p9zzc', '10', NULL, 'cf583bcf-3f43-4115-a77a-442e2b33c591', 0, 30000, 5, 2, 2, '2023-10-03 19:42:42', 'Jano Pereira Kent', 'janoo.pereira@gmail.com', '+5401158817312', '221212112', '2023-10-03 19:42:42', '2023-10-03 20:00:00', NULL, NULL, 1, 'Compra anulada por vencimiento de pago'),
('d582d50e-b23b-4580-a61f-016f57a2674c', '1695654452225-wotos1i83c', '10', NULL, 'a6545522-681c-4b88-8e6e-a999aa9f7054', 0, 10440, 3, 2, 2, '2023-09-25 15:07:32', 'Jano Kent', 'janoo.pereira@gmail.com', '+541221121221', '12212112', '2023-09-25 15:07:32', '2023-09-25 15:07:32', NULL, NULL, NULL, NULL),
('d7938925-b0f1-4e2c-b1e2-d1570b3aefc2', '1692744904001-1o6qm16uch', NULL, NULL, '3ce31b91-f94f-4904-bef1-e0c5fdf3dd6f', 0, 20700, 4, 2, 1, '2023-08-22 22:55:04', 'Jano Kent', 'janoo.pereira@gmail.com', '+54122121212', '12122121', '2023-08-22 22:55:04', '2023-08-22 22:55:04', NULL, NULL, NULL, NULL),
('d7c471cd-dd0f-4186-8fa1-1bb147d3c14a', '1695400168619-hdaoqv0erk', '10', NULL, '93bd4b0e-0f2d-4567-bd88-ff7674fe310e', 0, 15000, 3, 2, 2, '2023-09-22 16:29:28', 'Jano Pereira Kent', 'janoo.pereira@gmail.com', '+5401158817312', '12212121', '2023-09-22 16:29:28', '2023-09-22 16:29:28', NULL, NULL, NULL, NULL),
('da11e9b0-d3b0-48e1-977d-c32068f088e6', '1695402450976-btovg2yzt2', '10', NULL, 'e4e21b9e-e5ad-4245-89f6-e5ba5733dc1b', 0, 26000, 3, 2, 2, '2023-09-22 17:07:30', 'Jano Pereira Kent', 'janoo.pereira@gmail.com', '+5401158817312', '21122112', '2023-09-22 17:07:30', '2023-09-22 17:07:30', NULL, NULL, NULL, NULL),
('dc9b4888-5670-4b11-ae9e-3ea40673951a', '1696175464485-e7xbtl4e30', '10', NULL, '6b695289-b6fe-488f-9b01-7227aa9a09ca', 0, 28220, 4, 2, 1, '2023-10-01 15:51:04', 'Jano Pereira Kent', 'janoo.pereira@gmail.com', '+5401158817312', '323213212', '2023-10-01 15:51:04', '2023-10-01 15:51:04', NULL, NULL, NULL, NULL),
('dcf2cb13-0270-4d30-939b-9387802fc3d9', '1696175435823-xtcx26mybs', '10', NULL, 'b70c1f18-1c74-4ab8-93bf-37e185712c13', 0, 72480, 4, 2, 2, '2023-10-01 15:50:35', 'Jano Pereira Kent', 'janoo.pereira@gmail.com', '+5401158817312', '21212112', '2023-10-01 15:50:35', '2023-10-01 15:50:35', '2023-10-01 15:50:35', NULL, NULL, NULL),
('e2d5b140-ceb2-4a81-920b-2841b14f865c', '1695650860872-qzkj28d9by', '10', NULL, '83457f7d-aa31-44cb-b7f7-2d6c77c1f55d', 0, 1740, 3, 2, 2, '2023-09-25 14:07:40', 'Jano Pereira Kent', 'janoo.pereira@gmail.com', '+5401158817312', '12122112', '2023-09-25 14:07:40', '2023-09-25 14:07:40', NULL, NULL, NULL, NULL),
('e35c35cb-76c8-4f89-b379-84f7cddb1b54', '1695654282423-svjdrjpo6x', '10', NULL, 'd4099a1b-eeb7-4308-a678-4ebc9288c71b', 0, 13920, 3, 2, 2, '2023-09-25 15:04:42', 'Jano Pereira Kent', 'janoo.pereira@gmail.com', '+5401158817312', '12211212', '2023-09-25 15:04:42', '2023-09-25 15:04:42', NULL, NULL, NULL, NULL),
('e5cdbd31-e816-4210-9f69-46659c484e64', '1691264370124-44ina3xulr', '10', NULL, '6d653043-8048-473b-8149-1de8de673daf', 0, 88222, 4, 2, 1, '2023-08-05 19:39:30', 'Jano Pereira Kent', 'janoo.pereira@gmail.com', '+5401158817312', '21211212', '2023-08-05 19:39:30', '2023-08-05 19:39:30', NULL, NULL, NULL, NULL),
('ed2774fd-cbb8-416c-8706-928e0274fceb', '1695939601739-r54xvz0luu', NULL, NULL, '3f739aac-3c82-488d-88f1-7ce847fc1a46', 0, 70740, 3, 2, 2, '2023-09-28 22:20:01', 'Jano Kent', 'janoo.pereira@gmail.com', '+54112212121', '4444444', '2023-09-28 22:20:01', '2023-09-28 22:20:01', NULL, NULL, NULL, NULL),
('ed57a561-56f7-4a57-8e1a-2e6027e1149d', '1695656062768-zerktycu31', '10', NULL, 'b8b86ec6-7d2c-429a-b3cc-91aa61cc8c8c', 0, 15660, 6, 2, 2, '2023-09-25 15:34:22', 'Jano Pereira', 'janoo.pereira@gmail.com', '+5421122112', '12212121', '2023-09-25 15:34:22', '2023-09-25 15:34:29', NULL, NULL, NULL, NULL),
('f0f7bd30-e05e-4b01-9483-5c9c8e93e2bd', '1695333482762-iyncqb18yh', NULL, NULL, '9174d63a-d832-4041-8baa-97f76e918c78', 0, 17000, 3, 2, 2, '2023-09-21 21:58:02', 'Jano Pereira Kent', 'janoo.pereira@gmail.com', '+5401158817312', '12212121', '2023-09-21 21:58:02', '2023-09-21 21:58:02', NULL, NULL, NULL, NULL),
('f5560c91-f92c-4471-b312-4f2df4c7d325', '1695650362240-el3mjqgjst', '10', NULL, 'f00f3ac8-6762-45d2-840e-92364eecccec', 0, 8700, 3, 2, 2, '2023-09-25 13:59:22', 'Jano Pereira Kent', 'janoo.pereira@gmail.com', '+5401158817312', '12122112', '2023-09-25 13:59:22', '2023-09-25 13:59:22', NULL, NULL, NULL, NULL),
('f6ac5280-ed02-4d2e-8b20-39d5ff84ddee', '1696216696057-hfvbqyenpy', NULL, NULL, '44008cc0-9642-4368-a231-df48d8f3e6fe', 0, 1740, 3, 2, 2, '2023-10-02 03:18:16', 'Jano Pereira Kent', 'janoo.pereira@gmail.com', '+5401158817312', '1221212', '2023-10-02 03:18:16', '2023-10-02 23:06:33', NULL, '2023-10-02 23:06:33', NULL, NULL),
('fac173c6-5b88-41d5-a996-1078d3a77c0f', '1696293527510-xxgwby6162', '10', NULL, '132185ee-0edd-4d01-b407-fa2836d30877', 0, 105000, 3, 2, 2, '2023-10-03 00:38:47', 'Jano Kent', 'janoo.pereira@gmail.com', '+5412212112', '212212121', '2023-10-03 00:38:47', '2023-10-03 00:38:47', NULL, '2023-10-03 00:38:47', NULL, NULL),
('ffd97668-d482-46ed-9375-f56f7f95f847', '1695650404665-8bnvmjhffj', '10', NULL, 'eb3a97b4-ddb4-4ee4-af45-25f96c2c02cd', 0, 1740, 3, 2, 2, '2023-09-25 14:00:04', 'Jano Pereira Kent', 'janoo.pereira@gmail.com', '+5401158817312', '12122112', '2023-09-25 14:00:04', '2023-09-25 14:00:04', NULL, NULL, NULL, NULL);

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
  `discount` tinyint(3) UNSIGNED DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `order_items`
--

INSERT INTO `order_items` (`id`, `orders_id`, `products_id`, `name`, `price`, `quantity`, `discount`, `createdAt`, `deletedAt`, `updatedAt`) VALUES
('0247a701-b305-4fa8-82cb-638bab7a9165', '3770d155-c320-4c32-a5e2-a3eb4f27b0ad', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 4, 13, '2023-09-25 14:09:53', NULL, '2023-09-25 14:09:53'),
('04920702-0cea-40a0-8bb2-d417db7f8d02', 'ffd97668-d482-46ed-9375-f56f7f95f847', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 1, 13, '2023-09-25 14:00:04', NULL, '2023-09-25 14:00:04'),
('05a6990b-64d3-4672-8bf9-d5e1acc2e566', '5de5cfc2-4711-4dc7-94b6-65f560239dec', '91ca97a0-31e9-4c23-ac71-d18cb19eeb33', 'Colageno Fine Smooth', 23000, 1, 12, '2023-08-28 03:00:00', NULL, '2023-08-28 03:00:00'),
('06980201-62a4-4ff9-86bf-a74aa5468c48', 'd582d50e-b23b-4580-a61f-016f57a2674c', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 6, 13, '2023-09-25 15:07:32', NULL, '2023-09-25 15:07:32'),
('07549abb-2dfc-4722-a5c1-4eefd8a9b1d9', '4bca66b7-89c1-4749-b419-098a2db120da', '91ca97a0-31e9-4c23-ac71-d18cb19eeb33', 'Colageno Fine Smooth', 23000, 1, 0, '2023-08-28 03:00:00', NULL, '2023-08-28 03:00:00'),
('0cd635ab-d3ed-45d5-ad85-f31509ef68b8', '8195143a-45f0-4554-b077-a20c4a059cec', 'ac4abb69-97ed-4d09-87c4-c3da48ce15f8', 'Colageno Fine Power', 20000, 3, NULL, '2023-08-05 03:00:00', NULL, '2023-08-05 03:00:00'),
('0f978a9a-bcf8-4cb1-a1e0-9ff3541549d1', 'd7938925-b0f1-4e2c-b1e2-d1570b3aefc2', '91ca97a0-31e9-4c23-ac71-d18cb19eeb33', 'Colageno Fine Smooth', 20700, 1, NULL, '2023-08-22 03:00:00', NULL, '2023-08-22 03:00:00'),
('1345c834-3b15-4e3a-8b5f-48995ab79222', '164380d8-2c30-4181-973f-35774d71a8ab', '91ca97a0-31e9-4c23-ac71-d18cb19eeb33', 'Colageno Fine Smooth', 20700, 1, NULL, '2023-08-22 03:00:00', NULL, '2023-08-22 03:00:00'),
('15ac2fb5-c239-4386-90da-3d9b1db6702f', '5b236ed8-75d4-42de-91c4-a11405eeb141', '83838646-6969-449d-8132-2ad967701c64', 'Colageno Fine Peak ', 24000, 1, NULL, '2023-08-05 03:00:00', NULL, '2023-08-05 03:00:00'),
('191d8b69-6158-40b3-86e6-f3528592f8d2', 'e5cdbd31-e816-4210-9f69-46659c484e64', 'ac4abb69-97ed-4d09-87c4-c3da48ce15f8', 'Colageno Fine Power', 20000, 3, NULL, '2023-08-05 03:00:00', NULL, '2023-08-05 03:00:00'),
('1e340b5f-b337-4d0b-8390-17f2ca4bd19a', 'ca032370-8c29-4b98-994f-8bde31ee525d', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 1, 0, '2023-08-28 03:00:00', NULL, '2023-08-28 03:00:00'),
('218fcc51-b81a-4150-ae4e-b377e1618dc7', '9159dab4-5100-4c0e-878f-35f80cb386aa', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 5, NULL, '2023-08-22 03:00:00', NULL, '2023-08-22 03:00:00'),
('21a36f71-aec8-4749-b411-8608ee2e00eb', 'e35c35cb-76c8-4f89-b379-84f7cddb1b54', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 8, 13, '2023-09-25 15:04:42', NULL, '2023-09-25 15:04:42'),
('236026da-9028-4a81-b967-c1062e656730', 'ae9f142c-73b5-446b-9472-b887290cd2bc', '83838646-6969-449d-8132-2ad967701c64', 'Colageno Fine Peak ', 24000, 1, 0, '2023-09-22 17:11:00', NULL, '2023-09-22 17:11:00'),
('24072d65-5dc9-4dd5-8867-111db77b1b07', '573c5aaa-0554-41c1-b3db-ae6632143c03', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 1, 13, '2023-09-22 16:38:32', NULL, '2023-09-22 16:38:32'),
('246a4763-5629-42fd-b61d-930225b4c2de', 'bbbea3b6-4564-4c2b-831a-4fdac64badcb', 'db005c8d-ccd0-4e0e-9d36-aaed244e8559', 'Crema despigmentante', 15000, 2, 0, '2023-10-03 18:36:43', NULL, '2023-10-03 18:36:43'),
('2579fdb2-fec5-4f65-a608-f4e2968066ff', 'dc9b4888-5670-4b11-ae9e-3ea40673951a', '91ca97a0-31e9-4c23-ac71-d18cb19eeb33', 'Colageno Fine Smooth', 23000, 1, 0, '2023-10-01 15:51:04', NULL, '2023-10-01 15:51:04'),
('2b82ce94-aeba-45a9-bbbb-33e20a7183d3', 'dcf2cb13-0270-4d30-939b-9387802fc3d9', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 2, 13, '2023-10-01 15:50:35', NULL, '2023-10-01 15:50:35'),
('2d9ebf71-c21f-4037-8d79-78ae6b7f5ee9', 'e2d5b140-ceb2-4a81-920b-2841b14f865c', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 1, 13, '2023-09-25 14:07:40', NULL, '2023-09-25 14:07:40'),
('2e8f4ef0-8d94-498c-bfe2-ccd5da466670', 'abf60064-6682-4ebf-a27e-b979563b65f3', '83838646-6969-449d-8132-2ad967701c64', 'Colageno Fine Peak ', 24000, 1, 0, '2023-09-22 17:06:36', NULL, '2023-09-22 17:06:36'),
('2f6f74df-52fa-4c06-83e6-f834b04c5f29', 'cca933c7-b2f1-483d-be4e-3838e72ebaec', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 9, 13, '2023-09-25 15:25:15', NULL, '2023-09-25 15:25:15'),
('3300afeb-82eb-4ab2-9736-5398fa1b15f4', '9564ee1d-b66e-4ab1-bd66-f669a931f8fe', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 2, 13, '2023-09-25 15:17:34', NULL, '2023-09-25 15:17:34'),
('34996ffe-0b1b-4ae9-b295-00b2e6672b1a', 'ae9f142c-73b5-446b-9472-b887290cd2bc', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 1, 13, '2023-09-22 17:11:00', NULL, '2023-09-22 17:11:00'),
('35fbbcf6-e15f-4dc6-9f2f-19d6af3114a1', 'c2dc8e6a-ab10-4a71-8a2c-aea84a23418c', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 7, 13, '2023-09-25 13:56:20', NULL, '2023-09-25 13:56:20'),
('38466cd9-de2c-470f-89cd-255b26c4f43d', '4af4b51c-c9ab-4b3e-a849-9d47e498bf4b', '79cbdf23-309b-4f2f-9834-9d6fd5de5251', 'Silk Glow Sleepwear  ', 6000, 1, NULL, '2023-08-05 03:00:00', NULL, '2023-08-05 03:00:00'),
('3938467b-13d1-45dd-b235-84107843ffc6', '02a7e9b0-8a77-4cc1-a7d4-31dbc0aa67b9', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 5, NULL, '2023-08-22 03:00:00', NULL, '2023-08-22 03:00:00'),
('3aa59673-2918-422d-8329-e75ce4490cc8', '594918f1-9dbe-4502-8d5d-3a21e853bd3d', 'db005c8d-ccd0-4e0e-9d36-aaed244e8559', 'Crema despigmentante', 15000, 1, 0, '2023-10-02 13:12:47', NULL, '2023-10-02 13:12:47'),
('3e443c46-a424-4b41-a65b-6e5609782dc3', 'c9c86ab4-b8b4-464f-bfeb-fc02cf1fc84a', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 1, 0, '2023-08-28 03:00:00', NULL, '2023-08-28 03:00:00'),
('3f82e125-d0cf-49fa-826d-3bb777127f2b', '3e3b280f-2e77-4fda-82d0-144b083b0d00', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 1, 13, '2023-10-02 03:23:37', NULL, '2023-10-02 03:23:37'),
('3fae09ae-b314-41ab-a76f-8801212c8c6f', 'af3177e3-5465-48a3-931b-58d83b5a7be2', 'a9c2dc18-3086-4d3c-94b6-18f5f5db2e6b', 'Espuma de limpieza 3 en 1', 9000, 1, NULL, '2023-08-08 03:00:00', NULL, '2023-08-08 03:00:00'),
('41d5a580-c256-4cb2-b3fb-d00d69c3e157', 'a3a73685-3faa-4f65-ac05-5deca7b77f2a', '91ca97a0-31e9-4c23-ac71-d18cb19eeb33', 'Colageno Fine Smooth', 20700, 1, NULL, '2023-08-24 03:00:00', NULL, '2023-08-24 03:00:00'),
('4754e7ca-df8c-4bbe-ad5a-59dee8e6e8c7', 'ccafdf33-da6e-45b2-a144-4194a1e2f536', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 4, 13, '2023-10-01 22:53:37', NULL, '2023-10-01 22:53:37'),
('47a75e83-8bf9-4b89-b05a-db0b38e22a4b', '1bbc68f2-6cf4-4148-b4f8-9cab0259c3e3', '83838646-6969-449d-8132-2ad967701c64', 'Colageno Fine Peak ', 24000, 1, 0, '2023-09-22 17:16:44', NULL, '2023-09-22 17:16:44'),
('4ba5096e-193a-45a1-8cbe-2f1f5de0285e', '92e1cc08-3992-44fa-8039-c8027de0eff2', '91ca97a0-31e9-4c23-ac71-d18cb19eeb33', 'Colageno Fine Smooth', 20700, 1, NULL, '2023-08-22 03:00:00', NULL, '2023-08-22 03:00:00'),
('4bc2810f-dc11-4aef-afbf-6804606ac9b6', 'da11e9b0-d3b0-48e1-977d-c32068f088e6', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 1, 13, '2023-09-22 17:07:30', NULL, '2023-09-22 17:07:30'),
('4d69e657-79dc-45e1-8175-3117926824d6', 'af3177e3-5465-48a3-931b-58d83b5a7be2', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 2, NULL, '2023-08-08 03:00:00', NULL, '2023-08-08 03:00:00'),
('51135d6c-a806-4d17-a67f-8c325bd777ae', 'bd570c03-409b-49e9-bf28-81d1c68917b2', 'db005c8d-ccd0-4e0e-9d36-aaed244e8559', 'Crema despigmentante', 15000, 2, 0, '2023-10-03 01:05:41', NULL, '2023-10-03 01:05:41'),
('5138cbd4-3a3c-4395-835f-b947cb537182', '898b8246-d996-4a92-85b0-4bbc90f58362', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 1, 13, '2023-09-22 17:09:05', NULL, '2023-09-22 17:09:05'),
('517d181b-f72b-4871-8ed0-839c1eca87f0', 'f0f7bd30-e05e-4b01-9483-5c9c8e93e2bd', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 1, 13, '2023-09-21 21:58:02', NULL, '2023-09-21 21:58:02'),
('5295e6b9-8526-437b-8200-c5d581a1538d', '92146667-02f7-4fed-ab4a-9d7a4ab2f919', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 1, 13, '2023-09-21 21:59:08', NULL, '2023-09-21 21:59:08'),
('52d5f975-f855-4057-bdaa-fa3cad7dc590', 'ccfc22cf-c656-4a64-aec0-86d416151685', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 4, 13, '2023-10-01 22:53:51', NULL, '2023-10-01 22:53:51'),
('531d5c7c-b8a9-42d6-bc17-3413c0c917cc', '3fba444f-b2e4-4253-a3f0-1936c151f1ae', '79cbdf23-309b-4f2f-9834-9d6fd5de5251', 'Silk Glow Sleepwear  ', 6000, 1, NULL, '2023-08-05 03:00:00', NULL, '2023-08-05 03:00:00'),
('533d54cc-8e86-4003-aa64-b48c628f345f', 'abf60064-6682-4ebf-a27e-b979563b65f3', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 1, 13, '2023-09-22 17:06:36', NULL, '2023-09-22 17:06:36'),
('552b7ac0-62e4-4e8e-b6a1-6e41a4d6e600', '69420a40-cacb-47de-9040-a3bbc8240957', '91ca97a0-31e9-4c23-ac71-d18cb19eeb33', 'Colageno Fine Smooth', 20700, 5, 10, '2023-08-24 03:00:00', NULL, '2023-08-24 03:00:00'),
('564eb58f-764f-4eac-a90f-6e1baba871d3', '1e96892c-08fb-41ad-84d6-c09a2c56e71b', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 1, 13, '2023-10-01 22:54:01', NULL, '2023-10-01 22:54:01'),
('5bdffc29-9539-4cec-a08f-6415abd8b4a8', 'f0f7bd30-e05e-4b01-9483-5c9c8e93e2bd', 'db005c8d-ccd0-4e0e-9d36-aaed244e8559', 'Crema despigmentante', 15000, 1, 0, '2023-09-21 21:58:02', NULL, '2023-09-21 21:58:02'),
('5e1e21b0-0430-409e-be3b-5c8358453122', 'dc9b4888-5670-4b11-ae9e-3ea40673951a', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 3, 13, '2023-10-01 15:51:04', NULL, '2023-10-01 15:51:04'),
('610037e7-1cdf-4a0d-b3bb-bd24295b2f36', 'dcf2cb13-0270-4d30-939b-9387802fc3d9', '91ca97a0-31e9-4c23-ac71-d18cb19eeb33', 'Colageno Fine Smooth', 23000, 3, 0, '2023-10-01 15:50:35', NULL, '2023-10-01 15:50:35'),
('6117d577-48ee-4830-8187-43a8a4681c89', '95bd8a0b-dcd5-4fe9-aa06-c15d73153735', 'db005c8d-ccd0-4e0e-9d36-aaed244e8559', 'Crema despigmentante', 15000, 1, 0, '2023-10-02 23:34:11', NULL, '2023-10-02 23:34:11'),
('6455a6e8-8acc-4cfa-b6c4-e5aec6f7eab3', '34b760d5-23cc-4aef-aeef-359cc2c3f1e1', '91ca97a0-31e9-4c23-ac71-d18cb19eeb33', 'Colageno Fine Smooth', 23000, 4, 0, '2023-10-01 15:11:42', NULL, '2023-10-01 15:11:42'),
('66630197-40ec-4982-a579-d614ca1f4e60', 'da11e9b0-d3b0-48e1-977d-c32068f088e6', '83838646-6969-449d-8132-2ad967701c64', 'Colageno Fine Peak ', 24000, 1, 0, '2023-09-22 17:07:30', NULL, '2023-09-22 17:07:30'),
('67b3da30-441f-4357-a83e-dfd2dddab419', 'e5cdbd31-e816-4210-9f69-46659c484e64', 'b2e86191-8b70-431b-9808-ba754697ac2b', 'Objeto para probar mainIM', 22222, 1, NULL, '2023-08-05 03:00:00', NULL, '2023-08-05 03:00:00'),
('69a1069e-1dd8-47f4-8745-3619a65f35a9', '3e8e576d-bb39-4850-a655-6cf0ab5ddada', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 4, 0, '2023-08-28 03:00:00', NULL, '2023-08-28 03:00:00'),
('69f4c4fb-f900-4cb5-9e9e-3ac1f618bd09', '76d5138a-d111-4c72-b864-9184367d751d', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 4, 13, '2023-09-25 15:06:55', NULL, '2023-09-25 15:06:55'),
('6aea6b0b-cdf3-4f3d-8a6c-739b84c0880a', 'b1997aea-c40d-4814-b687-b8270eba33d9', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 3, 0, '2023-08-28 03:00:00', NULL, '2023-08-28 03:00:00'),
('6d7d9a2d-51f4-4e3d-97d1-703e0a047881', 'a096e365-e966-4505-8531-43707f7b4ab5', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 3, 0, '2023-08-28 03:00:00', NULL, '2023-08-28 03:00:00'),
('6e074afe-5f2b-45f9-adc8-25ce2c481f0c', '1a356f0e-fff8-4fb2-950b-9bd5dfdd6bb4', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 6, 13, '2023-09-25 15:09:30', NULL, '2023-09-25 15:09:30'),
('71b458d3-73a3-4dd0-9c8d-3429bebdc656', 'fac173c6-5b88-41d5-a996-1078d3a77c0f', 'db005c8d-ccd0-4e0e-9d36-aaed244e8559', 'Crema despigmentante', 15000, 7, 0, '2023-10-03 00:38:47', NULL, '2023-10-03 00:38:47'),
('7596999d-d2b3-4bd5-80e3-e05c3b09811f', '9e3cb10d-c760-4722-8d29-3e97148cb8f5', 'b2e86191-8b70-431b-9808-ba754697ac2b', 'Objeto para probar mainIM', 22222, 1, NULL, '2023-08-05 03:00:00', NULL, '2023-08-05 03:00:00'),
('7b0536ef-fd50-424b-8e0d-49791da9140d', 'ccba0726-7d7b-4398-b033-c74be28e78e4', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 2, 13, '2023-09-28 22:22:51', NULL, '2023-09-28 22:22:51'),
('7c164237-8aeb-4096-b6a8-b5c82ee5459d', '2ae38b2c-42c8-4cf6-ab29-91ebce417edc', '83838646-6969-449d-8132-2ad967701c64', 'Colageno Fine Peak ', 24000, 1, 0, '2023-09-22 17:20:04', NULL, '2023-09-22 17:20:04'),
('7c9ac502-4277-40c3-8168-3ad5b2b34db2', 'd3886528-8981-4d59-99b3-e1ad6123ae06', '83838646-6969-449d-8132-2ad967701c64', 'Colageno Fine Peak ', 24000, 1, 0, '2023-09-22 17:13:11', NULL, '2023-09-22 17:13:11'),
('7d2047d9-1b93-49d4-b7e3-95bb7ec24db5', 'b7141c9d-f7be-400e-8bb4-167e7d637654', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 5, 13, '2023-09-25 15:14:04', NULL, '2023-09-25 15:14:04'),
('7fd28f1e-c5c0-48b4-a99b-9c109f8b2082', 'ed2774fd-cbb8-416c-8706-928e0274fceb', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 1, 13, '2023-09-28 22:20:01', NULL, '2023-09-28 22:20:01'),
('8221a92a-da9c-4000-82aa-0aa588b21f85', '9e3cb10d-c760-4722-8d29-3e97148cb8f5', '79cbdf23-309b-4f2f-9834-9d6fd5de5251', 'Silk Glow Sleepwear  ', 6000, 1, NULL, '2023-08-05 03:00:00', NULL, '2023-08-05 03:00:00'),
('83dbe3e2-947c-43e0-ba96-26d73b1e31ad', '164380d8-2c30-4181-973f-35774d71a8ab', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 5, NULL, '2023-08-22 03:00:00', NULL, '2023-08-22 03:00:00'),
('86240ad6-3bdf-4a50-aec0-774cf57ba88a', 'd7c471cd-dd0f-4186-8fa1-1bb147d3c14a', 'db005c8d-ccd0-4e0e-9d36-aaed244e8559', 'Crema despigmentante', 15000, 1, 0, '2023-09-22 16:29:28', NULL, '2023-09-22 16:29:28'),
('86d1f5b2-b3f0-460c-bb4c-3411047635af', 'abcc024b-2609-44aa-817b-c035431b63b2', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 1, 0, '2023-08-28 03:00:00', NULL, '2023-08-28 03:00:00'),
('87663586-24ee-4d07-95ad-f22dc76004ef', '7b4e08aa-5a43-4675-9cf1-46d37900a163', '91ca97a0-31e9-4c23-ac71-d18cb19eeb33', 'Colageno Fine Smooth', 23000, 1, 0, '2023-09-28 22:05:55', NULL, '2023-09-28 22:05:55'),
('88809674-c8fa-413b-af28-877003863f81', '7b4e08aa-5a43-4675-9cf1-46d37900a163', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 1, 13, '2023-09-28 22:05:55', NULL, '2023-09-28 22:05:55'),
('8b08d9cd-9873-4580-b574-bd14607571fa', '3f4d30d2-2298-41ac-bff3-b288af55edc1', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 1, 13, '2023-09-25 14:05:31', NULL, '2023-09-25 14:05:31'),
('8bd9709e-144c-429b-ac8d-9335a5d77d52', '3bb6cfb3-c02f-45aa-bcc2-518581e6741d', 'db005c8d-ccd0-4e0e-9d36-aaed244e8559', 'Crema despigmentante', 15000, 1, 0, '2023-10-03 18:39:32', NULL, '2023-10-03 18:39:32'),
('8c9cebe3-34fc-4aee-8b72-61b391b0d73e', '05590144-cb8d-41b4-a385-d4b6f93894ff', 'ac4abb69-97ed-4d09-87c4-c3da48ce15f8', 'Colageno Fine Power', 20000, 1, NULL, '2023-08-05 03:00:00', NULL, '2023-08-05 03:00:00'),
('8d8870bb-da43-4bc9-8922-0039c41a60fe', 'e5cdbd31-e816-4210-9f69-46659c484e64', '79cbdf23-309b-4f2f-9834-9d6fd5de5251', 'Silk Glow Sleepwear  ', 6000, 1, NULL, '2023-08-05 03:00:00', NULL, '2023-08-05 03:00:00'),
('8ebae773-69a4-476d-876c-9d5aab62d043', '2db95889-2f6a-4ca4-8aa6-8ba61ff3eb39', '91ca97a0-31e9-4c23-ac71-d18cb19eeb33', 'Colageno Fine Smooth', 23000, 8, 0, '2023-09-28 22:03:06', NULL, '2023-09-28 22:03:06'),
('90447dc4-69cf-4bd7-8fbc-9958d64cc4cb', '05590144-cb8d-41b4-a385-d4b6f93894ff', '79cbdf23-309b-4f2f-9834-9d6fd5de5251', 'Silk Glow Sleepwear  ', 6000, 1, NULL, '2023-08-05 03:00:00', NULL, '2023-08-05 03:00:00'),
('91b5533c-a7dd-4c2c-a0c2-2e340ff0d702', 'd543f4dd-078d-445d-b74d-577b8b50ef52', 'db005c8d-ccd0-4e0e-9d36-aaed244e8559', 'Crema despigmentante', 15000, 2, 0, '2023-10-03 19:42:42', NULL, '2023-10-03 19:42:42'),
('95ac62d5-8a9b-46a9-b5ae-779b03aa2f04', '1d13fb1f-b0b5-47ff-9456-94c89edbb786', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 6, 13, '2023-09-25 15:08:07', NULL, '2023-09-25 15:08:07'),
('96ee464e-a9a1-43c7-afe4-30c3e68671ad', '4af4b51c-c9ab-4b3e-a849-9d47e498bf4b', 'ac4abb69-97ed-4d09-87c4-c3da48ce15f8', 'Colageno Fine Power', 20000, 3, NULL, '2023-08-05 03:00:00', NULL, '2023-08-05 03:00:00'),
('97539648-db1b-454d-b349-1dc62ff5f0c1', '92146667-02f7-4fed-ab4a-9d7a4ab2f919', 'db005c8d-ccd0-4e0e-9d36-aaed244e8559', 'Crema despigmentante', 15000, 1, 0, '2023-09-21 21:59:08', NULL, '2023-09-21 21:59:08'),
('97b52b17-5ca1-4647-98ee-c5432988a84e', '7e2239f3-3411-41a9-9e3b-51ab66682f20', '91ca97a0-31e9-4c23-ac71-d18cb19eeb33', 'Colageno Fine Smooth', 23000, 1, 0, '2023-08-28 03:00:00', NULL, '2023-08-28 03:00:00'),
('97d20d04-46b4-462e-b074-545560c42cd4', '4af4b51c-c9ab-4b3e-a849-9d47e498bf4b', 'b2e86191-8b70-431b-9808-ba754697ac2b', 'Objeto para probar mainIM', 22222, 1, NULL, '2023-08-05 03:00:00', NULL, '2023-08-05 03:00:00'),
('98b33423-be2e-4e6b-b3a7-d82ed26573d8', 'b13e0b87-115e-48f6-a4e8-f9d7f4da03f4', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 1, 13, '2023-09-25 14:00:45', NULL, '2023-09-25 14:00:45'),
('996efe25-5b6c-426d-a156-5c9c6c2f7096', '596cc1db-1091-407e-8e06-77cde7747cf8', '91ca97a0-31e9-4c23-ac71-d18cb19eeb33', 'Colageno Fine Smooth', 23000, 1, 0, '2023-10-02 13:10:41', NULL, '2023-10-02 13:10:41'),
('99f74942-652c-4b10-b3dc-a1a430d90f45', '2db95889-2f6a-4ca4-8aa6-8ba61ff3eb39', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 3, 13, '2023-09-28 22:03:06', NULL, '2023-09-28 22:03:06'),
('9a60dc48-8d70-4a65-90a8-14e58abc94e7', 'd53bf083-f698-4492-b443-80b48c7cbdab', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 3, 13, '2023-08-28 16:41:01', NULL, '2023-08-28 16:41:01'),
('9b202b3a-2ba4-4525-a020-a9cdae14d893', 'd3886528-8981-4d59-99b3-e1ad6123ae06', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 1, 13, '2023-09-22 17:13:11', NULL, '2023-09-22 17:13:11'),
('9bebeb7c-24b9-4b92-bf4b-07fe69c8d31f', '0f930489-cb90-4f5e-9afe-085abed52c8f', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 9, 13, '2023-09-25 15:23:20', NULL, '2023-09-25 15:23:20'),
('9ede429b-6958-4b07-b260-8dd44771f9e1', '31769eab-989a-47e1-b59f-4885b51efafb', 'db005c8d-ccd0-4e0e-9d36-aaed244e8559', 'Crema despigmentante', 15000, 1, 0, '2023-10-02 23:34:41', NULL, '2023-10-02 23:34:41'),
('9f149741-3d79-4f51-8df1-a40cdd8d9bb3', 'c9a4a1ec-d1b5-45c3-a0c9-2630cedc2165', '83838646-6969-449d-8132-2ad967701c64', 'Colageno Fine Peak ', 24000, 1, 0, '2023-09-22 17:13:54', NULL, '2023-09-22 17:13:54'),
('9fd8739b-27f1-4381-a792-3f38c51590fb', 'ccfc22cf-c656-4a64-aec0-86d416151685', '91ca97a0-31e9-4c23-ac71-d18cb19eeb33', 'Colageno Fine Smooth', 23000, 1, 0, '2023-10-01 22:53:51', NULL, '2023-10-01 22:53:51'),
('a18836db-3bce-4a9f-8118-b434ad2eaa7f', '9159dab4-5100-4c0e-878f-35f80cb386aa', '91ca97a0-31e9-4c23-ac71-d18cb19eeb33', 'Colageno Fine Smooth', 20700, 1, NULL, '2023-08-22 03:00:00', NULL, '2023-08-22 03:00:00'),
('a3375307-eaa7-4e7d-b738-b8fa0728c4b9', '88aa19cc-130b-4f48-8f7c-f57ff6fb14cd', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 1, 13, '2023-09-21 22:02:34', NULL, '2023-09-21 22:02:34'),
('a4fff1b5-46b7-46a6-ab83-d91043ec518d', '34b760d5-23cc-4aef-aeef-359cc2c3f1e1', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 4, 13, '2023-10-01 15:11:42', NULL, '2023-10-01 15:11:42'),
('a5751b23-eb14-445d-b607-de52135ff1db', '5de5cfc2-4711-4dc7-94b6-65f560239dec', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 1, 0, '2023-08-28 03:00:00', NULL, '2023-08-28 03:00:00'),
('a724f09b-ed48-4674-82d6-3f5caab607c7', '596cc1db-1091-407e-8e06-77cde7747cf8', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 3, 13, '2023-10-02 13:10:41', NULL, '2023-10-02 13:10:41'),
('a9b09a6b-edad-450a-a9a7-325257fba5ea', '05590144-cb8d-41b4-a385-d4b6f93894ff', 'b2e86191-8b70-431b-9808-ba754697ac2b', 'Objeto para probar mainIM', 22222, 1, NULL, '2023-08-05 03:00:00', NULL, '2023-08-05 03:00:00'),
('b138c088-b418-4fa5-8ccb-c3040b5b494d', 'ed2774fd-cbb8-416c-8706-928e0274fceb', '91ca97a0-31e9-4c23-ac71-d18cb19eeb33', 'Colageno Fine Smooth', 23000, 3, 0, '2023-09-28 22:20:01', NULL, '2023-09-28 22:20:01'),
('b153a50e-f450-4008-9dec-fa3a9774b1c4', '8be753c5-d853-4563-ae7b-c4d5c91cd702', 'db005c8d-ccd0-4e0e-9d36-aaed244e8559', 'Crema despigmentante', 15000, 1, 0, '2023-09-21 22:01:43', NULL, '2023-09-21 22:01:43'),
('b1fa432d-d7e6-4fb1-9e99-c7724e6a6924', '02a7e9b0-8a77-4cc1-a7d4-31dbc0aa67b9', '91ca97a0-31e9-4c23-ac71-d18cb19eeb33', 'Colageno Fine Smooth', 20700, 1, NULL, '2023-08-22 03:00:00', NULL, '2023-08-22 03:00:00'),
('b7af9c45-0f9e-49c4-a70b-b676350fad13', '763cc76a-3949-4ce8-be11-119e1132cc78', 'db005c8d-ccd0-4e0e-9d36-aaed244e8559', 'Crema despigmentante', 15000, 1, 0, '2023-09-22 16:19:23', NULL, '2023-09-22 16:19:23'),
('b96e1bb3-3937-4620-9cb2-7207b003decd', 'ccba0726-7d7b-4398-b033-c74be28e78e4', '91ca97a0-31e9-4c23-ac71-d18cb19eeb33', 'Colageno Fine Smooth', 23000, 4, 0, '2023-09-28 22:22:51', NULL, '2023-09-28 22:22:51'),
('ba21064f-2e69-41bc-b9c5-f772886c53fd', 'c9c86ab4-b8b4-464f-bfeb-fc02cf1fc84a', '91ca97a0-31e9-4c23-ac71-d18cb19eeb33', 'Colageno Fine Smooth', 23000, 1, 0, '2023-08-28 03:00:00', NULL, '2023-08-28 03:00:00'),
('ba4457ec-4976-4129-9178-6a3d3678a96b', '8be753c5-d853-4563-ae7b-c4d5c91cd702', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 1, 13, '2023-09-21 22:01:43', NULL, '2023-09-21 22:01:43'),
('ba77f3da-9797-4e5d-8a3e-cd989bb767b8', '3bdc1f1e-a166-4537-9cad-b11cd9cec325', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 1, 13, '2023-10-02 03:19:49', NULL, '2023-10-02 03:19:49'),
('bbdbced2-67a4-4767-92de-8bc3c2b8c02d', '5b236ed8-75d4-42de-91c4-a11405eeb141', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 1, NULL, '2023-08-05 03:00:00', NULL, '2023-08-05 03:00:00'),
('bbeb66d3-c4f2-4885-ad93-35f15548d7fc', 'ccafdf33-da6e-45b2-a144-4194a1e2f536', '91ca97a0-31e9-4c23-ac71-d18cb19eeb33', 'Colageno Fine Smooth', 23000, 1, 0, '2023-10-01 22:53:37', NULL, '2023-10-01 22:53:37'),
('bc04398f-9cd4-473b-9947-d03f39d80696', '573c5aaa-0554-41c1-b3db-ae6632143c03', '83838646-6969-449d-8132-2ad967701c64', 'Colageno Fine Peak ', 24000, 1, 0, '2023-09-22 16:38:32', NULL, '2023-09-22 16:38:32'),
('bcf9844c-8baf-41a4-80b6-5a3bc6e1a77e', '1bbc68f2-6cf4-4148-b4f8-9cab0259c3e3', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 1, 13, '2023-09-22 17:16:44', NULL, '2023-09-22 17:16:44'),
('c16b2bcd-f842-4dc5-8485-a032450d6466', 'a3a73685-3faa-4f65-ac05-5deca7b77f2a', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 1, 15, '2023-08-24 03:00:00', NULL, '2023-08-24 03:00:00'),
('c17aa8ac-ea77-4d3b-8de1-59fad71d00f4', 'f5560c91-f92c-4471-b312-4f2df4c7d325', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 5, 13, '2023-09-25 13:59:22', NULL, '2023-09-25 13:59:22'),
('c4f1b764-d55d-4c61-af8a-653ae5486e25', '3fba444f-b2e4-4253-a3f0-1936c151f1ae', 'ac4abb69-97ed-4d09-87c4-c3da48ce15f8', 'Colageno Fine Power', 20000, 3, NULL, '2023-08-05 03:00:00', NULL, '2023-08-05 03:00:00'),
('c689ac2f-c49e-49ab-9b21-7d255adcf9b5', 'be2cec0d-9c25-4e35-965f-998e6d1887bb', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 6, 13, '2023-09-25 15:19:09', NULL, '2023-09-25 15:19:09'),
('cbbd2851-5776-4e86-a7b7-23d62e6c6b7e', 'c3e168ea-0962-4d0d-a09e-c661335a9869', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 2, 13, '2023-09-28 22:24:36', NULL, '2023-09-28 22:24:36'),
('ccbfe0be-48a2-4168-bdd2-059aaa8c0a84', 'ac29cc6e-ccf6-4eb6-ae59-7d0f30690e97', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 4, 0, '2023-08-28 03:00:00', NULL, '2023-08-28 03:00:00'),
('ce7c4b34-d256-41f6-9f5b-8d82cbecdcd2', 'abcc024b-2609-44aa-817b-c035431b63b2', '91ca97a0-31e9-4c23-ac71-d18cb19eeb33', 'Colageno Fine Smooth', 23000, 1, 0, '2023-08-28 03:00:00', NULL, '2023-08-28 03:00:00'),
('cee11880-c1cb-4b7c-b07a-516911edd2fe', 'a016e944-637d-4596-ab05-a512fe51a4af', '91ca97a0-31e9-4c23-ac71-d18cb19eeb33', 'Colageno Fine Smooth', 20700, 1, NULL, '2023-08-22 03:00:00', NULL, '2023-08-22 03:00:00'),
('d450d524-c77b-42c5-bc05-929424db610d', 'ca032370-8c29-4b98-994f-8bde31ee525d', '9965b799-1f1b-43d1-8537-c9713373188e', 'Crema Anti Age 360', 13000, 3, 0, '2023-08-28 03:00:00', NULL, '2023-08-28 03:00:00'),
('d70c0b02-00d9-4b3f-bf2b-95ab0203580e', 'b2353be1-e708-4e08-a57e-24337533b638', 'b2e86191-8b70-431b-9808-ba754697ac2b', 'Objeto para probar mainIM', 22222, 1, NULL, '2023-08-05 03:00:00', NULL, '2023-08-05 03:00:00'),
('d77bca2f-7186-4935-839c-070829dd2a8c', 'ed57a561-56f7-4a57-8e1a-2e6027e1149d', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 9, 13, '2023-09-25 15:34:22', NULL, '2023-09-25 15:34:22'),
('d7aaab57-2266-4919-a3f1-2531570cb8cf', '147ad2ad-dbd8-4572-af9d-b9117b5dfa82', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 5, 13, '2023-09-25 15:11:30', NULL, '2023-09-25 15:11:30'),
('d891e4c4-c5c3-4718-a88e-580063f21005', 'c3e168ea-0962-4d0d-a09e-c661335a9869', '91ca97a0-31e9-4c23-ac71-d18cb19eeb33', 'Colageno Fine Smooth', 23000, 1, 0, '2023-09-28 22:24:36', NULL, '2023-09-28 22:24:36'),
('d8a7d930-0a5d-4430-b85c-68cdf43289c0', '41c3d4ff-9f2a-4534-9d38-aba6f791ec3f', '91ca97a0-31e9-4c23-ac71-d18cb19eeb33', 'Colageno Fine Smooth', 23000, 1, 0, '2023-08-28 03:00:00', NULL, '2023-08-28 03:00:00'),
('da72dc47-70fd-4575-8c4a-ed1d6d9de9af', '7e2239f3-3411-41a9-9e3b-51ab66682f20', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 1, 0, '2023-08-28 03:00:00', NULL, '2023-08-28 03:00:00'),
('dd7e566a-37ef-4b68-8276-00d9d99e82b3', 'b2353be1-e708-4e08-a57e-24337533b638', '79cbdf23-309b-4f2f-9834-9d6fd5de5251', 'Silk Glow Sleepwear  ', 6000, 1, NULL, '2023-08-05 03:00:00', NULL, '2023-08-05 03:00:00'),
('ddc7401a-0ea1-4e61-8d08-267fca3b08eb', '03228abd-4443-4f40-8391-395070ed0db6', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 5, 13, '2023-09-25 15:12:54', NULL, '2023-09-25 15:12:54'),
('de135c3a-cd98-42ca-a4d4-461c36c9f8fb', 'ae902c4e-8dcf-44e6-af4e-ec16139714da', 'db005c8d-ccd0-4e0e-9d36-aaed244e8559', 'Crema despigmentante', 15000, 2, 0, '2023-10-03 18:38:29', NULL, '2023-10-03 18:38:29'),
('de17c967-789e-4f32-9bbd-c5a2675a1952', '8195143a-45f0-4554-b077-a20c4a059cec', '79cbdf23-309b-4f2f-9834-9d6fd5de5251', 'Silk Glow Sleepwear  ', 6000, 1, NULL, '2023-08-05 03:00:00', NULL, '2023-08-05 03:00:00'),
('df7fbc3f-bbbe-4f9a-905a-3c3debad14c5', '88aa19cc-130b-4f48-8f7c-f57ff6fb14cd', 'db005c8d-ccd0-4e0e-9d36-aaed244e8559', 'Crema despigmentante', 15000, 1, 0, '2023-09-21 22:02:34', NULL, '2023-09-21 22:02:34'),
('e09e8413-b5e8-446e-8991-ce69f4c8fe78', '2b843690-b382-4d8d-b4b1-f8585eac3985', 'db005c8d-ccd0-4e0e-9d36-aaed244e8559', 'Crema despigmentante', 15000, 1, 0, '2023-10-03 00:19:24', NULL, '2023-10-03 00:19:24'),
('e0c40272-a2c5-4676-932c-6ed35b5e4230', '41c3d4ff-9f2a-4534-9d38-aba6f791ec3f', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 1, 0, '2023-08-28 03:00:00', NULL, '2023-08-28 03:00:00'),
('e146cef4-c38b-4112-8e7a-1404f4b2e617', 'a096e365-e966-4505-8531-43707f7b4ab5', '91ca97a0-31e9-4c23-ac71-d18cb19eeb33', 'Colageno Fine Smooth', 23000, 6, 0, '2023-08-28 03:00:00', NULL, '2023-08-28 03:00:00'),
('e1c1c802-bd28-4fcd-8dbf-661eb5e8535e', '3fba444f-b2e4-4253-a3f0-1936c151f1ae', 'b2e86191-8b70-431b-9808-ba754697ac2b', 'Objeto para probar mainIM', 22222, 1, NULL, '2023-08-05 03:00:00', NULL, '2023-08-05 03:00:00'),
('e6212cbc-a542-4d2f-a6d5-3f92164d6747', '898b8246-d996-4a92-85b0-4bbc90f58362', '83838646-6969-449d-8132-2ad967701c64', 'Colageno Fine Peak ', 24000, 1, 0, '2023-09-22 17:09:05', NULL, '2023-09-22 17:09:05'),
('e9eac488-a8b7-49a5-a5eb-966a92ee4b05', '12de16a6-6c7b-465e-bb95-ea8a8dd9f73e', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 6, 13, '2023-09-25 15:15:29', NULL, '2023-09-25 15:15:29'),
('edf7da58-96d7-4c1a-bc13-d9bdacaa9565', '12f8afa6-8307-40fd-bb76-cddaa72b4182', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 1, 13, '2023-09-25 14:06:10', NULL, '2023-09-25 14:06:10'),
('ef9f39a6-8a2e-4a96-b15b-1986a6174908', '8195143a-45f0-4554-b077-a20c4a059cec', 'b2e86191-8b70-431b-9808-ba754697ac2b', 'Objeto para probar mainIM', 22222, 1, NULL, '2023-08-05 03:00:00', NULL, '2023-08-05 03:00:00'),
('f239d0e5-4efc-430c-9014-6e522b580a8c', 'f6ac5280-ed02-4d2e-8b20-39d5ff84ddee', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 1, 13, '2023-10-02 03:18:16', NULL, '2023-10-02 03:18:16'),
('f45058d6-9f17-46e9-a55a-e731337123cd', '21ce4bcf-c9f2-43bd-9035-c4dbcb69c419', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 1, 13, '2023-09-25 14:08:32', NULL, '2023-09-25 14:08:32'),
('f5147bec-4081-444d-aa7c-e995d223fde2', 'ce4d46a9-89b2-46a6-8abd-5caeea62a43c', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 6, 13, '2023-09-25 15:01:48', NULL, '2023-09-25 15:01:48'),
('f98f1f01-f1eb-4440-b227-bbb793beea9e', 'd36e2f74-87eb-48c6-8780-f87ebc44a6d1', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 6, 13, '2023-09-25 15:01:58', NULL, '2023-09-25 15:01:58'),
('fb47bd88-067a-4ab3-811d-4a9b1c56bff5', '2ae38b2c-42c8-4cf6-ab29-91ebce417edc', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 1, 13, '2023-09-22 17:20:04', NULL, '2023-09-22 17:20:04'),
('fc6b2b73-40d8-42d2-a567-2be9f31391be', '9e3cb10d-c760-4722-8d29-3e97148cb8f5', 'ac4abb69-97ed-4d09-87c4-c3da48ce15f8', 'Colageno Fine Power', 20000, 3, NULL, '2023-08-05 03:00:00', NULL, '2023-08-05 03:00:00'),
('fc7d2b75-e61f-4249-b3c2-b6faf7a568ad', '57426d78-cded-4dab-bc3b-9c8381d0d104', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 1, 13, '2023-09-25 14:04:06', NULL, '2023-09-25 14:04:06'),
('fe2829ea-10c1-4fc0-8ec6-1978f9683dc9', 'c9a4a1ec-d1b5-45c3-a0c9-2630cedc2165', '0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 1, 13, '2023-09-22 17:13:54', NULL, '2023-09-22 17:13:54'),
('fee62e32-3130-4e34-8580-9970bbed179b', 'b2353be1-e708-4e08-a57e-24337533b638', 'ac4abb69-97ed-4d09-87c4-c3da48ce15f8', 'Colageno Fine Power', 20000, 3, NULL, '2023-08-05 03:00:00', NULL, '2023-08-05 03:00:00');

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
  `stock` int(11) DEFAULT NULL,
  `ingredients` text DEFAULT NULL,
  `size` text DEFAULT NULL,
  `discount` tinyint(3) UNSIGNED DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL,
  `volume` float DEFAULT NULL,
  `wieght` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `description`, `category_id`, `stock`, `ingredients`, `size`, `discount`, `createdAt`, `updatedAt`, `deletedAt`, `volume`, `wieght`) VALUES
('0d0cd130-d652-41e1-b7e6-da9553322823', 'Pads de limpieza Facial', 2000, 'Son el complemento ideal de nuestra “Espuma de Limpieza 3 en 1” para una limpieza facial excepcional. Diseñados para ayudar a eliminar eficazmente el maquillaje e impurezas, dejando tu piel limpia y fresca. Cada Pad presenta dos texturas diferentes: una suave y delicada para una limpieza gentil, ideal para zonas sensibles, y otra exfoliante para una limpieza más profunda y efectiva en áreas que necesitan mayor atención. Estas dos opciones te permiten personalizar tu rutina de limpieza según las necesidades de tu piel.\r\n\r\n??Son fáciles de limpiar: simplemente enjuágalos con agua y jabón luego de cada uso y estarán listos para la próxima limpieza facial.', 1, 0, '', '', 13, '2023-07-31 16:33:02', '2023-08-28 16:40:15', NULL, NULL, NULL),
('1c58ddbd-a791-46eb-b98a-611a00af2645', 'Prueba', 5000, 'Descripcion\r\n\r\nOtra mas\r\n\r\nY una mas', 1, NULL, '', '', NULL, '2023-08-01 18:15:28', '2023-08-01 18:21:35', '2023-08-01 18:21:46', NULL, NULL),
('46bf971d-62f1-4b96-b727-d2cafa725f42', 'Prueba para borrar', 22222, 'asdsdaasads', 1, NULL, 'Un ingrediente', '1 blister de 30 pastillas', 0, '2023-07-31 18:05:32', '2023-08-25 19:07:37', NULL, NULL, NULL),
('4d05e5c1-1827-4bfe-8b74-f30bbabca8b0', 'Jano', 2222, 'asddasdsaads', 1, NULL, 'Muchos', 'Grande', NULL, '2023-08-02 16:54:12', '2023-08-02 16:54:53', '2023-08-11 17:28:23', NULL, NULL),
('5a1d4ed8-135f-4177-b7ce-0a239b7f1afc', 'Silk Glow Sleepwear  ', 6000, '<p>Funda de Almohada de Seda.\nUn secreto de belleza olvidado hacía mucho tiempo. \nEsta funda de almohada de seda hipoalergénica es una experiencia de lujo para tu piel y cabello. \nPermite que la piel se beneficie al máximo de las propiedades de los productos de ‘skincare’ y ayuda a prevenir la aparición de arrugas, líneas finas y marcas de presión, lo que resulta en una piel más tersa y radiante. Evita el frizz, reduce el daño causado por el roce y mejora la suavidad y brillo natural de tu melena mientras duermes.\nIdeal para personas con piel sensible o alergias.\n¡Mejora tu rutina de sueño y belleza con este lujo accesible y saludable para tu piel y cabello! ?\nSe recomienda lavar de adentro hacia afuera con agua fría y utilizando jabón líquido neutro suave, para obtener mejores resultados y garantizar su durabilidad.</p>', 1, NULL, NULL, NULL, NULL, '2023-07-31 16:32:00', '2023-07-31 16:32:00', '2023-07-31 16:34:22', NULL, NULL),
('79cbdf23-309b-4f2f-9834-9d6fd5de5251', 'Silk Glow Sleepwear  ', 6000, 'Funda de Almohada de Seda. Un secreto de belleza olvidado hacía mucho tiempo. Esta funda de almohada de seda hipoalergénica es una experiencia de lujo para tu piel y cabello. Permite que la piel se beneficie al máximo de las propiedades de los productos de ‘skincare’ y ayuda a prevenir la aparición de arrugas, líneas finas y marcas de presión, lo que resulta en una piel más tersa y radiante. Evita el frizz, reduce el daño causado por el roce y mejora la suavidad y brillo natural de tu melena mientras duermes. Ideal para personas con piel sensible o alergias. ¡Mejora tu rutina de sueño y belleza con este lujo accesible y saludable para tu piel y cabello! ? Se recomienda lavar de adentro hacia afuera con agua fría y utilizando jabón líquido neutro suave, para obtener mejores resultados y garantizar su durabilidad.', 1, 0, '', '', 0, '2023-07-31 16:31:57', '2023-08-25 19:07:37', NULL, NULL, NULL),
('7e4b718f-1f11-452f-9aa9-54d9a059d881', 'Bálsamo Lip Glow', 10000, 'HIDRATACIÓN + VOLUMEN 3D ? Este aterciopelado bálsamo con esencia de menta calma, restaura y acondiciona los labios con un toque de máxima suavidad y efecto repulpante. La concentración de activos, su textura y su suave efecto mentolado contribuye a combatir la sequedad al instante, nutriendo, restaurando y fortaleciendo la barrera de hidratación natural de tus labios. Se convertirá en un paso fundamental de tu rutina diaria. ✨.', 1, NULL, '', '', 0, '2023-07-12 13:35:15', '2023-08-25 19:07:37', NULL, NULL, NULL),
('83838646-6969-449d-8132-2ad967701c64', 'Colageno Fine Peak ', 24000, 'El empujón que necesitabas para llegar a tu cima. Poderoso blend termogénico que te ayuda a bajar de peso. Reduce el apetito, aumenta el gasto calórico y energético y estimula el drenaje linfático. Es antioxidante y antiinflamatorio. Además, por su alta concentración de péptidos bioactivos de colágeno hidrolizado y aminoácidos, retrasa el envejecimiento y mejora el aspecto de la piel, las uñas y el cabello.', 1, 0, '', '', 0, '2023-07-31 16:39:56', '2023-08-25 19:07:37', NULL, NULL, NULL),
('91ca97a0-31e9-4c23-ac71-d18cb19eeb33', 'Colageno Fine Smooth', 23000, '\\\\\\\\\\\\\\\\-Combate la celulitis -Posee propiedades antiinflamatorias -Favorece al drenaje linfático y eliminación de toxinas del organismo -Reduce los depositos de grasa del organismo -Mejora la salid vascular oxigenando los tejidos -Mejora la tenacidad y elasticidad de la piel -Previene la pérdida de colágeno -Tiene capacidad antioxidante', 1, 0, '', '', 0, '2023-07-31 16:41:19', '2023-08-25 19:07:37', NULL, NULL, NULL),
('9965b799-1f1b-43d1-8537-c9713373188e', 'Crema Anti Age 360', 13000, '\r\nCreamos una crema enfocada en combatir el envejecimiento cutáneo de forma global. Su textura es sedosa y de rápida absorción.  Favorece la renovación celular, fortalece la barrera cutánea y devuelve la elasticidad y flexibilidad a tu piel. ✨Ayuda a combatir los signos del envejecimiento, gracias a su novedosa combinación de activos: Retinol, Matrixyl, Carnosina y Gluconolaciona que actúan en sinergia estimulando la producción de colágeno, elastina y ácido hialurónico. Además, refuerzan la barrera cutánea protegiéndola de los agentes externos y devuelven luminosidad, elasticidad y flexibilidad a la piel✨. Libre de Fragancia. Libre de Parabenos. \r\n??MODO DE USO: Aplicar de día y/o noche sobre la superficie de la piel de rostro, cuello y escote una vez limpia y seca; realizando suaves movimientos ascendentes hasta su absorción.\r\n', 1, 0, NULL, NULL, 0, '2023-07-21 16:42:49', '2023-08-25 19:07:37', NULL, NULL, NULL),
('a541d777-7dce-426b-aaa8-421978c2486e', 'Producto prueba Formato', 3333, 'Este es un formato para la prueba del formato esperado. Este producto viene bien. Lorem ipsum lorem ipsum.', 1, NULL, NULL, NULL, NULL, '2023-07-26 17:58:28', '2023-07-26 18:25:09', '2023-07-31 16:48:55', NULL, NULL),
('a9c2dc18-3086-4d3c-94b6-18f5f5db2e6b', 'Espuma de limpieza 3 en 1', 9000, 'Limpia, desmaquilla e hidrata ? La limpieza facial es un paso indispensable y necesario para mantener una piel saludable luminosa y protegida de los contaminantes que generan el envejecimiento prematuro. ??Limpiar es el primer paso fundamental de tu rutina de skincare. Su fórmula en espuma micelar retira rápida, suave y fácilmente el maquillaje y las impurezas. Dejando una piel visiblemente más fresca, limpia e hidratada. Está específicamente pensado para pieles de normales a mixtas. ✨Libre de fragancia, colorantes y parabenos. ✨ \r\n??MODO DE USO: Aplicar por la mañana y por la noche con suaves movimientos circulares en rostro, cuello y escote. Enjuagar con agua y con ayuda de nuestro exclusivo Pad de Limpieza para una mejor remoción. \r\n', 1, NULL, NULL, NULL, 0, '2023-07-12 16:12:02', '2023-08-25 19:07:37', NULL, NULL, NULL),
('ac4abb69-97ed-4d09-87c4-c3da48ce15f8', 'Colageno Fine Power', 20000, '<ul>\n<li>Contiene los antioxidantes más       poderosos</li>\n<li>Posee un alto contenido en proteínas.</li>\n<li>Mantiene las articulaciones saludables.</li>\n<li>Aumenta la energía y la recuperación post ejercicio</li>\n<li>Reduce la ansiedad y el estrés.</li>\n<li>Promueve el fortalecimiento de tendones y colágeno articular </li>\n<li>Aumenta la asimilación del calcio y el hierro.</li>\n<li>Disminuye y evita la aparición de nuevas arrugas. Ayuda a prevenir lesiones.</li>\n<li>Previene la pérdida de cabello</li>\n<li>Disminuye la adherencia de las lipoproteínas de colesterol.</li>\n</ul>', 1, NULL, NULL, NULL, 0, '2023-07-31 16:38:35', '2023-08-25 19:07:37', NULL, NULL, NULL),
('b2e86191-8b70-431b-9808-ba754697ac2b', 'Objeto para probar mainIM', 22222, 'adscsadcasdcas', 1, 0, 'adsdsadas', '10g sanax', 0, '2023-08-02 16:21:24', '2023-08-15 13:54:41', '2023-08-15 13:56:28', NULL, NULL),
('c1f196b4-8861-4032-ba39-523530df0299', 'Latisse', 15000, 'LATISSE es un tratamiento del laboratorio francés Allergan, aprobado por la FDA y sin parabenos que permite obtener pestañas más largas, gruesas y oscuras. Se aplica por la noche antes de ir a dormir. ??Los resultados comienzan a verse a las 4 semanas de aplicación, viendo resultados completos a la semana 12 del tratamiento. Luego se aplica 1 vez por semana para mantenimiento. Está indicado en cualquier persona que desee mejorar el aspecto de sus pestañas.', 1, NULL, NULL, NULL, 0, '2023-07-21 16:44:41', '2023-08-25 19:07:37', NULL, NULL, NULL),
('db005c8d-ccd0-4e0e-9d36-aaed244e8559', 'Crema despigmentante', 15000, 'Posee una fórmula innovadora con un poderoso complejo anti-manchas. Su acción despigmentante de rápida absorción ayuda a unificar el color de la piel disminuyendo notablemente manchas e hiperpigmentaciones en rostro, cuello y escote, ayudando también a prevenirlas. Logra un aspecto más uniforme de la piel ✨Su formulación sinérgica aporta luminosidad, brillo y tersura a la piel✨. Ingredientes: Tranexámico 3% + Niacinamida 2% + Vit C 4% + Arbutina 2%. Exfolia y normaliza la renovación celular. Reduce los efectos negativos del estrés y la contaminación. ? Nuestra filosofía de pureza: Sin parabenos. Sin sulfatos. Sin fragancia. Piel simplemente feliz. :) Hipoalergénico. Free Mineral Oil. ??MODO DE USO: Aplicar únicamente por la noche sobre la superficie de la piel a tratar, una vez limpia y seca, en rostro, cuello y escote. Se recomienda complementar con nuestro Serum de Vitamina C. Utilizar protección solar si se aplica durante el día.', 1, 12, '', '', 0, '2023-07-04 11:31:11', '2023-08-25 19:07:37', NULL, NULL, NULL),
('e3da8d17-89bb-4f42-8ae7-77791d9f4533', 'Contorno de Ojos', 12000, 'Nuestra fórmula ofrece tratamiento y prevención a la delicada piel del contorno de ojos otorgando luminosidad y revitalización de la mirada ✨?️. Posee una concentración de activos que renuevan el aspecto de la piel alisándola y favoreciendo la microcirculación; desacelera la aparición de líneas de expresión y prolonga la duración de la toxina botulínica por su gran concentración de Argireline. ? Nuestra presentación con dosificador ofrece excelente comodidad en su uso y garantiza la efectividad del tratamiento. Para todo tipo de piel. Sin fragancias ni parabenos. \r\n?? MODO DE USO: Extrae una pequeña cantidad de crema utilizando el aplicador a presión. Aplica la crema en pequeños puntos alrededor del contorno de los ojos. Con movimientos suaves y circulares difumina la crema utilizando el aplicador. Esto ayudará a mejorar la absorción y promoverá una apariencia más rejuvenecida.\r\n', 1, NULL, NULL, NULL, 0, '2023-07-12 16:10:48', '2023-08-25 19:07:37', NULL, NULL, NULL),
('f05669b2-7376-4d5c-9e4a-6f2bd654cd89', 'Serum de Vitamina C', 13000, 'Con su textura perfecta este poderoso concentrado de Vitamina C tiene una triple acción: - Antioxidante. - Revitalizante. - Anti-Age. Además actúa como un potente protector de la polución dejando la piel visiblemente calmada y renovada. Aporta una luminosidad inigualable desde su primera aplicación ✨ Apta para todo tipo de piel.  \r\nMODO DE USO: Aplicar 3 a 4 gotas por día sobre la superficie de la piel, una vez limpia y seca. Puede aplicarse en rostro, cuello, escote y dorso de manos, masajeando suavemente hasta su absorción. Recomendamos dejar actuar unos instantes antes de aplicar su crema de tratamiento habitual y utilizar protección solar de ser aplicado durante el día.\r\n', 1, NULL, NULL, NULL, 0, '2023-07-21 16:35:52', '2023-08-25 19:07:37', NULL, NULL, NULL);

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
(123, 's1qb1vngse.webp', 'db005c8d-ccd0-4e0e-9d36-aaed244e8559', 1, 1),
(124, 'fnax6jdtlr.webp', 'f05669b2-7376-4d5c-9e4a-6f2bd654cd89', 1, NULL),
(125, 'b8da891hrl.webp', '79cbdf23-309b-4f2f-9834-9d6fd5de5251', 1, 0),
(126, 'slddsu2f39.webp', '5a1d4ed8-135f-4177-b7ce-0a239b7f1afc', 1, NULL),
(127, 'kag8q89m0h.webp', '0d0cd130-d652-41e1-b7e6-da9553322823', 1, 0),
(128, 'tg5aklncdz.webp', 'c1f196b4-8861-4032-ba39-523530df0299', 1, NULL),
(129, 'lf2fhx8d.webp', 'ac4abb69-97ed-4d09-87c4-c3da48ce15f8', 1, NULL),
(130, 'kt26rcc2n4.webp', '83838646-6969-449d-8132-2ad967701c64', 1, 0),
(131, 'jcwqnnzy10.webp', '91ca97a0-31e9-4c23-ac71-d18cb19eeb33', 1, 1),
(160, 'ecxbvfyvls.webp', '46bf971d-62f1-4b96-b727-d2cafa725f42', 1, 0),
(161, 'qklta3qc75.webp', '46bf971d-62f1-4b96-b727-d2cafa725f42', 1, 1),
(217, 'zbj0nr4qzm.webp', '46bf971d-62f1-4b96-b727-d2cafa725f42', 1, 0),
(240, 'txr4e703zc.webp', 'b2e86191-8b70-431b-9808-ba754697ac2b', 1, 0),
(241, 's9qignjy8c.MP4', 'b2e86191-8b70-431b-9808-ba754697ac2b', 2, 0),
(242, 's70snixo1d.webp', 'b2e86191-8b70-431b-9808-ba754697ac2b', 1, 1);

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
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `shipping_addresses`
--

INSERT INTO `shipping_addresses` (`id`, `street`, `apartment`, `city`, `provinces_id`, `zip_code`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
('0e0e36c6-1bd2-468a-9cec-b39e0f74e136', NULL, NULL, NULL, 1, NULL, '2023-08-07 15:14:08', '2023-08-07 16:20:25', NULL),
('2', 'Juana Azurduy', NULL, 'Nunez', 1, '1430', NULL, '2023-07-04 14:16:24', NULL),
('2be1e035-196a-4762-9252-8b0b690f279f', 'Nueva Calle 2222', '2A', 'Pompeya', 1, '1444', '2023-10-01 15:11:42', '2023-10-01 15:11:42', NULL),
('3', 'Libertador 2232', '3B', 'Nuñez', 1, '1430', '2023-07-04 14:35:12', '2023-07-15 23:03:08', NULL),
('30cb8ec9-a017-4399-b920-ed141012af2c', 'Livertador 1300', NULL, 'CABA', 1, '1212', '2023-07-13 00:46:10', '2023-07-13 01:06:06', NULL),
('399e95d1-5ef1-42ed-b8d2-1adce5317fae', '3 de Febrero 3302', NULL, 'Nuñéz', 1, '1429', '2023-09-22 16:19:23', '2023-09-22 16:19:23', NULL),
('4', 'Corrientes', NULL, 'Nuñez', 1, '1429', '2023-07-04 20:56:40', '2023-07-04 20:56:40', NULL),
('5', 'Santa fe 329', '3f', 'caba', 1, '1111', '2023-07-12 20:31:05', '2023-07-12 20:31:05', NULL),
('564f158e-0cfa-4a02-ba82-dda1b5ce99fb', 'Callao 6969', '10A', 'CABA', 1, '1469', '2023-07-15 23:03:09', '2023-08-28 15:03:04', NULL),
('5e26ad3a-5a9a-4f06-960d-036f9597ed41', 'Juncal 2222', '3a', 'Recoleta', 1, '1211', '2023-07-18 00:10:30', '2023-07-18 00:10:30', NULL),
('6', 'Santa Fe 312', '0', 'CABA', 1, '1111', '2023-07-12 20:51:28', '2023-07-12 20:51:28', NULL),
('6c6412fa-f589-46f9-a153-3f637b06b287', 'Juana Azurduy 1730', NULL, 'Nuñez', 1, '1429', '2023-07-17 16:57:11', '2023-07-17 16:57:11', NULL),
('73d98bfc-77c4-4da7-9796-f147dd01ab84', 'Juncal 2222', '3a', 'Recoleta', 1, '1211', '2023-07-18 00:11:58', '2023-07-18 00:11:58', NULL),
('76205f7b-1754-4108-84f2-649147d848d4', NULL, NULL, NULL, 1, NULL, '2023-07-17 23:24:15', '2023-07-17 23:24:17', NULL),
('86ac7d72-41fd-4990-9c3a-931989738770', '3 de Febrero 3302', NULL, 'Nuñéz', 1, '1429', '2023-09-28 23:14:48', '2023-09-28 23:14:48', NULL),
('a83e27c8-4833-42a8-b90d-8f320c1e56eb', 'Juncal 2222', '3a', 'Recoleta', 1, '1211', '2023-07-18 00:08:15', '2023-07-18 00:08:15', NULL),
('b10745d1-6a13-4fe2-87cc-72f5a101f159', 'Vieja Direccion', '2A', 'PALERMO', 1, '1444', '2023-08-28 16:20:00', '2023-08-28 16:20:00', NULL),
('b220e5f7-0200-436a-9d5b-fd8049637c89', '3 de Febrero 3302', NULL, 'Nunez', 1, '1429', '2023-08-28 16:22:50', '2023-08-28 16:22:50', NULL),
('b7481e1a-d83e-4a1f-8b78-da3f2aab8c60', 'Nueva Direccion', NULL, 'PALERMO', 1, '1444', '2023-08-28 16:17:04', '2023-08-28 16:17:04', NULL),
('e5edf259-8e15-4b62-8a46-6e9df537024f', NULL, NULL, NULL, 1, NULL, '2023-07-31 21:52:04', '2023-07-31 21:52:04', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `specialties`
--

CREATE TABLE `specialties` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `filename` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `specialties`
--

INSERT INTO `specialties` (`id`, `name`, `filename`) VALUES
(1, 'Estética facial', NULL),
(2, 'Medicina Regenerativa', NULL),
(3, 'Estética corporal', NULL),
(4, 'ODONTOLOGIA', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `specialties_services`
--

CREATE TABLE `specialties_services` (
  `id` int(11) NOT NULL,
  `specialties_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `filename` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `specialties_services`
--

INSERT INTO `specialties_services` (`id`, `specialties_id`, `name`, `description`, `filename`) VALUES
(1, 1, 'Armonización facial', 'La percepción de un rostro bello, armónico y natural depende fundamentalmente de las proporciones de una parte de nuestro rostro en relación con otra.', NULL),
(2, 1, 'BOTOX®️', 'Uno de los tratamientos con más demanda a nivel mundial, del que podemos beneficiarnos en sus múltiples usos.', NULL),
(3, 1, 'COSMETOLOGIA', 'La piel que siempre soñaste está mucho más cerca de lo que te imaginas.', NULL),
(4, 1, 'TRATAMIENTO DE PAPADA', 'Una de las zonas que todos queremos mejorar. Siempre con la cabeza en alto y con la ayuda de los tratamientos adecuados en cada caso obtenemos esos resultados que tanto buscamos.', NULL),
(5, 1, 'BIOESTIMULADORES', 'Llegaron para quedarse! Representan los últimos avances en estética facial que todos queremos. Sin aportar volumen estimulan potentemente a nuestras células para que produzcan grandes cantidades de colageno.', NULL),
(6, 4, 'ODONTOLOGIA GENERAL', 'Todos deberíamos saber el bien que una simple sonrisa puede hacer.', NULL),
(7, 4, 'TRATAMIENTO DE BRUXISMO', 'El Bruxismo es el apretamiento o rechinamiento de los dientes que se realiza tanto de forma consciente como inconsciente; y afecta a una gran parte de la población.', NULL),
(8, 4, 'DISEÑO DE SONRISA', 'Para comenzar realizamos un estudio completo del rostro del paciente tomando medidas dentarias y faciales, escaneo digital de la boca y fotografías. Mediante esta información podremos definir el largo, ancho y anatomía ideal de cada uno de sus dientes en perfecta relación a al rostro y a sus labios. Toda esta información es enviada al laboratorio quien confeccionará una impresión digital del modelo de la boca con la forma exacta del diseño realizado, que será probado en el paciente mediante un material provisorio para visualizar el agrado del diseño. Y en base al mismo proceder a confeccionar las carillas.  ', NULL);

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
(56, '10');

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
(183, 56, 'db005c8d-ccd0-4e0e-9d36-aaed244e8559', 1, '2023-10-03 18:46:49');

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
(1, 1, 1, 'B-UP', 'Es una novedosa técnica realizada con acido hialuronico que consiste en trabajar sobre áreas específicas de la región temporal a nivel del cuero cabelludo, con el objetivo de lograr un reposicionamiento de los tejidos elevándolos  en contra de los vectores de envejecimiento logrando una notable mejoría del rostro, sin cambiar las facciones del mismo.', 999, 100, '30 min', '12-18 meses', 'treatment-ev481tobht.webp'),
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
(20, 1, 2, 'BOTOX®️ BRUXISMO', 'El tratamiento de Bruxismo con Botox es hoy en día el tratamiento más efectivo que soluciona esta afección. Consiste en la colocación de Botox en los músculos que lo provocan haciendo que se relajen y se produzca indefectiblemente un gran alivio, de esta forma evitamos desgastes y roturas dentarias, dolores articulares, de cabeza, oído, y contracturas cervicales asociadas al Bruxismo. La aplicación se lleva a cabo en tan solo unos minutos, y el efecto de relajación comienza a sentirse a las 48 hs luego de la aplicación.', 999, 100, '30 min', '4-6 meses', NULL),
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
  `cart_period_type` varchar(1) DEFAULT NULL,
  `country_codes_id` int(11) DEFAULT 12,
  `verified_email` tinyint(4) DEFAULT 0,
  `verification_code` varchar(6) DEFAULT NULL,
  `expiration_time` timestamp NULL DEFAULT NULL,
  `verified_essential_data` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `phone`, `dni`, `password`, `email`, `wpp_notifications`, `email_notifications`, `email_newsletter`, `user_categories_id`, `birth_date`, `genres_id`, `createdAt`, `deletedAt`, `updatedAt`, `password_token`, `last_cart_email`, `cart_period_type`, `country_codes_id`, `verified_email`, `verification_code`, `expiration_time`, `verified_essential_data`) VALUES
('055db644-c20c-4ce3-b0da-5e14dfaff71d', '', '', NULL, '', '$2a$10$yKJ3PK60nLKUCCIhyjVs1.CTa5HKKIhJRpeiV3FZw.YO.WCyEwHOy', 'janoo.pereira@gmail.com', 0, 0, 0, 3, NULL, NULL, '2023-08-29 23:19:27', NULL, '2023-08-30 00:12:26', NULL, NULL, NULL, 12, 1, NULL, NULL, NULL),
('10', 'Jano', 'Pereira Kent', '01158817312', '43083507', '$2a$10$cCkz2p6pYsL6/Ka2EQZjge9KbNzbVCcL9sdlfXdKgVwbC9oEDhbc2', 'janopk789@gmail.com', 1, 1, 1, 1, '2001-02-12 00:00:00', 2, '2023-07-04 14:35:00', NULL, '2023-10-03 18:46:49', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEwIiwiaWF0IjoxNjkzNjY0Mjc0LCJleHAiOjE2OTM2Njc4NzR9.w-rlPdjd1oPja44SJZE0Al8GgfMAeYclVcatvWf8a2U', '2023-10-03 20:00:00', '1', 12, 1, NULL, NULL, 1),
('16', 'CJoaquin', 'Cataldo', '', '', '$2a$10$NneD5C8KExxSt8KgwXGcJewSn62J2dYelRMN7eTbwOER07KleOuNm', 'joaco.cataldo3@gmail.com', 0, 0, 0, 2, NULL, NULL, '2023-07-11 11:10:11', NULL, '2023-07-11 11:10:32', NULL, NULL, NULL, 12, 0, NULL, NULL, NULL),
('2a97920f-285e-4bc8-a8c9-c9fedef2ab89', 'Exequiel', 'Fos', '11111111', '23111111', '$2a$10$.IbG12mRd9aYnmhGocfqHek1.PkBIMcN/Hl.14dyExE1gTrBnuYQS', 'fosexef343@trazeco.com', 1, 1, 1, 3, '2004-02-10 00:00:00', 1, '2023-08-29 23:15:03', NULL, '2023-08-29 23:19:05', NULL, NULL, NULL, 12, 1, NULL, NULL, NULL),
('f636404c-60bc-41e1-bd7a-14d629ac7f07', 'Martin', 'Berra', '1144301111', '', '$2a$10$RkdmG6iBhyoiULCLpZQmNOwZb/GV8y4k/7AouZOfk9CJdgTITsgBi', 'martin.berra+test@gmail.com', 0, 0, 0, 3, '2023-10-10 00:00:00', 1, '2023-07-17 23:23:40', NULL, '2023-07-17 23:24:17', NULL, NULL, NULL, 12, 0, NULL, NULL, NULL);

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_addresses`
--

CREATE TABLE `user_addresses` (
  `id` varchar(36) NOT NULL,
  `users_id` varchar(36) DEFAULT NULL,
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
-- Volcado de datos para la tabla `user_addresses`
--

INSERT INTO `user_addresses` (`id`, `users_id`, `street`, `apartment`, `city`, `provinces_id`, `zip_code`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
('9c947b7b-37f2-41da-bcf7-ce898ff45ab5', '10', 'Nueva Calle 2222', '2A', 'Pompeya', 1, '1444', '2023-08-28 15:53:43', '2023-10-01 15:11:42', NULL);

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
  ADD KEY `orders_ibfk_6` (`billing_addresses_id`),
  ADD KEY `orders_ibfk_8` (`payment_methods_id`);

--
-- Indices de la tabla `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_items_ibfk_1` (`products_id`),
  ADD KEY `order_items_ibfk_2` (`orders_id`);

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
  ADD PRIMARY KEY (`id`);

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
-- Indices de la tabla `user_addresses`
--
ALTER TABLE `user_addresses`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `blogs_images`
--
ALTER TABLE `blogs_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=161;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT de la tabla `home_sections`
--
ALTER TABLE `home_sections`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `payment_methods`
--
ALTER TABLE `payment_methods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `products_files`
--
ALTER TABLE `products_files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=243;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT de la tabla `temporal_items`
--
ALTER TABLE `temporal_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=184;

--
-- AUTO_INCREMENT de la tabla `treatments`
--
ALTER TABLE `treatments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

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
  ADD CONSTRAINT `orders_ibfk_5` FOREIGN KEY (`shipping_addresses_id`) REFERENCES `shipping_addresses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_6` FOREIGN KEY (`billing_addresses_id`) REFERENCES `billing_addresses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
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
