-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-10-2024 a las 07:01:43
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bd`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `ID_Categoria` int(11) NOT NULL,
  `Nombre_Categoria` char(60) DEFAULT NULL,
  `Descripcion_Categoria` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`ID_Categoria`, `Nombre_Categoria`, `Descripcion_Categoria`) VALUES
(1, 'Frutas y Verduras', 'Productos frescos como frutas y verduras'),
(2, 'Lácteos', 'Productos derivados de la leche como queso, yogurt y más'),
(3, 'Carnes', 'Carnes de vacuno, cerdo, pollo y otros tipos de proteínas'),
(4, 'Cereales', 'Cereales, arroz, pastas y otros granos'),
(5, 'Panadería y Pastelería', 'Pan, pasteles y productos de repostería'),
(6, 'Bebidas', 'Bebidas como agua, jugos, gaseosas, etc.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `consulta`
--

CREATE TABLE `consulta` (
  `ID_Consulta` int(11) NOT NULL,
  `ID_Usuario` int(11) DEFAULT NULL,
  `Nombre_Usuario` varchar(60) DEFAULT NULL,
  `correo_Usuario` varchar(120) DEFAULT NULL,
  `Asunto` varchar(40) DEFAULT NULL,
  `Mensaje_Usuario` varchar(400) DEFAULT NULL,
  `Respuesta_Cacique` varchar(400) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lista_de_compra`
--

