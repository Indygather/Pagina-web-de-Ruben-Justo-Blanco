-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 15-11-2017 a las 09:37:47
-- Versión del servidor: 5.7.19
-- Versión de PHP: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `id3376422_marketdb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `forums`
--

DROP TABLE IF EXISTS `forums`;
CREATE TABLE IF NOT EXISTS `forums` (
  `ID_FORUM` bigint(20) NOT NULL AUTO_INCREMENT,
  `ID_USER` bigint(20) NOT NULL,
  `CREATION_DATE` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `UPDATE_DATE` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `ENABLE` tinyint(1) NOT NULL,
  PRIMARY KEY (`ID_FORUM`),
  UNIQUE KEY `ID_USER` (`ID_USER`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `forums`
--

INSERT INTO `forums` (`ID_FORUM`, `ID_USER`, `CREATION_DATE`, `UPDATE_DATE`, `ENABLE`) VALUES
(1, 1, '2017-10-27 11:08:31', '0000-00-00 00:00:00', 1),
(2, 2, '2017-10-27 11:08:31', '0000-00-00 00:00:00', 1),
(3, 3, '2017-10-27 11:08:31', '0000-00-00 00:00:00', 1),
(4, 4, '2017-10-27 11:08:31', '0000-00-00 00:00:00', 1),
(5, 5, '2017-10-27 11:08:31', '0000-00-00 00:00:00', 1),
(6, 6, '2017-10-27 11:08:31', '0000-00-00 00:00:00', 1),
(7, 7, '2017-10-27 11:08:31', '0000-00-00 00:00:00', 1),
(8, 8, '2017-10-27 11:08:32', '0000-00-00 00:00:00', 1),
(9, 9, '2017-10-27 11:08:32', '0000-00-00 00:00:00', 1),
(10, 10, '2017-10-27 11:08:32', '0000-00-00 00:00:00', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `forum_threads`
--

DROP TABLE IF EXISTS `forum_threads`;
CREATE TABLE IF NOT EXISTS `forum_threads` (
  `ID_THREAD` bigint(20) NOT NULL AUTO_INCREMENT,
  `ID_FORUM` bigint(20) NOT NULL,
  `NAME` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `DESCRIPTION` varchar(300) COLLATE utf8_unicode_ci NOT NULL,
  `CREATION_DATE` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `UPDATE_DATE` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `ENABLE` tinyint(1) NOT NULL,
  PRIMARY KEY (`ID_THREAD`),
  KEY `ID_FORUM_THREAD_CONTRAINT` (`ID_FORUM`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `forum_threads`
--

INSERT INTO `forum_threads` (`ID_THREAD`, `ID_FORUM`, `NAME`, `DESCRIPTION`, `CREATION_DATE`, `UPDATE_DATE`, `ENABLE`) VALUES
(1, 1, 'Hilo 1', 'Descripcion del hilo 1', '2017-10-27 11:10:46', '0000-00-00 00:00:00', 1),
(2, 2, 'Hilo 2', 'Descripcion del hilo 2', '2017-10-27 11:10:47', '0000-00-00 00:00:00', 1),
(3, 3, 'Hilo 3', 'Descripcion del hilo 3', '2017-10-27 11:10:47', '0000-00-00 00:00:00', 1),
(4, 4, 'Hilo 4', 'Descripcion del hilo 4', '2017-10-27 11:10:47', '0000-00-00 00:00:00', 1),
(5, 5, 'Hilo 5', 'Descripcion del hilo 5', '2017-10-27 11:10:47', '0000-00-00 00:00:00', 1),
(6, 6, 'Hilo 6', 'Descripcion del hilo 6', '2017-10-27 11:10:48', '0000-00-00 00:00:00', 1),
(7, 7, 'Hilo 7', 'Descripcion del hilo 7', '2017-10-27 11:10:48', '0000-00-00 00:00:00', 1),
(8, 8, 'Hilo 8', 'Descripcion del hilo 8', '2017-10-27 11:10:48', '0000-00-00 00:00:00', 1),
(9, 9, 'Hilo 9', 'Descripcion del hilo 9', '2017-10-27 11:10:48', '0000-00-00 00:00:00', 1),
(10, 10, 'Hilo 10', 'Descripcion del hilo 10', '2017-10-27 11:10:48', '0000-00-00 00:00:00', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `posts`
--

DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts` (
  `ID_POST` bigint(20) NOT NULL AUTO_INCREMENT,
  `ID_THREAD` bigint(20) NOT NULL,
  `TEXT` text COLLATE utf8_unicode_ci NOT NULL,
  `CREATION_DATE` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `UPDATE_DATE` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`ID_POST`),
  KEY `ID_THREAD_POSTS_CONTRAINT` (`ID_THREAD`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `posts`
--

INSERT INTO `posts` (`ID_POST`, `ID_THREAD`, `TEXT`, `CREATION_DATE`, `UPDATE_DATE`) VALUES
(1, 1, 'Este es el post 1', '2017-10-27 11:12:29', '0000-00-00 00:00:00'),
(2, 2, 'Este es el post 2', '2017-10-27 11:12:30', '0000-00-00 00:00:00'),
(3, 3, 'Este es el post 3', '2017-10-27 11:12:30', '0000-00-00 00:00:00'),
(4, 4, 'Este es el post 4', '2017-10-27 11:12:30', '0000-00-00 00:00:00'),
(5, 5, 'Este es el post 5', '2017-10-27 11:12:30', '0000-00-00 00:00:00'),
(6, 6, 'Este es el post 6', '2017-10-27 11:12:30', '0000-00-00 00:00:00'),
(7, 7, 'Este es el post 7', '2017-10-27 11:12:30', '0000-00-00 00:00:00'),
(8, 8, 'Este es el post 8', '2017-10-27 11:12:31', '0000-00-00 00:00:00'),
(9, 9, 'Este es el post 9', '2017-10-27 11:12:31', '0000-00-00 00:00:00'),
(10, 10, 'Este es el post 10', '2017-10-27 11:12:31', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `ID_PRODUCT` bigint(20) NOT NULL AUTO_INCREMENT,
  `ID_USER` bigint(20) NOT NULL,
  `NAME` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `DESCRIPTION` text COLLATE utf8_unicode_ci NOT NULL,
  `PRICE` float NOT NULL,
  `CREATION_DATE` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UPDATE_DATE` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ENABLE` tinyint(1) NOT NULL,
  `ID_PRODUCT_CATEGORY` int(11) NOT NULL,
  PRIMARY KEY (`ID_PRODUCT`),
  KEY `CONSTRAINT_USER_ID` (`ID_USER`),
  KEY `CONSTRAINT_PRODUCT_CATEGORY_ID` (`ID_PRODUCT_CATEGORY`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`ID_PRODUCT`, `ID_USER`, `NAME`, `DESCRIPTION`, `PRICE`, `CREATION_DATE`, `UPDATE_DATE`, `ENABLE`, `ID_PRODUCT_CATEGORY`) VALUES
(4, 3, 'Producto 4', 'Descripcion producto 4', 32300.3, '2017-10-27 10:47:03', '2017-10-27 10:47:03', 1, 3),
(5, 4, 'Producto 5', 'Descripcion producto 5', 32.3, '2017-10-27 10:47:03', '2017-10-27 10:47:03', 1, 1),
(6, 5, 'Producto 6', 'Descripcion producto 6', 4300.3, '2017-10-27 10:47:03', '2017-10-27 10:47:03', 1, 1),
(36, 1, 'Ejemplo de nuevo producto', 'Descripcion Ejemplo de nuevo producto', 123.12, '2017-11-09 21:26:03', '2017-11-13 12:15:38', 1, 1),
(41, 1, 'Cuadro de ejemplo', 'Es, pues, de saber, que este sobredicho hidalgo, los ratos que estaba ocioso (que eran los mÃ¡s del aÃ±o) se daba a leer libros de caballerÃ­as con tanta aficiÃ³n y gusto, que olvidÃ³ casi de todo punto el ejercicio de la caza, y aun la administraciÃ³n de su hacienda; y llegÃ³ a tanto su curiosidad y desatino en esto, que vendiÃ³ muchas hanegas de tierra de sembradura, para comprar libros de caballerÃ­as en que leer; y asÃ­ llevÃ³ a su casa todos cuantos pudo haber dellos; y de todos ningunos le parecÃ­an tan bien como los que compuso el famoso Feliciano de Silva: porque la claridad de su prosa, y aquellas intrincadas razones suyas, le parecÃ­an de perlas; y mÃ¡s cuando llegaba a leer aquellos requiebros y cartas de desafÃ­o, donde en muchas partes hallaba escrito: la razÃ³n de la sinrazÃ³n que a mi razÃ³n se hace, de tal manera mi razÃ³n enflaquece, que con razÃ³n me quejo de la vuestra fermosura, y tambiÃ©n cuando leÃ­a: los altos cielos que de vuestra divinidad divinamente con las estrellas se fortifican, y os hacen merecedora del merecimiento que merece la vuestra grandeza. Con estas y semejantes razones perdÃ­a el pobre caballero el juicio, y desvelÃ¡base por entenderlas, y desentraÃ±arles el sentido, que no se lo sacara, ni las entendiera el mismo AristÃ³teles, si resucitara ', 350, '2017-11-13 12:49:16', '2017-11-14 12:46:22', 1, 1),
(43, 1, 'Nuevo mueble', 'Un nuevo mueble', 23, '2017-11-13 16:54:29', '2017-11-13 16:54:29', 1, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product_categories`
--

DROP TABLE IF EXISTS `product_categories`;
CREATE TABLE IF NOT EXISTS `product_categories` (
  `ID_PRODUCT_CATEGORY` int(11) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `DESCRIPTION` varchar(300) COLLATE utf8_unicode_ci NOT NULL,
  `CREATION_DATE` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `UPDATE_DATE` timestamp NULL DEFAULT NULL,
  `ENABLE` tinyint(1) NOT NULL,
  PRIMARY KEY (`ID_PRODUCT_CATEGORY`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `product_categories`
--

INSERT INTO `product_categories` (`ID_PRODUCT_CATEGORY`, `NAME`, `DESCRIPTION`, `CREATION_DATE`, `UPDATE_DATE`, `ENABLE`) VALUES
(1, 'Cuadros', 'Descripcion categoria 1', '2017-11-13 16:32:54', '2017-11-13 16:01:09', 1),
(2, 'Esculturas', 'Descripcion categoria 2', '2017-11-13 16:32:57', '2017-11-13 16:01:09', 1),
(3, 'Bisuteria', 'Descripcion categoria 3', '2017-11-13 16:32:59', '2017-11-13 16:01:09', 1),
(4, 'Textil', 'Descripcion categoria 4', '2017-11-13 16:33:01', '2017-11-13 16:01:09', 1),
(5, 'Muebles', 'Muebles del hogar', '2017-11-13 16:33:03', '2017-11-13 16:01:09', 1),
(11, 'Decoracion', 'Decoracion del hogar', '2017-11-13 16:37:05', NULL, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product_images`
--

DROP TABLE IF EXISTS `product_images`;
CREATE TABLE IF NOT EXISTS `product_images` (
  `ID_IMAGE` bigint(20) NOT NULL AUTO_INCREMENT,
  `ID_PRODUCT` bigint(20) NOT NULL,
  `URL_IMAGE` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  `IMAGEN_PRINCIPAL` tinyint(1) NOT NULL DEFAULT '1',
  `CREATION_DATE` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `UPDATE_DATE` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ENABLE` tinyint(1) NOT NULL,
  PRIMARY KEY (`ID_IMAGE`),
  KEY `PRODUCT_ID_CONSTRAINT` (`ID_PRODUCT`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `product_images`
--

INSERT INTO `product_images` (`ID_IMAGE`, `ID_PRODUCT`, `URL_IMAGE`, `IMAGEN_PRINCIPAL`, `CREATION_DATE`, `UPDATE_DATE`, `ENABLE`) VALUES
(4, 4, 'https://dl.dropboxusercontent.com/s/gakx1nupe2mi06c/indra.jpg?dl=0', 1, '2017-10-27 11:06:28', '0000-00-00 00:00:00', 1),
(5, 5, 'https://dl.dropboxusercontent.com/s/kts2s17azrjfzm9/redegal.jpg?dl=0', 1, '2017-10-27 11:06:28', '0000-00-00 00:00:00', 1),
(6, 6, 'https://dl.dropboxusercontent.com/s/ltx3ty9h9yr4wd3/rosa-chacel.png?dl=0', 1, '2017-10-27 11:06:28', '0000-00-00 00:00:00', 1),
(45, 36, 'http://hq3fx4dhod5z3r9q23d6tydn-wpengine.netdna-ssl.com/wp-content/uploads/2016/06/Recycled-lid-art-project-tree-rings.jpg', 1, '2017-11-13 12:14:45', '2017-11-13 12:14:45', 1),
(46, 36, 'https://s-media-cache-ak0.pinimg.com/originals/c5/ec/4f/c5ec4fe09aadb0cef1693b57459ccbcc.jpg', 0, '2017-11-13 12:15:38', '2017-11-13 12:15:38', 1),
(47, 41, 'https://s-media-cache-ak0.pinimg.com/originals/39/63/a0/3963a034c4fcc320979ce0eb74c13476.jpg', 0, '2017-11-13 12:49:16', '2017-11-13 12:49:16', 1),
(48, 41, 'https://s-media-cache-ak0.pinimg.com/originals/c5/ec/4f/c5ec4fe09aadb0cef1693b57459ccbcc.jpg', 0, '2017-11-13 12:49:16', '2017-11-13 12:49:16', 1),
(49, 41, 'https://www.dhresource.com/albu_646997776_00-1.0x0/our-love-5-piece-huge-100-handmade-modern.jpg', 1, '2017-11-13 12:50:09', '2017-11-13 12:49:16', 1),
(52, 43, 'https://t2.uc.ltmcdn.com/images/4/2/2/img_como_restaurar_un_mueble_15224_orig.jpg', 1, '2017-11-13 16:54:29', '2017-11-13 16:54:29', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `ID_ROLE` int(11) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `DESCRIPTION` int(200) NOT NULL,
  `CREATION_DATE` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `UPDATE_DATE` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `ENABLE` tinyint(1) NOT NULL,
  PRIMARY KEY (`ID_ROLE`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`ID_ROLE`, `NAME`, `DESCRIPTION`, `CREATION_DATE`, `UPDATE_DATE`, `ENABLE`) VALUES
(1, 'Admin', 0, '2017-10-27 10:50:26', '0000-00-00 00:00:00', 1),
(2, 'Seller', 0, '2017-10-27 10:50:26', '0000-00-00 00:00:00', 1),
(3, 'Usuario', 0, '2017-10-27 10:50:26', '0000-00-00 00:00:00', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `ID_USER` bigint(20) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(80) COLLATE utf8_unicode_ci NOT NULL,
  `LAST_NAME` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `EMAIL` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `USER_NAME` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `PASSWORD` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `CREATION_DATE` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UPDATE_DATE` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ENABLE` tinyint(1) NOT NULL,
  PRIMARY KEY (`ID_USER`),
  UNIQUE KEY `UNIQUE_EMAIL` (`EMAIL`),
  UNIQUE KEY `UNIQUE_USER` (`USER_NAME`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`ID_USER`, `NAME`, `LAST_NAME`, `EMAIL`, `USER_NAME`, `PASSWORD`, `CREATION_DATE`, `UPDATE_DATE`, `ENABLE`) VALUES
(1, 'Usuario 1', 'Appelidos 1', 'usuario1@gmail.com', 'user1', 'e6CIGDVwLNdh66XWJ8RKJJsRv2miafeeht37dpp7L0Y=', '2017-10-27 10:33:18', '2017-10-27 10:33:18', 1),
(2, 'Usuario 2', 'Appelidos 2', 'usuario2@gmail.com', 'user2', '8YhOtKFocQDO8/AiF8McCmTQXxcnsfaW+XzPBQ2rqFM=', '2017-10-27 10:38:29', '2017-10-27 10:38:29', 1),
(3, 'Usuario 3', 'Appelidos 3', 'usuario3@gmail.com', 'user3', 'rV5IaUjqglUdx+sTObrjvEkE28/25/vdPLB7VWqEz1c=', '2017-10-27 10:38:29', '2017-10-27 10:38:29', 1),
(4, 'Usuario 4', 'Appelidos 4', 'usuario4@gmail.com', 'user4', 'q4ohtscL2ZHTwEtp0exuYd9mW+I2UJZwqFxD1fyXYOs=', '2017-10-27 10:38:29', '2017-10-27 10:38:29', 1),
(5, 'Usuario 5', 'Appelidos 5', 'usuario5@gmail.com', 'user5', 'b/AeWAqTNUJ+9xZH89nk+o6+qwReHQtobb++NxUpiLE=', '2017-10-27 10:38:29', '2017-10-27 10:38:29', 1),
(6, 'Usuario 6', 'Appelidos 6', 'usuario6@gmail.com', 'user6', '7QoRPD/Tun3o3GY8fxv1+IYHVXai0eC6a5+qLffGCx8=', '2017-10-27 10:38:29', '2017-10-27 10:38:29', 1),
(7, 'Usuario 7', 'Appelidos 7', 'usuario7@gmail.com', 'user7', 'GDhR98Rz24EyoYhxWOGpGF1vqhHVr2UCx3zJfqUWyag=', '2017-10-27 10:38:30', '2017-10-27 10:38:30', 1),
(8, 'Usuario 8', 'Appelidos 8', 'usuario8@gmail.com', 'user8', 'yyopapguC3WaWUOM3C73pcG2oRuF543JC+ZZCwv7b+s=', '2017-10-27 10:38:30', '2017-10-27 10:38:30', 1),
(9, 'Usuario 9', 'Appelidos 9', 'usuario9@gmail.com', 'user9', '1Flqt2x0RwtjuIkelTXw31p/xZPKPsOY32qw3UQHk7k=', '2017-10-27 10:38:30', '2017-10-27 10:38:30', 1),
(10, 'Usuario 10', 'Appelidos 10', 'usuario10@gmail.com', 'user10', 'Ap+S2mb2wZQEnx6Vq2WmVzKgA8b1NhHBFUDVRBzkUm0=', '2017-10-27 10:38:30', '2017-10-27 10:38:30', 1),
(18, 'Carlos', 'Dominguez', 'carlos.dmorales@outlook.com', 'carlosdmorales', 'dej0l1mlt+MNOhArcWDow9o/9hMPja1xRMA//GUdKfc=', '2017-11-08 17:40:56', '2017-11-08 17:40:56', 1),
(30, 'rtjtyj', 'rtyjrtyj', 'rubenjustoblanco@gmail.com', 'gafsdg', 'HhYoQVzfgz38oAOF5uBRYNNbPKqRfm2FACFKH60NPvA=', '2017-11-14 09:08:50', '2017-11-14 09:08:50', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users_roles`
--

DROP TABLE IF EXISTS `users_roles`;
CREATE TABLE IF NOT EXISTS `users_roles` (
  `ID_USER` bigint(20) NOT NULL,
  `ID_ROLE` int(11) NOT NULL,
  `CREATION_DATE` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UPDATE_DATE` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ENABLE` tinyint(1) NOT NULL,
  UNIQUE KEY `UNIQUE_USER_ROL` (`ID_USER`,`ID_ROLE`),
  KEY `ID_ROLE_CONSTRAINT` (`ID_ROLE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `users_roles`
--

INSERT INTO `users_roles` (`ID_USER`, `ID_ROLE`, `CREATION_DATE`, `UPDATE_DATE`, `ENABLE`) VALUES
(1, 1, '2017-10-27 10:53:39', '2017-10-27 10:53:39', 1),
(2, 2, '2017-10-27 10:53:39', '2017-10-27 10:53:39', 1),
(3, 2, '2017-10-27 10:53:39', '2017-10-27 10:53:39', 1),
(4, 2, '2017-10-27 10:53:39', '2017-10-27 10:53:39', 1),
(5, 3, '2017-10-27 10:53:39', '2017-10-27 10:53:39', 1),
(6, 3, '2017-10-27 10:53:39', '2017-10-27 10:53:39', 1),
(7, 3, '2017-10-27 10:53:39', '2017-10-27 10:53:39', 1),
(8, 3, '2017-10-27 10:53:39', '2017-10-27 10:53:39', 1),
(9, 3, '2017-10-27 10:53:39', '2017-10-27 10:53:39', 1),
(10, 3, '2017-10-27 10:53:39', '2017-10-27 10:53:39', 1);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `forums`
--
ALTER TABLE `forums`
  ADD CONSTRAINT `FORUM_ID_USER_CONTRAINT` FOREIGN KEY (`ID_USER`) REFERENCES `users` (`ID_USER`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `forum_threads`
--
ALTER TABLE `forum_threads`
  ADD CONSTRAINT `ID_FORUM_THREAD_CONTRAINT` FOREIGN KEY (`ID_FORUM`) REFERENCES `forums` (`ID_FORUM`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `ID_THREAD_POSTS_CONTRAINT` FOREIGN KEY (`ID_THREAD`) REFERENCES `forum_threads` (`ID_THREAD`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `CONSTRAINT_PRODUCT_CATEGORY_ID` FOREIGN KEY (`ID_PRODUCT_CATEGORY`) REFERENCES `product_categories` (`ID_PRODUCT_CATEGORY`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `CONSTRAINT_USER_ID` FOREIGN KEY (`ID_USER`) REFERENCES `users` (`ID_USER`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `PRODUCT_ID_CONSTRAINT` FOREIGN KEY (`ID_PRODUCT`) REFERENCES `products` (`ID_PRODUCT`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `users_roles`
--
ALTER TABLE `users_roles`
  ADD CONSTRAINT `ID_ROLE_CONSTRAINT` FOREIGN KEY (`ID_ROLE`) REFERENCES `roles` (`ID_ROLE`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ID_USER_CONSTRAINT` FOREIGN KEY (`ID_USER`) REFERENCES `users` (`ID_USER`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
