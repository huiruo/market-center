import { DataSource } from 'typeorm';
import {
  WebsocketClient,
  isWsFormatted24hrTicker,
  isWsFormattedKline,
  DefaultLogger,
} from 'binance';
import { logger } from '../utils/logger';
import { KlineAll } from '../entity/kline.all.entity';

const wsMarket = 'spot';
// const wsMarket = 'usdm';
// const wsMarket = 'coinm';

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
    // logger.info('raw message received:'+JSON.stringify(data, null, 2));
    /*
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
    */
  });

  wsClient.on('formattedMessage', async (data) => {
    // manually handle events and narrow down to desired types
    if (!Array.isArray(data) && data.eventType === 'kline') {
      // logger.info('这是分割线:kline received formattedMessage: '+JSON.stringify(data.kline));
    }

    // or use a supplied type guard (if available - not all type guards have been written yet)
    if (isWsFormattedKline(data)) {
      logger.info(`这是分割线:isWsFormattedKline: now date: ${Date.now()}===${JSON.stringify(data.kline)}`);

      // 1 day
      // const kline1dRepository = appDataSource.getRepository(Kline1d);
      // await kline1dRepository.save(data?.kline as unknown as Kline1d);

      // 15m
      // const kline15mRepository = appDataSource.getRepository(Kline15m);
      // await kline15mRepository.save(data?.kline as unknown as Kline15m);

      //  all
      const klineAllRepository = appDataSource.getRepository(KlineAll);
      await klineAllRepository.save(data?.kline as unknown as KlineAll);

      return;
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
