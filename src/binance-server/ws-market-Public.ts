import {
  WebsocketClient,
  isWsFormatted24hrTicker,
  isWsFormattedKline,
  DefaultLogger,
} from 'binance';
import { logger } from '../utils/logger';


const marketType = 'spot';
// const marketType = 'usdm';
// const marketType = 'coinm';

export const wsMarketPublic = async (apiKey:string, secretKey:string, market:string) => {
  const key = apiKey;
  const secret = secretKey;

  // const market = market;
  // const coinMSymbol = 'AVAXUSD_PERP';

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
    logger.info('raw message received:'+JSON.stringify(data, null, 2));
  });

  wsClient.on('formattedMessage', (data) => {
    // manually handle events and narrow down to desired types
    if (!Array.isArray(data) && data.eventType === 'kline') {
      // logger.info('kline received test:', data.kline);
      // logger.info('===kline received AAA=====');
      logger.info('这是分割线=====================kline received formattedMessage: '+JSON.stringify(data.kline));
    }

    // or use a supplied type guard (if available - not all type guards have been written yet)
    if (isWsFormattedKline(data)) {
      logger.info('这是分割线=====================isWsFormattedKline: ' + JSON.stringify(data.kline));

      return;
    }

    if (isWsFormatted24hrTicker(data)) {
      logger.info('这是分割线=================isWsFormatted24hrTicker: ' + JSON.stringify(data));

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
  // wsClient.subscribeKlines(market, '1m', 'usdm');
  // wsClient.subscribeKlines(market, '15m', 'usdm');
  wsClient.subscribeKlines(market, '1d', marketType);
  // wsClient.subscribeKlines(market, '1w', marketType);

  // wsClient.subscribeSymbolMini24hrTicker(market,'spot');
  // wsClient.subscribeSymbolMini24hrTicker(market, 'usdm');
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
