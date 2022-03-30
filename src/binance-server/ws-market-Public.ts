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

/*
* 1.先做到每次更新数据库的k数据
* 2.优化 用 定时器优化n 秒后更新数据
*/
async function isSameKlineAtCertainInterval (appDataSource:DataSource, klineAll:KlineAll ):Promise<boolean> {

  const {
    startTime,
    endTime,
    interval,
    firstTradeId,
    lastTradeId,
    open,
    close,
    high,
    low,
    volume,
    trades,
    final,
    quoteVolume,
    volumeActive,
    quoteVolumeActive
  } = klineAll;

  const selectSql = `SELECT startTime,endTime FROM kline_${interval} WHERE startTime = ${startTime} AND endTime = ${endTime} LIMIT 1;`;
  const result = await appDataSource.query(selectSql);
  logger.info(`${JSON.stringify(klineAll)}`);

  if(result && result.length > 0) {
    // Update the K-line data of the database start
    const updateSql = `UPDATE kline_${interval} SET firstTradeId = ${firstTradeId},lastTradeId = ${lastTradeId},open = ${open},close = ${close},high = ${high},low = ${low},volume = ${volume},trades = ${trades},final = ${final},quoteVolume = ${quoteVolume},volumeActive = ${volumeActive},quoteVolumeActive = ${quoteVolumeActive} WHERE startTime = ${startTime} AND endTime = ${endTime};`;
    await appDataSource.query(updateSql);
    // logger.info(`update:${JSON.stringify(updateRes)}`);
    logger.info(`update:${updateSql}`);
    // Update the K-line data of the database end

    return true;
  }else{

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
      // logger.info(`这是分割线:isWsFormattedKline: now date: ${Date.now()}===${JSON.stringify(data.kline)}`);

      const {interval} =data.kline as unknown as KlineAll;
      const isSameKline = await isSameKlineAtCertainInterval(appDataSource, data.kline as unknown as KlineAll);

      // 15m
      if(interval==='15m') {
        if(isSameKline) {
          logger.info('A1-ws 返回 15m 相同的k线,不需要插入数据库');

          return;
        }else{
          try {
            const klineAllRepository = appDataSource.getRepository(Kline15m);
            await klineAllRepository.save(data?.kline as unknown as Kline15m);
            logger.info('A2-15m k线插入成功');

            return;
          } catch (error) {

            logger.info(`A3-15m k线插入失败:${error}`);

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
