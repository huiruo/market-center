import { DataSource } from 'typeorm';
import {
  WebsocketClient,
  isWsFormatted24hrTicker,
  isWsFormattedKline,
  DefaultLogger,
} from 'binance';
import { logger } from '../utils/logger';
import { KlineAll } from '../entity/kline.all.entity';
import { Kline15m } from '../entity/kline.15m.entity';

// usdm | coinm | spot
const wsMarket = 'spot';

async function isSameKlineAtCertainInterval (appDataSource:DataSource, startTime:number, endTime:number, interval:string):Promise<boolean> {

  // SELECT * FROM kline_15m WHERE startTime = 1648549800000 AND endTime = 1648550699999 LIMIT 1;
  const sql = `SELECT * FROM kline_${interval} WHERE startTime = ${startTime} AND endTime = ${endTime} LIMIT 1;`;
  logger.info(`${sql}`);
  const result = await appDataSource.query(sql);

  if(result&&result.length >0) {
    logger.info('result.length:'+result.length);

    return true;
  }else{
    const numbs = `SELECT COUNT(*) as totalCount FROM kline_${interval};`;
    const result2 = await appDataSource.query(numbs);
    const totalCount = parseInt(result2[0].totalCount);
    logger.info(`totalCount:${JSON.stringify(result2[0])}`);

    if(totalCount ===0) {
      logger.info('totalCount 为 0');

      return false;
    }

    return false;
  }
}

export const wsMarketPublic = async (apiKey:string, secretKey:string, market:string, appDataSource:DataSource) => {
  const key = apiKey;
  const secret = secretKey;

  const log = {
    ...DefaultLogger,
    // silly: () => {},
  };

  const wsClient = new WebsocketClient({
    api_key: key,
    api_secret: secret,
    beautify: true,
  }, log);

  wsClient.on('message', (data) => {
    logger.info('raw message received');
  });

  wsClient.on('formattedMessage', async (data) => {
    // manually handle events and narrow down to desired types
    if (!Array.isArray(data) && data.eventType === 'kline') {
      // logger.info('这是分割线:kline received formattedMessage: '+JSON.stringify(data.kline));
    }

    // or use a supplied type guard (if available - not all type guards have been written yet)
    if (isWsFormattedKline(data)) {
      logger.info(`这是分割线:isWsFormattedKline: now date: ${Date.now()}===${JSON.stringify(data.kline)}`);

      const {startTime, endTime, interval} =data.kline as unknown as KlineAll;
      const isSameKline = await isSameKlineAtCertainInterval(appDataSource, startTime, endTime, interval);

      // 15m
      if(interval==='15m') {
        if(isSameKline) {
          logger.info('ws 返回 15m 相同的k线,不需要插入数据库');

          return;
        }else{
          try {
            const klineAllRepository = appDataSource.getRepository(Kline15m);
            await klineAllRepository.save(data?.kline as unknown as Kline15m);
            logger.info('15m k线插入成功');

            return;
          } catch (error) {

            logger.info(`15m k线插入失败:${error}`);

            return;
          }
        }
      }
    }

    if (isWsFormatted24hrTicker(data)) {
      logger.info('这是分割线:isWsFormatted24hrTicker: ' + JSON.stringify(data));

      return;
    }

    logger.info('log formattedMessage: ' + JSON.stringify(data));
  });

  wsClient.on('open', (data) => {
    logger.info('connection opened open: '+ JSON.stringify(data.wsKey)+'==='+JSON.stringify(data.ws.target.url));
  });

  // response to command sent via WS stream (e.g LIST_SUBSCRIPTIONS)
  wsClient.on('reply', (data) => {
    logger.info('log reply: ', JSON.stringify(data, null, 2));
  });

  wsClient.on('reconnecting', (data) => {
    logger.info('ws automatically reconnecting.... : ' + data?.wsKey );
  });

  wsClient.on('reconnected', (data) => {
    logger.info('ws has reconnected: '+ data?.wsKey );
  });

  // test start
  // wsClient.subscribeKlines(market, '1m', wsMarket);
  wsClient.subscribeKlines(market, '15m', wsMarket);
  // wsClient.subscribeKlines(market, '1d', wsMarket);
  // wsClient.subscribeKlines(market, '1w', wsMarket);

  // wsClient.subscribeSymbolMini24hrTicker(market,wsMarket);
  // wsClient.subscribeSymbolMini24hrTicker(market, wsMarket);
  // test end


  // wsClient.subscribeCoinIndexPrice(coinMSymbol);
  // wsClient.subscribeSpotKline(market, '1m');
  // wsClient.subscribeKlines(market, '1m', 'usdm');
  // wsClient.subscribeMarkPrice(market, 'usdm');
  // wsClient.subscribeMarkPrice(coinMSymbol, 'coinm');
  // wsClient.subscribeAllMarketMarkPrice('usdm');
  // wsClient.subscribeAllMarketMarkPrice('coinm');
  // wsClient.subscribeKlines(market, '1m', 'usdm');
  // wsClient.subscribeContinuousContractKlines(market, 'perpetual', '1m', 'usdm');
  // wsClient.subscribeIndexKlines(coinMSymbol, '1m');
  // wsClient.subscribeMarkPriceKlines(coinMSymbol, '1m');
  // wsClient.subscribeSymbolMini24hrTicker(market, 'usdm');
  // wsClient.subscribeSymbolMini24hrTicker(coinMSymbol, 'coinm');
  // wsClient.subscribeSymbolMini24hrTicker(market, 'spot');
  // wsClient.subscribeSymbol24hrTicker(market, 'usdm');
  // wsClient.subscribeSymbol24hrTicker(market, 'coinm');
  // wsClient.subscribeSymbol24hrTicker(coinMSymbol, 'spot');
  // wsClient.subscribeAllMini24hrTickers('usdm');
  // wsClient.subscribeAllMini24hrTickers('coinm');
  // wsClient.subscribeAllMini24hrTickers('spot');
  // wsClient.subscribeAll24hrTickers('usdm');
  // wsClient.subscribeAll24hrTickers('coinm');
  // wsClient.subscribeAll24hrTickers('spot');
  // wsClient.subscribeAllLiquidationOrders('usdm');
  // wsClient.subscribeAllLiquidationOrders('coinm');
  // wsClient.subscribeSpotSymbol24hrTicker(market);
  // wsClient.subscribeAggregateTrades(market, 'usdm');
  // wsClient.subscribeSpotPartialBookDepth('ETHBTC', 5, 1000);
};