CREATE TABLE `lista_de_compra` (
  `ID_Lista_De_Compras` int(11) NOT NULL,
  `ID_Producto` int(11) DEFAULT NULL,
  `ID_Usuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `ID_Producto` int(11) NOT NULL,
  `ID_Producto_Proveedor` int(11) DEFAULT NULL,
  `ID_Proveedor` int(11) DEFAULT NULL,
  `ID_Categoria` int(11) DEFAULT NULL,
  `Nombre_producto` char(60) DEFAULT NULL,
  `Costo` int(11) DEFAULT NULL,
  `CANTIDAD` int(11) DEFAULT NULL,
  `Descripcion_Producto` text DEFAULT NULL,
  `link_producto` varchar(2083) DEFAULT NULL,
  `imagen_producto` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`ID_Producto`, `ID_Producto_Proveedor`, `ID_Proveedor`, `ID_Categoria`, `Nombre_producto`, `Costo`, `CANTIDAD`, `Descripcion_Producto`, `link_producto`, `imagen_producto`) VALUES
(1, 1, 1, 1, 'Palta Hass', 3500, 50, 'Palta Hass, marca X, madura', 'google.com', 'google.com'),
(2, 2, 2, 1, 'Palta Hass', 3700, 40, 'Palta Hass, marca Y, orgánica', 'google.com', 'google.com'),
(3, 3, 3, 1, 'Palta Hass', 3650, 45, 'Palta Hass, marca Z, en oferta', 'google.com', 'google.com'),
(4, 6, 1, 2, 'Leche Entera', 950, 100, 'Leche Entera, marca Colun', 'google.com', 'google.com'),
(5, 7, 2, 2, 'Leche Entera', 1000, 95, 'Leche Entera, marca Soprole', 'google.com', 'google.com'),
(6, 8, 3, 2, 'Leche Entera', 980, 80, 'Leche Entera, marca Nestlé', 'google.com', 'google.com'),
(7, 11, 1, 3, 'Carne de Vacuno', 8500, 20, 'Carne de Vacuno, corte Lomo Vetado', 'google.com', 'google.com'),
(8, 12, 2, 3, 'Carne de Vacuno', 8700, 15, 'Carne de Vacuno, corte Punta Picana', 'google.com', 'google.com'),
(9, 16, 1, 4, 'Arroz Grano Largo', 1200, 200, 'Arroz Grano Largo, marca Tucapel', 'google.com', 'google.com'),
(10, 17, 2, 4, 'Arroz Grano Largo', 1250, 150, 'Arroz Grano Largo, marca Luchetti', 'google.com', 'google.com'),
(11, 21, 1, 5, 'Pan Marraqueta', 1500, 300, 'Pan Marraqueta, fresco del día', 'google.com', 'google.com'),
(12, 26, 1, 2, 'Huevos', 2400, 150, 'Huevos frescos, marca Huevos de Campo', 'google.com', 'google.com'),
(13, 27, 2, 2, 'Huevos', 2450, 140, 'Huevos frescos, marca Huevos Santa', 'google.com', 'google.com'),
(14, 28, 3, 2, 'Huevos', 2500, 130, 'Huevos frescos, marca El Granero', 'google.com', 'google.com'),
(15, 31, 1, 2, 'Queso Gouda', 4500, 50, 'Queso Gouda, marca Colun', 'google.com', 'google.com'),
(16, 32, 2, 2, 'Queso Gouda', 4700, 40, 'Queso Gouda, marca Los Tilos', 'google.com', 'google.com'),
(17, 33, 3, 2, 'Queso Gouda', 4600, 45, 'Queso Gouda, marca Soprole', 'google.com', 'google.com'),
(18, 36, 1, 4, 'Aceite de Maravilla', 2200, 100, 'Aceite de Maravilla, marca Jumbo', 'google.com', 'google.com'),
(19, 37, 2, 4, 'Aceite de Maravilla', 2100, 90, 'Aceite de Maravilla, marca Santa Isabel', 'google.com', 'google.com'),
(20, 41, 1, 4, 'Fideos Spaghetti', 900, 200, 'Fideos Spaghetti, marca Carozzi', 'google.com', 'google.com'),
(21, 42, 2, 4, 'Fideos Spaghetti', 950, 180, 'Fideos Spaghetti, marca Luchetti', 'google.com', 'google.com'),
(22, 46, 1, 1, 'Manzana Verde', 1900, 160, 'Manzana Verde, marca Orgánica', 'google.com', 'google.com'),
(23, 47, 2, 1, 'Manzana Verde', 1950, 150, 'Manzana Verde, marca Huerto del Sur', 'google.com', 'google.com'),
(24, 29, 4, 2, 'Huevos', 2600, 120, 'Huevos frescos, marca Granjas del Sur', 'google.com', 'google.com'),
(25, 30, 5, 2, 'Huevos', 2550, 110, 'Huevos frescos, marca Campo Verde', 'google.com', 'google.com'),
(26, 34, 4, 2, 'Queso Gouda', 4800, 35, 'Queso Gouda, marca Los Ríos', 'google.com', 'google.com'),
(27, 35, 5, 2, 'Queso Gouda', 4750, 30, 'Queso Gouda, marca Cacique', 'google.com', 'google.com'),
(28, 38, 3, 4, 'Aceite de Maravilla', 2300, 95, 'Aceite de Maravilla, marca Colun', 'google.com', 'google.com'),
(29, 39, 4, 4, 'Aceite de Maravilla', 2250, 85, 'Aceite de Maravilla, marca Tottus', 'google.com', 'google.com'),
(30, 40, 5, 4, 'Aceite de Maravilla', 2350, 90, 'Aceite de Maravilla, marca Unimarc', 'google.com', 'google.com'),
(31, 43, 3, 4, 'Fideos Spaghetti', 920, 190, 'Fideos Spaghetti, marca Molitalia', 'google.com', 'google.com'),
(32, 44, 4, 4, 'Fideos Spaghetti', 980, 170, 'Fideos Spaghetti, marca Jumbo', 'google.com', 'google.com'),
(33, 45, 5, 4, 'Fideos Spaghetti', 960, 160, 'Fideos Spaghetti, marca Unimarc', 'google.com', 'google.com'),
(34, 48, 3, 1, 'Manzana Verde', 2000, 140, 'Manzana Verde, marca Premium', 'google.com', 'google.com'),
(35, 49, 4, 1, 'Manzana Verde', 1980, 135, 'Manzana Verde, marca Tottus', 'google.com', 'google.com'),
(36, 50, 5, 1, 'Manzana Verde', 1920, 130, 'Manzana Verde, marca Unimarc', 'google.com', 'google.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedor`
--

CREATE TABLE `proveedor` (
  `ID_Proveedor` int(11) NOT NULL,
  `Nombre_Proveedor` char(60) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `proveedor`
--

INSERT INTO `proveedor` (`ID_Proveedor`, `Nombre_Proveedor`) VALUES
(1, 'Lider'),
(2, 'Santa Isabel'),
(3, 'Jumbo'),
(4, 'Tottus'),
(5, 'Unimarc');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedor_producto`
--

CREATE TABLE `proveedor_producto` (
  `ID_Producto_Proveedor` int(11) NOT NULL,
  `ID_Proveedor` int(11) DEFAULT NULL,
  `Nombre_Producto` char(60) DEFAULT NULL,
  `Costo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `proveedor_producto`
--

INSERT INTO `proveedor_producto` (`ID_Producto_Proveedor`, `ID_Proveedor`, `Nombre_Producto`, `Costo`) VALUES
(1, 1, 'Palta Hass', 3500),
(2, 2, 'Palta Hass', 3700),
(3, 3, 'Palta Hass', 3650),
(4, 4, 'Palta Hass', 3600),
(5, 5, 'Palta Hass', 3550),
(6, 1, 'Leche Entera', 950),
(7, 2, 'Leche Entera', 1000),
(8, 3, 'Leche Entera', 980),
(9, 4, 'Leche Entera', 1020),
(10, 5, 'Leche Entera', 990),
(11, 1, 'Carne de Vacuno', 8500),
(12, 2, 'Carne de Vacuno', 8700),
(13, 3, 'Carne de Vacuno', 8600),
(14, 4, 'Carne de Vacuno', 8550),
(15, 5, 'Carne de Vacuno', 8750),
(16, 1, 'Arroz Grano Largo', 1200),
(17, 2, 'Arroz Grano Largo', 1250),
(18, 3, 'Arroz Grano Largo', 1300),
(19, 4, 'Arroz Grano Largo', 1280),
(20, 5, 'Arroz Grano Largo', 1230),
(21, 1, 'Pan Marraqueta', 1500),
(22, 2, 'Pan Marraqueta', 1450),
(23, 3, 'Pan Marraqueta', 1480),
(24, 4, 'Pan Marraqueta', 1470),
(25, 5, 'Pan Marraqueta', 1490),
(26, 1, 'Huevos', 2400),
(27, 2, 'Huevos', 2450),
(28, 3, 'Huevos', 2500),
(29, 4, 'Huevos', 2600),
(30, 5, 'Huevos', 2550),
(31, 1, 'Queso Gouda', 4500),
(32, 2, 'Queso Gouda', 4700),
(33, 3, 'Queso Gouda', 4600),
(34, 4, 'Queso Gouda', 4800),
(35, 5, 'Queso Gouda', 4750),
(36, 1, 'Aceite de Maravilla', 2200),
(37, 2, 'Aceite de Maravilla', 2100),
(38, 3, 'Aceite de Maravilla', 2300),
(39, 4, 'Aceite de Maravilla', 2250),
(40, 5, 'Aceite de Maravilla', 2350),
(41, 1, 'Fideos Spaghetti', 900),
(42, 2, 'Fideos Spaghetti', 950),
(43, 3, 'Fideos Spaghetti', 920),
(44, 4, 'Fideos Spaghetti', 980),
(45, 5, 'Fideos Spaghetti', 960),
(46, 1, 'Manzana Verde', 1900),
(47, 2, 'Manzana Verde', 1950),
(48, 3, 'Manzana Verde', 2000),
(49, 4, 'Manzana Verde', 1980),
(50, 5, 'Manzana Verde', 1920);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `temp_producto`
--

CREATE TABLE `temp_producto` (
  `ID_Producto` int(11) NOT NULL,
  `ID_Producto_Proveedor` int(11) DEFAULT NULL,
  `ID_Proveedor` int(11) DEFAULT NULL,
  `ID_Categoria` int(11) DEFAULT NULL,
  `Nombre_producto` char(60) DEFAULT NULL,
  `Costo` int(11) DEFAULT NULL,
  `CANTIDAD` int(11) DEFAULT NULL,
  `Descripcion_Producto` text DEFAULT NULL,
  `Actualizacion_Productos` timestamp NOT NULL DEFAULT current_timestamp(),
  `link_producto` varchar(2083) DEFAULT NULL,
  `imagen_producto` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `ID_Usuario` int(11) NOT NULL,
  `Nombre_Usuario` varchar(60) DEFAULT NULL,
  `correo_Usuario` varchar(120) DEFAULT NULL,
  `Contraseña_Usuario` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`ID_Categoria`);

--
-- Indices de la tabla `consulta`
--
ALTER TABLE `consulta`
  ADD PRIMARY KEY (`ID_Consulta`),
  ADD KEY `ID_Usuario` (`ID_Usuario`);

--
-- Indices de la tabla `lista_de_compra`
--
ALTER TABLE `lista_de_compra`
  ADD PRIMARY KEY (`ID_Lista_De_Compras`),
  ADD KEY `ID_Producto` (`ID_Producto`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`ID_Producto`),
  ADD KEY `ID_Categoria` (`ID_Categoria`),
  ADD KEY `ID_Producto_Proveedor` (`ID_Producto_Proveedor`),
  ADD KEY `ID_Proveedor` (`ID_Proveedor`);

--
-- Indices de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  ADD PRIMARY KEY (`ID_Proveedor`);

--
-- Indices de la tabla `proveedor_producto`
--
ALTER TABLE `proveedor_producto`
  ADD PRIMARY KEY (`ID_Producto_Proveedor`);

--
-- Indices de la tabla `temp_producto`
--
ALTER TABLE `temp_producto`
  ADD PRIMARY KEY (`ID_Producto`),
  ADD KEY `ID_Categoria` (`ID_Categoria`),
  ADD KEY `ID_Producto_Proveedor` (`ID_Producto_Proveedor`),
  ADD KEY `ID_Proveedor` (`ID_Proveedor`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`ID_Usuario`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `consulta`
--
ALTER TABLE `consulta`
  ADD CONSTRAINT `consulta_ibfk_1` FOREIGN KEY (`ID_Usuario`) REFERENCES `usuario` (`ID_Usuario`);

--
-- Filtros para la tabla `lista_de_compra`
--
ALTER TABLE `lista_de_compra`
  ADD CONSTRAINT `lista_de_compra_ibfk_1` FOREIGN KEY (`ID_Producto`) REFERENCES `producto` (`ID_Producto`);

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`ID_Categoria`) REFERENCES `categoria` (`ID_Categoria`),
  ADD CONSTRAINT `producto_ibfk_2` FOREIGN KEY (`ID_Producto_Proveedor`) REFERENCES `proveedor_producto` (`ID_Producto_Proveedor`),
  ADD CONSTRAINT `producto_ibfk_3` FOREIGN KEY (`ID_Proveedor`) REFERENCES `proveedor` (`ID_Proveedor`);

--
-- Filtros para la tabla `temp_producto`
--
ALTER TABLE `temp_producto`
  ADD CONSTRAINT `temp_producto_ibfk_1` FOREIGN KEY (`ID_Categoria`) REFERENCES `categoria` (`ID_Categoria`),
  ADD CONSTRAINT `temp_producto_ibfk_2` FOREIGN KEY (`ID_Producto_Proveedor`) REFERENCES `proveedor_producto` (`ID_Producto_Proveedor`),
  ADD CONSTRAINT `temp_producto_ibfk_3` FOREIGN KEY (`ID_Proveedor`) REFERENCES `proveedor` (`ID_Proveedor`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
