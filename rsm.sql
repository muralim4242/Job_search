-- phpMyAdmin SQL Dump
-- version 4.2.7.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Nov 11, 2016 at 11:15 AM
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

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
  `MODIFIED_BY` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

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
  `RESUME_TITLE` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `keys`
--

CREATE TABLE IF NOT EXISTS `keys` (
`ID` int(11) NOT NULL,
  `USER_ID` int(11) NOT NULL,
  `KEY` varchar(40) NOT NULL,
  `LEVEL` int(2) NOT NULL,
  `IGNORE_LIMITS` tinyint(1) NOT NULL DEFAULT '0',
  `IS_PRIVATE_KEY` tinyint(1) NOT NULL DEFAULT '0',
  `IP_ADDRESSES` text,
  `DATE_CREATED` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

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
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

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
  `USER_TYPE` varchar(100) DEFAULT NULL,
  `ROLE_ID` int(11) DEFAULT NULL,
  `CREATED_AT` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `CREATED_BY` int(11) DEFAULT NULL,
  `MODIFIED_AT` timestamp NULL DEFAULT NULL,
  `MODIFIED_BY` int(11) DEFAULT NULL,
  `VERSION_ID` int(11) DEFAULT NULL,
  `DELETE_FL` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

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
 ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `job_seekers`
--
ALTER TABLE `job_seekers`
 ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `keys`
--
ALTER TABLE `keys`
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
MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `employers_post`
--
ALTER TABLE `employers_post`
MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `job_seekers`
--
ALTER TABLE `job_seekers`
MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `keys`
--
ALTER TABLE `keys`
MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `role_permission`
--
ALTER TABLE `role_permission`
MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- Constraints for dumped tables
--

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
