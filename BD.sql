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
  `ID_Categoria` int(11) AUTO_INCREMENT NOT NULL,
  `Nombre_Categoria` char(60) DEFAULT NULL,
  `Descripcion_Categoria` text DEFAULT NULL,
  PRIMARY KEY (`ID_Categoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`Nombre_Categoria`, `Descripcion_Categoria`) VALUES
('fideos', 'Productos a base de harina de trigo o arroz, como espaguetis, macarrones, etc.'),
('carnes', 'Variedad de carnes rojas y blancas, incluyendo res, cerdo, pollo y pescado.'),
('frutas y vegetales', 'Frutas frescas y vegetales de temporada, tanto locales como importados.'),
('cereales', 'Cereales para el desayuno, avena, granola y otros productos a base de granos.'),
('enlatados', 'Alimentos enlatados como sopas, vegetales, frutas y carnes.'),
('congelados', 'Productos congelados como vegetales, frutas, carnes y comidas preparadas.'),
('lacteos', 'Productos lácteos como leche, queso, yogur y mantequilla.'),
('legumbres', 'Legumbres secas y enlatadas como frijoles, lentejas, garbanzos y más.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `precios`
--

CREATE TABLE `precios` (
  `ID_Precios` int(11) AUTO_INCREMENT NOT NULL,
  `ID_Productos` int(11) DEFAULT NULL,
  `coste` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID_Precios`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `precios`
--

INSERT INTO `precios` (`ID_Productos`, `coste`) VALUES
(1, 1000),
(1, 850),
(2, 15000),
(3, 5000),
(1, 650),
(1, 750),
(2, 20000),
(3, 3000),
(2, 22000),
(3, 2500),
(2, 21000),
(1, 900),
(3, 4000),
(1, 4500);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `ID_Producto` int(11) AUTO_INCREMENT NOT NULL,
  `ID_Proveedor` int(11) DEFAULT NULL,
  `ID_Categoria` int(11) DEFAULT NULL,
  `Nombre_producto` char(60) DEFAULT NULL,
  `CANTIDAD` int(11) DEFAULT NULL,
  `Descripcion_Producto` text DEFAULT NULL,
  PRIMARY KEY (`ID_Producto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`ID_Proveedor`, `ID_Categoria`, `Nombre_producto`, `CANTIDAD`, `Descripcion_Producto`) VALUES
(1, 1, 'tallarines tarola', 100, 'Fideos largos y delgados, ideales para sopas y platos principales.'),
(3, 2, 'posta paleta', 101, 'Corte de carne de res, perfecto para guisos y asados.'),
(2, 3, 'palta hass', 102, 'Aguacate de variedad Hass, conocido por su sabor y textura cremosa.'),
(1, 2, 'tapa pecho', 103, 'Corte de carne de res, ideal para estofados y cocciones lentas.'),
(2, 3, 'tomate la crianza', 104, 'Tomates frescos y jugosos, perfectos para ensaladas y salsas.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedor`
--

CREATE TABLE `proveedor` (
  `ID_Proveedor` int(11) AUTO_INCREMENT NOT NULL,
  `Nombre_Proveedor` char(60) DEFAULT NULL,
  PRIMARY KEY (`ID_Proveedor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `proveedor`
--

INSERT INTO `proveedor` (`Nombre_Proveedor`) VALUES
('lider'),
('sodimac'),
('santa isabel'),
('jumbo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Usuario`
--

CREATE TABLE `Usuario` (
  `ID_Usuario` int(11) AUTO_INCREMENT NOT NULL,
  `Nombre_Usuario` Varchar(60) NOT NULL,
  `correo_Usuario` Varchar(120) NOT NULL,
  `Contraseña_Usuario` Varchar(255) NOT NULL,
  PRIMARY KEY (`ID_Usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
--
-- Volcado de datos para la tabla `Usuario`
--

INSERT INTO `Usuario` (`Nombre_Usuario`, `correo_Usuario`, `Contraseña_Usuario`) VALUES
('Admin 1', 'Admin1@gmail.com','123456789'),
('Admin 2', 'Admin2@gmail.com','123456789'),
('Admin 3', 'Admin3@gmail.com','123456789'),
('usuario1', 'usuario1@gmail.com','123456789'),
('usuario2', 'usuario2@gmail.com','123456789');
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Usuario`
--

CREATE TABLE `Lista_De_Compra` (
  `ID_Lista_De_Compras` int(11) AUTO_INCREMENT NOT NULL,
  `ID_Producto` int(11) NOT NULL,
  `ID_Usuario` int(11) NOT NULL,
  PRIMARY KEY (`ID_Lista_De_Compras`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
--
-- Volcado de datos para la tabla `Usuario`
--

INSERT INTO `Lista_De_Compra` (`ID_Producto`, `ID_Usuario`) VALUES
(3, 5),
(2, 5),
(1, 5),
(3, 4),
(5, 4);
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
-- Indices de la tabla `precios`
--
ALTER TABLE `precios`
  ADD KEY `Fk` (`ID_Productos`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD KEY `ID_Categoria` (`ID_Categoria`),
  ADD KEY `ID_Proveedor` (`ID_Proveedor`);

--
-- Indices de la tabla `Usuarios`
--
ALTER TABLE `Lista_De_Compra`
  ADD KEY (`ID_Producto`),
  ADD KEY (`ID_Usuario`);

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
-- Filtros para la tabla `producto`
--
ALTER TABLE `Lista_De_Compra`
  ADD CONSTRAINT `Lista_De_Compra_ibfk_1` FOREIGN KEY (`ID_Producto`)  REFERENCES `producto` (`ID_Producto`),
  ADD CONSTRAINT `Lista_De_Compra_ibfk_2` FOREIGN KEY (`ID_Usuario`) REFERENCES `Usuario` (`ID_Usuario`);

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



