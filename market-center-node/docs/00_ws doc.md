#### K 线图间隔参数:

```
m -> 分钟; h -> 小时; d -> 天; w -> 周; M -> 月
```

```
1m
3m
5m
15m
30m
1h
2h
4h
6h
8h
12h
1d
3d
1w
1M
```

#### 1.例子：K 线 Streams

K 线 stream 逐秒推送所请求的 K 线种类(最新一根 K 线)的更新。
Payload:

```json
{
  "e": "kline", // 事件类型
  "E": 123456789, // 事件时间
  "s": "BNBBTC", // 交易对
  "k": {
    "t": 123400000, // 这根K线的起始时间
    "T": 123460000, // 这根K线的结束时间
    "s": "BNBBTC", // 交易对
    "i": "1m", // K线间隔
    "f": 100, // 这根K线期间第一笔成交ID
    "L": 200, // 这根K线期间末一笔成交ID
    "o": "0.0010", // 这根K线期间第一笔成交价
    "c": "0.0020", // 这根K线期间末一笔成交价
    "h": "0.0025", // 这根K线期间最高成交价
    "l": "0.0015", // 这根K线期间最低成交价
    "v": "1000", // 这根K线期间成交量
    "n": 100, // 这根K线期间成交笔数
    "x": false, // 这根K线是否完结(是否已经开始下一根K线)
    "q": "1.0000", // 这根K线期间成交额
    "V": "500", // 主动买入的成交量
    "Q": "0.500", // 主动买入的成交额
    "B": "123456" // 忽略此参数
  }
}
```

wsClient.subscribeKlines(market, '1m', 'usdm');

```json
{
  "startTime": 1648171800000,
  "endTime": 1648171859999,
  "symbol": "BTCUSDT",
  "interval": "1m",
  "firstTradeId": 2071186454,
  "lastTradeId": 2071194288,
  "open": 44071.9,
  "close": 44196.3,
  "high": 44196.3,
  "low": 44069.9,
  "volume": 915.057,
  "trades": 7835,
  "final": false,
  "quoteVolume": 40390720.50228,
  "volumeActive": 781.096,
  "quoteVolumeActive": 34478359.93928,
  "ignored": 0
}
```

#### 2.按 Symbol 刷新的最近 24 小时精简 ticker 信息

```json
{
  eventType: '24hrMiniTicker', // 事件类型
  eventTime: 1648384522767, // 事件类型
  symbol: 'BTCUSDT',  // 事件类型
  close: 44519,   // 最新成交价格
  open: 44261.6,  // 24小时前开始第一笔成交价格
  high: 44987.4,  // 24小时内最高成交价
  low: 44118.3, // 24小时内最高成交价
  baseAssetVolume: 143299.979,  // 24小时内最高成交价
  quoteAssetVolume: 6375949589.9, // 24小时内最高成交价
  wsMarket: 'usdm',
  wsKey: 'usdm_miniTicker_btcusdt_'
}
202
```

```json
{
  "e": "24hrMiniTicker", // 事件类型
  "E": 123456789, // 事件时间
  "s": "BNBBTC", // 交易对
  "c": "0.0025", // 最新成交价格
  "o": "0.0010", // 24小时前开始第一笔成交价格
  "h": "0.0025", // 24小时内最高成交价
  "l": "0.0010", // 24小时内最低成交价
  "v": "10000", // 成交量
  "q": "18" // 成交额
}
```

#### 实例

```javaScript
wsClient.on('message', (data) => {
  logger.info('raw message received');
  logger.info('raw message received:'+JSON.stringify(data, null, 2));
});
```

```json
  raw message received:{
    "e": "kline",
    "E": 1648443231648,
    "s": "BTCUSDT",
    "k": {
      "t": 1648425600000,
      "T": 1648511999999,
      "s": "BTCUSDT",
      "i": "1d",
      "f": 1306507287,
      "L": 1306805923,
      "o": "46827.76000000",
      "c": "46984.00000000",
      "h": "47650.00000000",
      "l": "46663.56000000",
      "v": "11616.94079000",
      "n": 298637,
      "x": false,
      "q": "545899704.68287810",
      "V": "6102.74936000",
      "Q": "286821335.70727380",
      "B": "0"
    },
    "wsMarket": "spot",
    "wsKey": "spot_kline_btcusdt_1d"
  }
```

#### 插入实例：

```javaScript
async function isSameKlineAtCertainInterval (appDataSource:DataSource, startTime:number, endTime:number, interval:string):Promise<boolean> {

  // SELECT * FROM kline_15m WHERE startTime = 1648549800000 AND endTime = 1648550699999 LIMIT 1;
  const sql = `SELECT * FROM kline_${interval} WHERE startTime = ${startTime} AND endTime = ${endTime} LIMIT 1;`;
  logger.info(`${sql}`);
  const result = await appDataSource.query(sql);

  if(result&&result.length >0) {
    logger.info('result.length:'+result.length);

    return true;
  }else{
    /*
    const numbs = `SELECT COUNT(*) as totalCount FROM kline_${interval};`;
    const result2 = await appDataSource.query(numbs);
    const totalCount = parseInt(result2[0].totalCount);
    logger.info(`totalCount:${JSON.stringify(result2[0])}`);
    if(totalCount ===0) {
      logger.info('totalCount 为 0');
      return false;
    }
    */

    return false;
  }
}
```
