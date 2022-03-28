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
CREATE TABLE `kline_1d` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `symbol` varchar(255) COLLATE utf8_bin NOT NULL COMMENT 'symbol',
  `interval` varchar(255) COLLATE utf8_bin NOT NULL COMMENT 'interval',
  `firstTradeId` int NOT NULL COMMENT 'firstTradeId',
  `lastTradeId` int NOT NULL COMMENT 'lastTradeId',
  `open` varchar(255) COLLATE utf8_bin NOT NULL COMMENT 'open',
  `high` varchar(255) COLLATE utf8_bin NOT NULL COMMENT 'high',
  `close` varchar(255) COLLATE utf8_bin NOT NULL COMMENT 'close',
  `low` varchar(255) COLLATE utf8_bin NOT NULL COMMENT 'low',
  `volume` varchar(255) COLLATE utf8_bin NOT NULL COMMENT 'volume',
  `trades` varchar(255) COLLATE utf8_bin NOT NULL COMMENT 'trades',
  `final` int NOT NULL COMMENT 'final',
  `quoteVolume` varchar(255) COLLATE utf8_bin NOT NULL COMMENT 'quoteVolume',
  `volumeActive` varchar(255) COLLATE utf8_bin NOT NULL COMMENT 'volumeActive',
  `quoteVolumeActive` varchar(255) COLLATE utf8_bin NOT NULL COMMENT 'quoteVolumeActive',
  `startTime` bigint NOT NULL COMMENT 'startTime',
  `endTime` bigint NOT NULL COMMENT 'endTime',
  `ignored` int NOT NULL COMMENT 'ignored',
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin ROW_FORMAT=DYNAMIC;
```

```sql
CREATE TABLE `kline_15m` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `symbol` varchar(255) COLLATE utf8_bin NOT NULL COMMENT 'symbol',
  `interval` varchar(255) COLLATE utf8_bin NOT NULL COMMENT 'interval',
  `firstTradeId` int NOT NULL COMMENT 'firstTradeId',
  `lastTradeId` int NOT NULL COMMENT 'lastTradeId',
  `open` varchar(255) COLLATE utf8_bin NOT NULL COMMENT 'open',
  `high` varchar(255) COLLATE utf8_bin NOT NULL COMMENT 'high',
  `close` varchar(255) COLLATE utf8_bin NOT NULL COMMENT 'close',
  `low` varchar(255) COLLATE utf8_bin NOT NULL COMMENT 'low',
  `volume` varchar(255) COLLATE utf8_bin NOT NULL COMMENT 'volume',
  `trades` varchar(255) COLLATE utf8_bin NOT NULL COMMENT 'trades',
  `final` int NOT NULL COMMENT 'final',
  `quoteVolume` varchar(255) COLLATE utf8_bin NOT NULL COMMENT 'quoteVolume',
  `volumeActive` varchar(255) COLLATE utf8_bin NOT NULL COMMENT 'volumeActive',
  `quoteVolumeActive` varchar(255) COLLATE utf8_bin NOT NULL COMMENT 'quoteVolumeActive',
  `startTime` bigint NOT NULL COMMENT 'startTime',
  `endTime` bigint NOT NULL COMMENT 'endTime',
  `ignored` int NOT NULL COMMENT 'ignored',
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin ROW_FORMAT=DYNAMIC;
```