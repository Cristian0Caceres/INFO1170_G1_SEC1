-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-12-2024 a las 22:52:34
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `a2024_vmatus`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `info1170_categoria`
--

CREATE TABLE `info1170_categoria` (
  `ID_Categoria` int(11) NOT NULL,
  `Nombre_Categoria` char(60) DEFAULT NULL,
  `Descripcion_Categoria` text DEFAULT NULL,
  `imagen_categoria` varchar(2083) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `info1170_categoria`
--

INSERT INTO `info1170_categoria` (`ID_Categoria`, `Nombre_Categoria`, `Descripcion_Categoria`, `imagen_categoria`) VALUES
(1, 'Lacteos', NULL, 'https://www.nestle-contigo.co/sites/default/files/2020-05/La%CC%81cteos_%20nutricio%CC%81n%20para%20todos%20los%20gustos%201900x650_0.jpg'),
(2, 'Despensa', NULL, 'https://i.ibb.co/fNvTCYk/Designer-2.png'),
(3, 'Frutas y Verduras', NULL, 'https://www.shutterstock.com/image-photo/large-collection-fruits-vegetables-berries-260nw-2404051649.jpg'),
(4, 'Carniceria', NULL, 'https://www.65ymas.com/uploads/s1/11/19/41/5/bigstock-various-raw-meat-fish-and-pou-442148717.jpeg'),
(5, 'Vinos, Cervezas y Licores', NULL, 'https://denegocios.cl/wp-content/uploads/2024/01/Tipos-de-Patentes-de-Acoholes-en-Chile-2.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `info1170_consulta`
--

CREATE TABLE `info1170_consulta` (
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
-- Estructura de tabla para la tabla `info1170_lista_de_compra`
--

CREATE TABLE `info1170_lista_de_compra` (
  `ID_Lista_De_Compras` int(11) NOT NULL,
  `ID_Producto` int(11) DEFAULT NULL,
  `ID_Usuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `info1170_producto`
--

CREATE TABLE `info1170_producto` (
  `ID_Producto` int(11) NOT NULL,
  `ID_Proveedor` int(11) DEFAULT NULL,
  `ID_Categoria` int(11) DEFAULT NULL,
  `Nombre_producto` char(60) DEFAULT NULL,
  `Costo` int(11) DEFAULT NULL,
  `Descripcion_Producto` text DEFAULT NULL,
  `link_producto` varchar(2083) DEFAULT NULL,
  `imagen_producto` varchar(2083) DEFAULT NULL,
  `Actualizado` tinyint(1) NOT NULL,
  `Fecha` date DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `info1170_proveedor`
--

CREATE TABLE `info1170_proveedor` (
  `ID_Proveedor` int(11) NOT NULL,
  `Nombre_Proveedor` char(60) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `info1170_proveedor`
--

INSERT INTO `info1170_proveedor` (`ID_Proveedor`, `Nombre_Proveedor`) VALUES
(1, 'Santa Isabel'),
(2, 'Jumbo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `info1170_usuario`
--

CREATE TABLE `info1170_usuario` (
  `ID_Usuario` int(11) NOT NULL,
  `Nombre_Usuario` varchar(60) DEFAULT NULL,
  `correo_Usuario` varchar(120) DEFAULT NULL,
  `Contrasena_Usuario` varchar(255) DEFAULT NULL,
  `Rol` enum('admin','usuario') DEFAULT 'usuario'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `info1170_usuario`
--

INSERT INTO `info1170_usuario` (`ID_Usuario`, `Nombre_Usuario`, `correo_Usuario`, `Contrasena_Usuario`, `Rol`) VALUES
(1, 'Cacique', 'caciquedelahorro@gmail.com', '$2b$07$lww7y1Vz7DQA1NeoWLzjduYRiq0Yi8eMF7VY0K0RYZ53o4/9SEBpG', 'admin'),
(2, 'Admin', 'caciquedelahorro@gmail.com', '$2b$07$lww7y1Vz7DQA1NeoWLzjduYRiq0Yi8eMF7VY0K0RYZ53o4/9SEBpG', 'admin'),
(3, 'Vicente', 'vicentematus.games@gmail.com', '$2b$07$fTttoGyZ5w603rB05aeqP.2tRYhtpLSDsFZVRxJ6k6N2Co/.YKWO.', 'usuario');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `info1170_categoria`
--
ALTER TABLE `info1170_categoria`
  ADD PRIMARY KEY (`ID_Categoria`);

--
-- Indices de la tabla `info1170_consulta`
--
ALTER TABLE `info1170_consulta`
  ADD PRIMARY KEY (`ID_Consulta`),
  ADD KEY `ID_Usuario` (`ID_Usuario`);

--
-- Indices de la tabla `info1170_lista_de_compra`
--
ALTER TABLE `info1170_lista_de_compra`
  ADD PRIMARY KEY (`ID_Lista_De_Compras`),
  ADD KEY `ID_Producto` (`ID_Producto`);

--
-- Indices de la tabla `info1170_producto`
--
ALTER TABLE `info1170_producto`
  ADD PRIMARY KEY (`ID_Producto`),
  ADD KEY `ID_Categoria` (`ID_Categoria`),
  ADD KEY `ID_Proveedor` (`ID_Proveedor`);

--
-- Indices de la tabla `info1170_proveedor`
--
ALTER TABLE `info1170_proveedor`
  ADD PRIMARY KEY (`ID_Proveedor`);

--
-- Indices de la tabla `info1170_usuario`
--
ALTER TABLE `info1170_usuario`
  ADD PRIMARY KEY (`ID_Usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `info1170_categoria`
--
ALTER TABLE `info1170_categoria`
  MODIFY `ID_Categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `info1170_consulta`
--
ALTER TABLE `info1170_consulta`
  MODIFY `ID_Consulta` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `info1170_lista_de_compra`
--
ALTER TABLE `info1170_lista_de_compra`
  MODIFY `ID_Lista_De_Compras` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `info1170_producto`
--
ALTER TABLE `info1170_producto`
  MODIFY `ID_Producto` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `info1170_proveedor`
--
ALTER TABLE `info1170_proveedor`
  MODIFY `ID_Proveedor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `info1170_usuario`
--
ALTER TABLE `info1170_usuario`
  MODIFY `ID_Usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;