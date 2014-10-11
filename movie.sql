/*
Navicat MySQL Data Transfer

Source Server         : WMS
Source Server Version : 50616
Source Host           : localhost:3306
Source Database       : movie

Target Server Type    : MYSQL
Target Server Version : 50616
File Encoding         : 65001

Date: 2014-10-11 10:14:43
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `credit`
-- ----------------------------
DROP TABLE IF EXISTS `credit`;
CREATE TABLE `credit` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `reason` varchar(100) NOT NULL,
  `time` date DEFAULT NULL,
  `uid` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKAF65AAF96A7C791C` (`uid`),
  CONSTRAINT `FKAF65AAF96A7C791C` FOREIGN KEY (`uid`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of credit
-- ----------------------------

-- ----------------------------
-- Table structure for `login_log`
-- ----------------------------
DROP TABLE IF EXISTS `login_log`;
CREATE TABLE `login_log` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `ip` varchar(40) NOT NULL,
  `loginsuccess` tinyint(1) NOT NULL,
  `logintime` datetime DEFAULT NULL,
  `uid` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK998AE56E6A7C791C` (`uid`),
  CONSTRAINT `FK998AE56E6A7C791C` FOREIGN KEY (`uid`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=298 DEFAULT CHARSET=utf8;


-- ----------------------------
-- Table structure for `movie`
-- ----------------------------
DROP TABLE IF EXISTS `movie`;
CREATE TABLE `movie` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `actor` varchar(100) NOT NULL,
  `author` varchar(50) NOT NULL,
  `description` longtext,
  `duration` int(11) NOT NULL,
  `filename` varchar(30) DEFAULT NULL,
  `madetime` date DEFAULT NULL,
  `size` bigint(20) NOT NULL,
  `time` datetime DEFAULT NULL,
  `title` varchar(100) NOT NULL,
  `type` varchar(20) NOT NULL,
  `uid` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK6343F306A7C791C` (`uid`),
  CONSTRAINT `FK6343F306A7C791C` FOREIGN KEY (`uid`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of movie
-- ----------------------------
INSERT INTO `movie` VALUES ('1', '朱军、杨晨', 'CCTV', '', '209', null, '2013-08-31', '4282', '2013-08-31 15:22:40', '相信未来', '励志', '201158080111');

-- ----------------------------
-- Table structure for `movie_application_table`
-- ----------------------------
DROP TABLE IF EXISTS `movie_application_table`;
CREATE TABLE `movie_application_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `add_date` datetime DEFAULT NULL,
  `description` longtext,
  `icon_cls` varchar(50) DEFAULT NULL,
  `module` varchar(200) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `tip` varchar(250) DEFAULT NULL,
  `version` varchar(50) DEFAULT NULL,
  `user_id` varchar(20) DEFAULT NULL,
  `type_app` bit(1) NOT NULL,
  `type_group` varchar(255) DEFAULT NULL,
  `use_count` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_aoghaejn49rutom9owr496307` (`user_id`),
  CONSTRAINT `FK_aoghaejn49rutom9owr496307` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of movie_application_table
-- ----------------------------
INSERT INTO `movie_application_table` VALUES ('1', '2014-06-12 15:59:05', '查看本系统运行状态', 'cpu-shortcut', 'Wdesktop.desktop.widget.SystemStatus', 'SystemStatus', '查看服务器的运行状态', '1.0.0', '201158080111', '', '管理', '0');
INSERT INTO `movie_application_table` VALUES ('2', '2014-06-21 22:47:27', '查看本系统运行状态', 'cpu-shortcut', 'Wdesktop.desktop.widget.SystemStatus', 'SystemStatus', '查看服务器的运行状态', '1.0.0', '201158080111', '', '管理', '0');
INSERT INTO `movie_application_table` VALUES ('3', '2014-07-01 19:41:22', '应用市场，卸载或者添加应用', 'appManager_icon', 'Wdesktop.app.bootstrap.AppManagerBootStrap', '应用市场', '增加或者删除应用', '1.0.0', '201158080111', '', '管理', '0');

-- ----------------------------
-- Table structure for `movie_playlist`
-- ----------------------------
DROP TABLE IF EXISTS `movie_playlist`;
CREATE TABLE `movie_playlist` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `uid` varchar(20) DEFAULT NULL,
  `movieid` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKA538A016A7C791C` (`uid`),
  KEY `FKA538A012E8AD69A` (`movieid`),
  CONSTRAINT `FKA538A012E8AD69A` FOREIGN KEY (`movieid`) REFERENCES `movie` (`id`),
  CONSTRAINT `FKA538A016A7C791C` FOREIGN KEY (`uid`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of movie_playlist
-- ----------------------------
INSERT INTO `movie_playlist` VALUES ('1', '201158080111', '1');

-- ----------------------------
-- Table structure for `music`
-- ----------------------------
DROP TABLE IF EXISTS `music`;
CREATE TABLE `music` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `description` longtext,
  `duration` int(11) NOT NULL,
  `singer` varchar(50) NOT NULL,
  `size` bigint(20) NOT NULL,
  `time` datetime DEFAULT NULL,
  `title` varchar(100) NOT NULL,
  `type` varchar(20) NOT NULL,
  `year` int(11) NOT NULL,
  `uid` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK636EE256A7C791C` (`uid`),
  CONSTRAINT `FK636EE256A7C791C` FOREIGN KEY (`uid`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of music
-- ----------------------------
INSERT INTO `music` VALUES ('1', '', '273', '张学友', '2056', '2013-08-31 14:14:00', '祝福', '流行音乐', '2011', '201158080111');
INSERT INTO `music` VALUES ('2', '', '249', '孙悦', '1730', '2013-08-31 14:27:00', '祝您平安', '流行音乐', '2011', '201158080111');
INSERT INTO `music` VALUES ('3', '', '275', '张雨生', '4298', '2013-08-31 14:57:03', '大海', '流行音乐', '2005', '201158080111');

-- ----------------------------
-- Table structure for `music_playlist`
-- ----------------------------
DROP TABLE IF EXISTS `music_playlist`;
CREATE TABLE `music_playlist` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `uid` varchar(20) DEFAULT NULL,
  `musicid` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKA1BDDEAC6A7C791C` (`uid`),
  KEY `FKA1BDDEAC38A04B44` (`musicid`),
  CONSTRAINT `FKA1BDDEAC38A04B44` FOREIGN KEY (`musicid`) REFERENCES `music` (`id`),
  CONSTRAINT `FKA1BDDEAC6A7C791C` FOREIGN KEY (`uid`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of music_playlist
-- ----------------------------

-- ----------------------------
-- Table structure for `notebook`
-- ----------------------------
DROP TABLE IF EXISTS `notebook`;
CREATE TABLE `notebook` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `description` longtext,
  `mood` varchar(30) NOT NULL,
  `notedate` date DEFAULT NULL,
  `type` varchar(10) NOT NULL,
  `weather` varchar(30) NOT NULL,
  `writetime` datetime DEFAULT NULL,
  `uid` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK5E44A1DB6A7C791C` (`uid`),
  CONSTRAINT `FK5E44A1DB6A7C791C` FOREIGN KEY (`uid`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of notebook
-- ----------------------------
-- ----------------------------
-- Table structure for `theme_table`
-- ----------------------------
DROP TABLE IF EXISTS `theme_table`;
CREATE TABLE `theme_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `add_date` datetime DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `img_path` varchar(100) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `path` varchar(100) DEFAULT NULL,
  `user_id` varchar(20) DEFAULT NULL,
  `default_theme` bit(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_j96p5cn765e0hghayjxqmuqlu` (`user_id`),
  CONSTRAINT `FK_j96p5cn765e0hghayjxqmuqlu` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of theme_table
-- ----------------------------
INSERT INTO `theme_table` VALUES ('1', '2014-06-13 11:06:11', '默认风格', 'desktop/resources/theme/default.png', '默认风格', 'desktop/resources/extjs4.2.2/resources/css/theme-default.css', '201158080111', '');
INSERT INTO `theme_table` VALUES ('2', '2014-06-13 11:06:11', '现代风格', 'desktop/resources/theme/access.png', '现代风格', 'desktop/resources/extjs4.2.2/resources/css/theme-access.css', '201158080111', '');
INSERT INTO `theme_table` VALUES ('3', '2014-06-13 11:06:11', '银灰风格', 'desktop/resources/theme/gray.png', '银灰风格', 'desktop/resources/extjs4.2.2/resources/css/theme-gray.css', '201158080111', '');
INSERT INTO `theme_table` VALUES ('4', '2014-06-13 11:06:11', '海王星', 'desktop/resources/theme/default.png', '海王星', 'desktop/resources/extjs4.2.2/resources/css/theme-neptune.css', '201158080111', '');

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` varchar(20) NOT NULL,
  `birthday` date DEFAULT NULL,
  `birthplace` varchar(40) NOT NULL,
  `credit` bigint(20) NOT NULL,
  `description` longtext,
  `email` varchar(30) NOT NULL,
  `ip` varchar(15) NOT NULL,
  `name` varchar(20) NOT NULL,
  `password` varchar(80) NOT NULL,
  `qq` varchar(20) DEFAULT NULL,
  `registertime` datetime DEFAULT NULL,
  `user_role` varchar(20) DEFAULT NULL,
  `theme` varchar(20) DEFAULT NULL,
  `disable` bit(1) NOT NULL,
  `last_login_date` datetime DEFAULT NULL,
  `v_status` bit(1) NOT NULL,
  `theme_id` int(11) DEFAULT NULL,
  `salt` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_44yf9o425gpprnqcrvr7nbong` (`theme_id`),
  CONSTRAINT `FK_44yf9o425gpprnqcrvr7nbong` FOREIGN KEY (`theme_id`) REFERENCES `theme_table` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('201158080111', '2013-09-09', '江西省赣州市', '50', '介绍下您自己吧！', '560130911@163.com', '113.240.233.248', '吴梦升', '487368d29c21c0a8049e4873c08e6fc33e411d0c', '', '2013-09-09 10:28:45', 'admin', 'default', '', '2014-07-21 10:28:08', '', '2', 'b74fd24df1a84491');

-- ----------------------------
-- Table structure for `user_app_table`
-- ----------------------------
DROP TABLE IF EXISTS `user_app_table`;
CREATE TABLE `user_app_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `add_date` datetime DEFAULT NULL,
  `app_id` int(11) DEFAULT NULL,
  `user_id` varchar(20) DEFAULT NULL,
  `score` double NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_fcwsfvyjee4e6o7jbc47kk8it` (`app_id`),
  KEY `FK_fvaujn1gpsckg29sbucrn7pp0` (`user_id`),
  CONSTRAINT `FK_fcwsfvyjee4e6o7jbc47kk8it` FOREIGN KEY (`app_id`) REFERENCES `movie_application_table` (`id`),
  CONSTRAINT `FK_fvaujn1gpsckg29sbucrn7pp0` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_app_table
-- ----------------------------
INSERT INTO `user_app_table` VALUES ('1', '2014-06-12 15:59:53', '1', '201158080111', '0');
INSERT INTO `user_app_table` VALUES ('2', '2014-07-01 19:43:08', '3', '201158080111', '0');

-- ----------------------------
-- Table structure for `wallpaper_table`
-- ----------------------------
DROP TABLE IF EXISTS `wallpaper_table`;
CREATE TABLE `wallpaper_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `add_date` datetime DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `path` varchar(250) DEFAULT NULL,
  `wallpaper_type` varchar(255) DEFAULT NULL,
  `user_id` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_pox0fep5sew02vhdw1owlhgrx` (`user_id`),
  CONSTRAINT `FK_pox0fep5sew02vhdw1owlhgrx` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of wallpaper_table
-- ----------------------------
