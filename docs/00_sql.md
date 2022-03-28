#### 总
```
常用,暂时只对接这些：
分时 kline_second
15分钟 kline_15m
1小时 kline_1h
4小时 kline_4h
1天 kline_1d
周线 kline_1d
月线 kline_1M

支持的全部：

分时
1分钟
3分钟
5分钟
15分钟
30分钟
1小时
2小时
4小时
6小时
8小时
12小时
1天
3天
周线
月线
```
#### 
```sql
CREATE TABLE `kline`(
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `asset` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `strategyId` int(0) NOT NULL,
  `quantity` double(32,8) NULL DEFAULT NULL,
  `price` double(32,8) NULL DEFAULT NULL,
  `cost_price` double(32,8) NULL DEFAULT NULL,
  `profit_ratio` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `profit_amount` double(8,2) NULL DEFAULT NULL,
  `first_order_id` bigint(0) NULL DEFAULT NULL,
  `first_order_price` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `last_order_id` bigint(0) NULL DEFAULT NULL,
  `last_order_price` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `is_running` tinyint(1) NOT NULL,
	`update_time`  timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 25 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;
```