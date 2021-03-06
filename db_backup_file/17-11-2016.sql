-- phpMyAdmin SQL Dump
-- version 4.2.7.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Nov 17, 2016 at 06:48 PM
-- Server version: 5.6.20
-- PHP Version: 5.5.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `rsm`
--

-- --------------------------------------------------------

--
-- Table structure for table `employers`
--

CREATE TABLE IF NOT EXISTS `employers` (
`ID` int(11) NOT NULL,
  `U_ID` int(11) NOT NULL,
  `NAME` varchar(100) DEFAULT NULL,
  `TELEPHONE` varchar(20) DEFAULT NULL,
  `ADDRESS` text,
  `PINCODE` varchar(20) DEFAULT NULL,
  `CREATED_AT` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `CREATED_BY` int(11) DEFAULT NULL,
  `MODIFIED_AT` timestamp NULL DEFAULT NULL,
  `MODIFIED_BY` int(11) DEFAULT NULL,
  `DELETE_FL` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `employers`
--

INSERT INTO `employers` (`ID`, `U_ID`, `NAME`, `TELEPHONE`, `ADDRESS`, `PINCODE`, `CREATED_AT`, `CREATED_BY`, `MODIFIED_AT`, `MODIFIED_BY`, `DELETE_FL`) VALUES
(1, 1, 'GWL2', '7795929033', NULL, NULL, '2016-11-12 18:57:51', NULL, NULL, NULL, 0),
(2, 12, 'dell12', '07795929033', NULL, NULL, '2016-11-17 11:29:07', NULL, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `employers_post`
--

CREATE TABLE IF NOT EXISTS `employers_post` (
`ID` int(11) NOT NULL,
  `E_ID` int(11) NOT NULL,
  `NAME` text,
  `POSITIONS` int(11) DEFAULT NULL,
  `LOCATIONS` text,
  `TOTAL_EXP` varchar(30) DEFAULT NULL,
  `KEY_SKILLS` text,
  `JOB_DESCRIPTION` text,
  `ROLE` varchar(50) DEFAULT NULL,
  `START_DATE` datetime DEFAULT NULL,
  `END_DATE` datetime DEFAULT NULL,
  `CREATED_AT` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `CREATED_BY` int(11) DEFAULT NULL,
  `MODIFIED_AT` timestamp NULL DEFAULT NULL,
  `MODIFIED_BY` int(11) DEFAULT NULL,
  `DELETE_FL` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `employers_post`
--

INSERT INTO `employers_post` (`ID`, `E_ID`, `NAME`, `POSITIONS`, `LOCATIONS`, `TOTAL_EXP`, `KEY_SKILLS`, `JOB_DESCRIPTION`, `ROLE`, `START_DATE`, `END_DATE`, `CREATED_AT`, `CREATED_BY`, `MODIFIED_AT`, `MODIFIED_BY`, `DELETE_FL`) VALUES
(1, 1, 'Angular developer', 10, 'bangalore', '3', 'angualr,javascript', 'dasdadasdasdasd', 'Senior software developer', '2016-11-01 00:00:00', '2016-11-17 00:00:00', '2016-11-12 19:03:36', NULL, NULL, NULL, 0),
(2, 1, 'react developer', 3, 'sdasdad', '1', 'react and redux', 'asdasdasdas', 'SOftware developer', '2016-11-15 00:00:00', '2016-11-30 00:00:00', '2016-11-12 19:03:36', NULL, NULL, NULL, 0),
(7, 1, 'react developer2', 3, 'sdasdad', '1', 'react and redux', 'asdasdasdas', 'SOftware developer', '2016-11-15 00:00:00', '2016-11-30 00:00:00', '2016-11-16 10:11:49', NULL, NULL, NULL, 0),
(8, 1, 'react developer by murali121', 3, 'sdasdad', '1', 'react and redux,dot net', 'asdasdasdas', 'SOftware developer', '2016-11-15 00:00:00', '2016-11-30 00:00:00', '2016-11-16 10:12:19', NULL, NULL, NULL, 0),
(9, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2016-11-16 18:42:17', NULL, NULL, NULL, 0),
(10, 1, 'Angualr', 4, 'bangalore', '5', 'sadasd', 'dasdasd', 'asdasdas', '2016-11-16 18:30:00', '2016-11-26 18:30:00', '2016-11-17 13:24:09', NULL, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `job_seekers`
--

CREATE TABLE IF NOT EXISTS `job_seekers` (
`ID` int(11) NOT NULL,
  `FULL_NAME` varchar(50) NOT NULL,
  `EMAIL` varchar(50) NOT NULL,
  `TELEPHONE` varchar(50) NOT NULL,
  `CURRENT_LOCATION` varchar(50) DEFAULT NULL,
  `KEY_SKILLS` text,
  `TOTAL_EXP` varchar(50) DEFAULT NULL,
  `CURRENT_DESIGNATION` varchar(50) DEFAULT NULL,
  `CURRENT_EMPLOYER` varchar(30) DEFAULT NULL,
  `CURRENT_SALARY` varchar(100) DEFAULT NULL,
  `HIGH_QUALIFICATION` varchar(50) DEFAULT NULL,
  `INSTITION` varchar(50) DEFAULT NULL,
  `RESUME_TITLE` varchar(50) DEFAULT NULL,
  `CREATED_AT` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `CREATED_BY` int(11) DEFAULT NULL,
  `MODIFIED_AT` timestamp NULL DEFAULT NULL,
  `MODIFIED_BY` int(11) DEFAULT NULL,
  `DELETE_FL` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `job_seekers`
--

INSERT INTO `job_seekers` (`ID`, `FULL_NAME`, `EMAIL`, `TELEPHONE`, `CURRENT_LOCATION`, `KEY_SKILLS`, `TOTAL_EXP`, `CURRENT_DESIGNATION`, `CURRENT_EMPLOYER`, `CURRENT_SALARY`, `HIGH_QUALIFICATION`, `INSTITION`, `RESUME_TITLE`, `CREATED_AT`, `CREATED_BY`, `MODIFIED_AT`, `MODIFIED_BY`, `DELETE_FL`) VALUES
(1, 'Murali', 'muralim0033@gmail.com', '7795929033', 'Bangalore', 'anguale,react,knockout', '4', 'consultant', 'neudesic', '600000', 'be', 'uvce', '4 yeara exp', '2016-11-16 13:08:21', NULL, NULL, NULL, 0),
(2, 'Murali M 4', 'muralim0032@gmail.com', '7795929033', 'Bangalore', 'anguale,react,knockout', '4', 'consultant', 'neudesic', '600000', 'be', 'uvce', '4 yeara exp', '2016-11-16 13:08:21', NULL, NULL, NULL, 0),
(3, 'Murali M', 'muralim0032@gmail.com', '7795929033', 'Bangalore', 'anguale,react,knockout', '4', 'consultant', 'neudesic', '600000', 'be', 'uvce', '4 yeara exp', '2016-11-16 13:08:21', NULL, NULL, NULL, 0),
(4, 'Murali mm', 'muralim0032@gmail.com', '7795929033', 'Bangalore', 'dot net', '4', 'consultant', 'neudesic', '600000', 'be', 'uvce', '4 yeara exp', '2016-11-16 13:08:21', NULL, NULL, NULL, 0),
(5, 'Murali M 2', 'muralim0032@gmail.com', '7795929033', 'Bangalore', 'anguale,react,knockout', '4', 'consultant', 'neudesic', '600000', 'be', 'uvce', '4 yeara exp', '2016-11-16 13:08:21', NULL, NULL, NULL, 0),
(6, 'Murali M 3', 'muralim0032@gmail.com', '7795929033', 'Bangalore', 'anguale,react,knockout', '4', 'consultant', 'neudesic', '600000', 'be', 'uvce', '4 yeara exp', '2016-11-16 13:08:21', NULL, NULL, NULL, 0),
(7, 'Murali M 4', 'muralim0032@gmail.com', '7795929033', 'Bangalore', 'anguale,react,knockout', '4', 'consultant', 'neudesic', '600000', 'be', 'uvce', '4 yeara exp', '2016-11-16 13:08:42', NULL, NULL, NULL, 0),
(8, 'Murali M 4', 'muralim0032@gmail.com', '7795929033', 'Bangalore', 'anguale,react,knockout', '4', 'consultant', 'neudesic', '600000', 'be', 'uvce', '4 yeara exp', '2016-11-17 16:37:32', NULL, NULL, NULL, 0),
(9, 'Murali M', 'muralim4242@gmail.com', '07795929033', 'bangalore', 'asdsad', '3', 'asfs', 'fsdf', '2334555', 'fdsfsd', 'daf', 'fsdf', '2016-11-17 17:31:55', NULL, NULL, NULL, 0),
(10, 'Murali M2', 'muralim4242@gmail.com', '07795929033', 'bangalore', 'asdsad', '3', 'asfs', 'fsdf', '2334555', 'fdsfsd', 'daf', 'fsdf', '2016-11-17 17:33:06', NULL, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE IF NOT EXISTS `permissions` (
`ID` int(11) NOT NULL,
  `NAME` varchar(100) DEFAULT NULL,
  `DESCRIPTION` varchar(100) DEFAULT NULL,
  `CREATED_AT` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `CREATED_BY` int(11) DEFAULT NULL,
  `MODIFIED_AT` timestamp NULL DEFAULT NULL,
  `MODIFIED_BY` int(11) DEFAULT NULL,
  `VERSION_ID` int(11) DEFAULT NULL,
  `DELETE_FL` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE IF NOT EXISTS `roles` (
`ID` int(11) NOT NULL,
  `NAME` varchar(100) DEFAULT NULL,
  `CREATED_AT` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `CREATED_BY` int(11) DEFAULT NULL,
  `MODIFIED_AT` timestamp NULL DEFAULT NULL,
  `MODIFIED_BY` int(11) DEFAULT NULL,
  `VERSION_ID` int(11) DEFAULT NULL,
  `DELETE_FL` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`ID`, `NAME`, `CREATED_AT`, `CREATED_BY`, `MODIFIED_AT`, `MODIFIED_BY`, `VERSION_ID`, `DELETE_FL`) VALUES
(1, 'Admin', '2016-11-11 10:16:12', NULL, NULL, NULL, NULL, 0),
(2, 'Employer', '2016-11-11 10:16:12', NULL, NULL, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `role_permission`
--

CREATE TABLE IF NOT EXISTS `role_permission` (
`ID` int(11) NOT NULL,
  `ROLE_ID` int(11) DEFAULT NULL,
  `PERMISSION_ID` int(11) DEFAULT NULL,
  `CREATED_AT` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `CREATED_BY` int(11) DEFAULT NULL,
  `MODIFIED_AT` timestamp NULL DEFAULT NULL,
  `MODIFIED_BY` int(11) DEFAULT NULL,
  `VERSION_ID` int(11) DEFAULT NULL,
  `DELETE_FL` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
`ID` int(11) NOT NULL,
  `EMAIL` varchar(100) NOT NULL,
  `PASSWORD_HASH` varchar(100) NOT NULL,
  `API_KEY` varchar(100) DEFAULT NULL,
  `ROLE_ID` int(11) DEFAULT NULL,
  `CREATED_AT` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `CREATED_BY` int(11) DEFAULT NULL,
  `MODIFIED_AT` timestamp NULL DEFAULT NULL,
  `MODIFIED_BY` int(11) DEFAULT NULL,
  `VERSION_ID` int(11) DEFAULT NULL,
  `DELETE_FL` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=14 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`ID`, `EMAIL`, `PASSWORD_HASH`, `API_KEY`, `ROLE_ID`, `CREATED_AT`, `CREATED_BY`, `MODIFIED_AT`, `MODIFIED_BY`, `VERSION_ID`, `DELETE_FL`) VALUES
(1, 'muralim4242@gmail.com', '$2a$10$3e60afadf0eeca9e42c61u/M3RbFA6ODMxz/S77puAWRCwLTX9YHm', 'ae34c91102f55a10f8bb8259d6112d39', 2, '2016-11-12 14:52:56', NULL, '2016-11-17 16:40:17', NULL, NULL, 0),
(2, 'muralim42423@gmail.com', '$2a$10$d7136421f7f01a7b631f0uOhMe4zvUztM7hW0y1NKm7j3fAriJeOi', '411d1fc3c2cea75404b1ab4a3f8744c0', 2, '2016-11-12 15:19:34', NULL, '2016-11-17 15:43:38', NULL, NULL, 0),
(3, 'muralim42424@gmail.com', '$2a$10$9aae8a888ae5d7f9b6ff6OuJZo9eZZUn9en2xR5A.UdwF54.AHgEK', '5fc68ff23dde6348224a608943af293f', 2, '2016-11-16 10:30:48', NULL, NULL, NULL, NULL, 0),
(4, 'muralim42425@gmail.com', '$2a$10$2979b65fb1a5176c3994auMqr9vefrQXFxU6mkatcRPZgv6DmIgmO', 'b716473fc96821b4fa4245ee680dd3a1', 2, '2016-11-16 10:31:26', NULL, NULL, NULL, NULL, 0),
(5, 'muralim42421@gmail.com', '$2a$10$a71e1b97bcaaabcc90aa8uDBS4ROZe.RaNq0X0xDid4PdohiayHhe', '8168034057b3e8f7d93a0d0cc6f818a5', 2, '2016-11-17 10:53:33', NULL, NULL, NULL, NULL, 0),
(6, 'muralim42422@gmail.com', '$2a$10$413ac6d5b6d8d65cf553eu.LU7O9tMYR2qOmMi5ih9ZyWrU./Ek2e', 'a74f84e4bc5b6fdc7ff66bc68df17fbd', 2, '2016-11-17 10:56:36', NULL, NULL, NULL, NULL, 0),
(7, 'muralim42427@gmail.com', '$2a$10$d4aba462023b9bbc8fad2uBPD2DHdrgzjPNiRhtufTlzCEfpIVGUy', 'e3f19e1243860196bae56799ca957b0f', 2, '2016-11-17 10:58:51', NULL, NULL, NULL, NULL, 0),
(8, 'muralim42428@gmail.com', '$2a$10$ae30f4e4c23e2db812915O9D/s0tnLCmbdcN8uQaGL6HE06atOjJS', 'cc97849c1ff9d48fead64eb4af6906a5', 2, '2016-11-17 10:59:37', NULL, NULL, NULL, NULL, 0),
(9, 'muralim42429@gmail.com', '$2a$10$646e42d3dddf708799b93eq9l4NOTffzYRs0CB5MlIOkn0GgQN7QK', 'fccd13752b9659394b294d00e8a445da', 2, '2016-11-17 11:00:22', NULL, NULL, NULL, NULL, 0),
(10, 'muralim424210@gmail.com', '$2a$10$776b5871d22026b8a705deA6s2lSGdeZzreHQj6pMJHm1rmReON8C', '6c83dfab7b9e332c263da8d55e11f087', 2, '2016-11-17 11:08:24', NULL, NULL, NULL, NULL, 0),
(11, 'muralim424211@gmail.com', '$2a$10$ad8d7cb3b47908e482edbOpslYOeJ4x2nGVpvLg7YKtZn.JUtTZl.', '7f61a8fa3027b8cbc06872cf0a99bea5', 2, '2016-11-17 11:09:27', NULL, NULL, NULL, NULL, 0),
(12, 'muralim424213@gmail.com', '$2a$10$7f462133fa96e5af59bbbOziDNsoap5F3hCOO7RYlbTHYUvJdd8e.', '01bb35fca10d0c0aa0120ff104ab765c', 2, '2016-11-17 11:16:53', NULL, NULL, NULL, NULL, 0),
(13, 'muralim424215@gmail.com', '$2a$10$eee14fcdf94f969a4b055u8jVSFOc6qjpUNUtODRsPBHow2zDrv9S', 'a10fc7ca3c250c4f3e711171a1b45e0c', 2, '2016-11-17 11:29:01', NULL, NULL, NULL, NULL, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `employers`
--
ALTER TABLE `employers`
 ADD PRIMARY KEY (`ID`), ADD KEY `U_ID` (`U_ID`);

--
-- Indexes for table `employers_post`
--
ALTER TABLE `employers_post`
 ADD PRIMARY KEY (`ID`), ADD KEY `E_ID` (`E_ID`);

--
-- Indexes for table `job_seekers`
--
ALTER TABLE `job_seekers`
 ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
 ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
 ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `role_permission`
--
ALTER TABLE `role_permission`
 ADD PRIMARY KEY (`ID`), ADD KEY `ROLE_FK` (`ROLE_ID`), ADD KEY `PERMISSION_FK` (`PERMISSION_ID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
 ADD PRIMARY KEY (`ID`), ADD KEY `ROLE_FK` (`ROLE_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `employers`
--
ALTER TABLE `employers`
MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `employers_post`
--
ALTER TABLE `employers_post`
MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `job_seekers`
--
ALTER TABLE `job_seekers`
MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `role_permission`
--
ALTER TABLE `role_permission`
MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=14;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `employers_post`
--
ALTER TABLE `employers_post`
ADD CONSTRAINT `employers_post_ibfk_1` FOREIGN KEY (`E_ID`) REFERENCES `employers` (`ID`);

--
-- Constraints for table `role_permission`
--
ALTER TABLE `role_permission`
ADD CONSTRAINT `ROLE_PERMISSION_ibfk_1` FOREIGN KEY (`ROLE_ID`) REFERENCES `roles` (`ID`) ON UPDATE CASCADE,
ADD CONSTRAINT `ROLE_PERMISSION_ibfk_2` FOREIGN KEY (`PERMISSION_ID`) REFERENCES `permissions` (`ID`) ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
ADD CONSTRAINT `USER_ibfk_2` FOREIGN KEY (`ROLE_ID`) REFERENCES `roles` (`ID`) ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
