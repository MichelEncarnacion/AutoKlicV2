-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-07-2025 a las 23:38:07
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `autosklic`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cita_prueba_manejo`
--

CREATE TABLE `cita_prueba_manejo` (
  `id` int(11) NOT NULL,
  `cliente_id` int(11) DEFAULT NULL,
  `vehiculo_id` int(11) DEFAULT NULL,
  `empleado_id` int(11) DEFAULT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `estado` varchar(255) DEFAULT NULL COMMENT 'Programada, Completada, Cancelada'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `rfc` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleado`
--

CREATE TABLE `empleado` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `cargo` varchar(255) DEFAULT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `fecha_ingreso` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventario`
--

CREATE TABLE `inventario` (
  `id` int(11) NOT NULL,
  `vehiculo_id` int(11) DEFAULT NULL,
  `ubicacion` varchar(255) DEFAULT NULL,
  `disponible` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `multimedia`
--

CREATE TABLE `multimedia` (
  `id` int(11) NOT NULL,
  `vehiculo_id` int(11) NOT NULL,
  `tipo` varchar(255) DEFAULT NULL COMMENT 'imagen, video, documento',
  `url` varchar(255) DEFAULT NULL COMMENT 'Ruta o enlace al archivo multimedia',
  `descripcion` varchar(255) DEFAULT NULL,
  `es_principal` tinyint(1) DEFAULT NULL COMMENT 'true si es la imagen destacada',
  `fecha_subida` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `multimedia`
--

INSERT INTO `multimedia` (`id`, `vehiculo_id`, `tipo`, `url`, `descripcion`, `es_principal`, `fecha_subida`) VALUES
(0, 0, 'imagen', 'uploads/vehiculos/1.jpg', 'Vista frontal', 1, '2025-07-26 05:27:20');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicio_postventa`
--

