-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 11, 2017 at 08:37 AM
-- Server version: 10.1.25-MariaDB
-- PHP Version: 7.1.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `forum`
--

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `postid` int(11) NOT NULL,
  `author` varchar(30) NOT NULL,
  `psubject` varchar(30) NOT NULL,
  `ptitle` varchar(30) NOT NULL,
  `pcontent` varchar(100) NOT NULL,
  `pdate` date NOT NULL,
  `postcid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`postid`, `author`, `psubject`, `ptitle`, `pcontent`, `pdate`, `postcid`) VALUES
(8, 'asd', '123', 'asd', 'qwe', '2017-08-19', 5),
(9, 'PUTA', '', '', '', '2017-08-19', 3),
(10, '123', '123', '123', '123', '2017-08-20', 4),
(11, '234', '234', '234', '234', '2017-08-20', 4);

-- --------------------------------------------------------

--
-- Table structure for table `postcategory`
--

CREATE TABLE `postcategory` (
  `postcategoryid` int(11) NOT NULL,
  `categoryname` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `postcategory`
--

INSERT INTO `postcategory` (`postcategoryid`, `categoryname`) VALUES
(1, 'Cars1234'),
(2, 'Piolo'),
(3, 'Pogi'),
(4, 'Carszxc'),
(5, 'Cars123'),
(6, 'Carsasd'),
(7, 'Carspio'),
(8, 'Carspioasd'),
(9, 'undefined'),
(10, 'undefinedasd'),
(11, 'Carszxcasd'),
(12, 'Pio'),
(13, 'Cute');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `birthday` date NOT NULL,
  `usertype` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `birthday`, `usertype`) VALUES
(3, 'cute ko', 'pio@gmail.com', '12345', '2012-12-23', 'Admin'),
(6, 'piolosalesharold', 'pioloosales@gmail.com', '12345', '1999-10-13', ''),
(7, 'asdasd', 'asdasd@gmail.com', '12345', '1998-02-12', ''),
(8, 'piolosales123', 'pioloasdzxc@gmail.com', '12345', '1999-10-15', ''),
(9, 'jazzjiemari', 'jazz123@gmail.com', 'piolo', '1998-02-12', ''),
(10, 'piolo_s77', 'pioloasd@gmail.com', '123', '1999-10-12', ''),
(11, 'pj', 'pjbobo@gmail.com', '12345', '2322-10-12', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`postid`),
  ADD KEY `postcid` (`postcid`);

--
-- Indexes for table `postcategory`
--
ALTER TABLE `postcategory`
  ADD PRIMARY KEY (`postcategoryid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `postid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `postcategory`
--
ALTER TABLE `postcategory`
  MODIFY `postcategoryid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `post_ibfk_1` FOREIGN KEY (`postcid`) REFERENCES `postcategory` (`postcategoryid`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
