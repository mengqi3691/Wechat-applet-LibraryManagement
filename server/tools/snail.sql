
CREATE TABLE `books` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `isbn` varchar(20) CHARACTER SET utf8 NOT NULL COMMENT '图书isbn号',
  `openid` varchar(50) CHARACTER SET utf8 NOT NULL COMMENT '用户信息',
  `title` varchar(100) CHARACTER SET utf8 NOT NULL COMMENT '图书名称',
  `image` varchar(100) CHARACTER SET utf8 DEFAULT NULL COMMENT '图片链接',
  `alt` varchar(100) CHARACTER SET utf8 DEFAULT NULL COMMENT '图书链接地址',
  `publisher` varchar(50) CHARACTER SET utf8 NOT NULL COMMENT '出版社',
  `summary` varchar(10000) CHARACTER SET utf8 NOT NULL COMMENT '图书简介',
  `price` varchar(100) CHARACTER SET utf8 DEFAULT NULL COMMENT '图书价格',
  `rate` float DEFAULT NULL COMMENT '图书评分',
  `tags` varchar(100) CHARACTER SET utf8 DEFAULT NULL COMMENT '图书标签',
  `author` varchar(100) CHARACTER SET utf8 DEFAULT NULL COMMENT '作者',
  `count` int(11) DEFAULT '0' COMMENT '浏览量',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openid` varchar(50) CHARACTER SET utf8 NOT NULL COMMENT '用户信息',
  `bookid` varchar(10) CHARACTER SET utf8 NOT NULL COMMENT '图书id',
  `comment` varchar(200) CHARACTER SET utf8 NOT NULL COMMENT '图书短评',
  `phoneInfo` varchar(200) CHARACTER SET utf8 COMMENT '手机信息',
  `locationInfo` varchar(200) CHARACTER SET utf8 COMMENT '地址信息',
   PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
