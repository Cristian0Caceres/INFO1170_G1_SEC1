-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-09-2024 a las 00:17:45
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `base_de_datos_cacique_del_ahorro`
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
(1, 'fideos', 'Productos a base de harina de trigo o arroz, como espaguetis, macarrones, etc.'),
(2, 'carnes', 'Variedad de carnes rojas y blancas, incluyendo res, cerdo, pollo y pescado.'),
(3, 'frutas y vegetales', 'Frutas frescas y vegetales de temporada, tanto locales como importados.'),
(4, 'cereales', 'Cereales para el desayuno, avena, granola y otros productos a base de granos.'),
(5, 'enlatados', 'Alimentos enlatados como sopas, vegetales, frutas y carnes.'),
(6, 'congelados', 'Productos congelados como vegetales, frutas, carnes y comidas preparadas.'),
(7, 'lacteos', 'Productos lácteos como leche, queso, yogur y mantequilla.'),
(8, 'legumbres', 'Legumbres secas y enlatadas como frijoles, lentejas, garbanzos y más.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `precios`
--

CREATE TABLE `precios` (
  `ID_Precios` int(11) NOT NULL,
  `ID_Productos` int(11) DEFAULT NULL,
  `coste` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `precios`
--

INSERT INTO `precios` (`ID_Precios`, `ID_Productos`, `coste`) VALUES
(1, 1, 1000),
(2, 1, 850),
(3, 2, 15000),
(4, 3, 5000),
(5, 1, 650),
(6, 1, 750),
(7, 2, 20000),
(8, 3, 3000),
(9, 2, 22000),
(10, 3, 2500),
(11, 2, 21000),
(12, 1, 900),
(13, 3, 4000),
(14, 1, 4500);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `ID_Producto` int(11) NOT NULL,
  `ID_Proveedor` int(11) DEFAULT NULL,
  `ID_Categoria` int(11) DEFAULT NULL,
  `Nombre_producto` char(60) DEFAULT NULL,
  `CANTIDAD` int(11) DEFAULT NULL,
  `Descripcion_Producto` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`ID_Producto`, `ID_Proveedor`, `ID_Categoria`, `Nombre_producto`, `CANTIDAD`, `Descripcion_Producto`) VALUES
(1, 1, 1, 'tallarines tarola', 100, 'Fideos largos y delgados, ideales para sopas y platos principales.'),
(2, 3, 2, 'posta paleta', 101, 'Corte de carne de res, perfecto para guisos y asados.'),
(3, 2, 3, 'palta hass', 102, 'Aguacate de variedad Hass, conocido por su sabor y textura cremosa.'),
(4, 1, 2, 'tapa pecho', 103, 'Corte de carne de res, ideal para estofados y cocciones lentas.'),
(5, 2, 3, 'tomate la crianza', 104, 'Tomates frescos y jugosos, perfectos para ensaladas y salsas.');

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
(1, 'lider'),
(2, 'sodimac'),
(3, 'santa isabel'),
(4, 'jumbo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `temp_producto`
--

CREATE TABLE `temp_producto` (
  `ID_Producto` int(11) NOT NULL,
  `ID_Proveedor` int(11) DEFAULT NULL,
  `ID_Categoria` int(11) DEFAULT NULL,
  `ID_Precios` int(11) DEFAULT NULL,
  `Nombre_producto` char(60) DEFAULT NULL,
  `CANTIDAD` int(11) DEFAULT NULL,
  `Descripcion_Producto` text DEFAULT NULL,
  `Actualizacion_Productos` timestamp NOT NULL DEFAULT current_timestamp()
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
-- Indices de la tabla `precios`
--
ALTER TABLE `precios`
  ADD PRIMARY KEY (`ID_Precios`),
  ADD KEY `Fk` (`ID_Productos`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`ID_Producto`),
  ADD KEY `ID_Categoria` (`ID_Categoria`),
  ADD KEY `ID_Proveedor` (`ID_Proveedor`);

--
-- Indices de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  ADD PRIMARY KEY (`ID_Proveedor`);

--
-- Indices de la tabla `temp_producto`
--
ALTER TABLE `temp_producto`
  ADD PRIMARY KEY (`ID_Producto`),
  ADD KEY `ID_Precios` (`ID_Precios`),
  ADD KEY `ID_Proveedor` (`ID_Proveedor`),
  ADD KEY `ID_Categoria` (`ID_Categoria`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `precios`
--
ALTER TABLE `precios`
  ADD CONSTRAINT `precios_ibfk_1` FOREIGN KEY (`ID_Productos`) REFERENCES `producto` (`ID_Producto`);

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`ID_Categoria`) REFERENCES `categoria` (`ID_Categoria`),
  ADD CONSTRAINT `producto_ibfk_2` FOREIGN KEY (`ID_Proveedor`) REFERENCES `proveedor` (`ID_Proveedor`);

--
-- Filtros para la tabla `temp_producto`
--
ALTER TABLE `temp_producto`
  ADD CONSTRAINT `temp_producto_ibfk_1` FOREIGN KEY (`ID_Precios`) REFERENCES `precios` (`ID_Precios`),
  ADD CONSTRAINT `temp_producto_ibfk_2` FOREIGN KEY (`ID_Proveedor`) REFERENCES `proveedor` (`ID_Proveedor`),
  ADD CONSTRAINT `temp_producto_ibfk_3` FOREIGN KEY (`ID_Categoria`) REFERENCES `categoria` (`ID_Categoria`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