CREATE TABLE `servicio_postventa` (
  `id` int(11) NOT NULL,
  `vehiculo_id` int(11) DEFAULT NULL,
  `cliente_id` int(11) DEFAULT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `descripcion` text DEFAULT NULL,
  `costo` decimal(10,0) DEFAULT NULL,
  `tipo_servicio` varchar(255) DEFAULT NULL COMMENT 'Mantenimiento, Reparación, Garantía'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sucursal`
--

CREATE TABLE `sucursal` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  `ciudad` varchar(255) DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `rol` varchar(255) DEFAULT NULL COMMENT 'admin, vendedor, gerente, etc.',
  `empleado_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehiculo`
--

CREATE TABLE `vehiculo` (
  `id` int(11) NOT NULL,
  `marca` varchar(255) DEFAULT NULL,
  `modelo` varchar(255) DEFAULT NULL,
  `año` int(11) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `tipo_combustible` varchar(255) DEFAULT NULL,
  `transmision` varchar(255) DEFAULT NULL,
  `precio` decimal(10,0) DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL COMMENT 'Disponible, Vendido, Reservado, etc.',
  `kilometraje` int(11) DEFAULT NULL,
  `tipo` varchar(255) DEFAULT NULL COMMENT 'Nuevo, Usado',
  `fecha_ingreso` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `vehiculo`
--

INSERT INTO `vehiculo` (`id`, `marca`, `modelo`, `año`, `color`, `tipo_combustible`, `transmision`, `precio`, `estado`, `kilometraje`, `tipo`, `fecha_ingreso`) VALUES
(0, 'Ford', 'Ranger', 2021, 'Azul', 'Diesel', 'Automática', 420000, 'Disponible', 15300, 'Usado', '2025-07-26 05:16:39');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehiculo_sucursal`
--

CREATE TABLE `vehiculo_sucursal` (
  `id` int(11) NOT NULL,
  `vehiculo_id` int(11) DEFAULT NULL,
  `sucursal_id` int(11) DEFAULT NULL,
  `disponible` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `venta`
--

CREATE TABLE `venta` (
  `id` int(11) NOT NULL,
  `fecha_venta` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `vehiculo_id` int(11) NOT NULL,
  `cliente_id` int(11) NOT NULL,
  `empleado_id` int(11) NOT NULL,
  `precio_final` decimal(10,0) DEFAULT NULL,
  `forma_pago` varchar(255) DEFAULT NULL COMMENT 'Efectivo, Transferencia, Financiamiento'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cita_prueba_manejo`
--
ALTER TABLE `cita_prueba_manejo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cita_cliente` (`cliente_id`),
  ADD KEY `cita_vehiculo` (`vehiculo_id`),
  ADD KEY `cita_empleado` (`empleado_id`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `empleado`
--
ALTER TABLE `empleado`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `inventario`
--
ALTER TABLE `inventario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `inventario_vehiculo` (`vehiculo_id`);

--
-- Indices de la tabla `multimedia`
--
ALTER TABLE `multimedia`
  ADD PRIMARY KEY (`id`),
  ADD KEY `multimedia_vehiculo` (`vehiculo_id`);

--
-- Indices de la tabla `servicio_postventa`
--
ALTER TABLE `servicio_postventa`
  ADD PRIMARY KEY (`id`),
  ADD KEY `servicio_cliente` (`cliente_id`),
  ADD KEY `servicio_vehiculo` (`vehiculo_id`);

--
-- Indices de la tabla `sucursal`
--
ALTER TABLE `sucursal`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_empleado` (`empleado_id`);

--
-- Indices de la tabla `vehiculo`
--
ALTER TABLE `vehiculo`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `vehiculo_sucursal`
--
ALTER TABLE `vehiculo_sucursal`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vehiculo_sucursal_vehiculo` (`vehiculo_id`),
  ADD KEY `vehiculo_sucursal_sucursal` (`sucursal_id`);

--
-- Indices de la tabla `venta`
--
ALTER TABLE `venta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `venta_vehiculo` (`vehiculo_id`),
  ADD KEY `venta_cliente` (`cliente_id`),
  ADD KEY `venta_empleado` (`empleado_id`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cita_prueba_manejo`
--
ALTER TABLE `cita_prueba_manejo`
  ADD CONSTRAINT `cita_cliente` FOREIGN KEY (`cliente_id`) REFERENCES `cliente` (`id`),
  ADD CONSTRAINT `cita_empleado` FOREIGN KEY (`empleado_id`) REFERENCES `empleado` (`id`),
  ADD CONSTRAINT `cita_vehiculo` FOREIGN KEY (`vehiculo_id`) REFERENCES `vehiculo` (`id`);

--
-- Filtros para la tabla `inventario`
--
ALTER TABLE `inventario`
  ADD CONSTRAINT `inventario_vehiculo` FOREIGN KEY (`vehiculo_id`) REFERENCES `vehiculo` (`id`);

--
-- Filtros para la tabla `multimedia`
--
ALTER TABLE `multimedia`
  ADD CONSTRAINT `multimedia_vehiculo` FOREIGN KEY (`vehiculo_id`) REFERENCES `vehiculo` (`id`);

--
-- Filtros para la tabla `servicio_postventa`
--
ALTER TABLE `servicio_postventa`
  ADD CONSTRAINT `servicio_cliente` FOREIGN KEY (`cliente_id`) REFERENCES `cliente` (`id`),
  ADD CONSTRAINT `servicio_vehiculo` FOREIGN KEY (`vehiculo_id`) REFERENCES `vehiculo` (`id`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_empleado` FOREIGN KEY (`empleado_id`) REFERENCES `empleado` (`id`);

--
-- Filtros para la tabla `vehiculo_sucursal`
--
ALTER TABLE `vehiculo_sucursal`
  ADD CONSTRAINT `vehiculo_sucursal_sucursal` FOREIGN KEY (`sucursal_id`) REFERENCES `sucursal` (`id`),
  ADD CONSTRAINT `vehiculo_sucursal_vehiculo` FOREIGN KEY (`vehiculo_id`) REFERENCES `vehiculo` (`id`);

--
-- Filtros para la tabla `venta`
--
ALTER TABLE `venta`
  ADD CONSTRAINT `venta_cliente` FOREIGN KEY (`cliente_id`) REFERENCES `cliente` (`id`),
  ADD CONSTRAINT `venta_empleado` FOREIGN KEY (`empleado_id`) REFERENCES `empleado` (`id`),
  ADD CONSTRAINT `venta_vehiculo` FOREIGN KEY (`vehiculo_id`) REFERENCES `vehiculo` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
