import { WebsocketClient, DefaultLogger } from 'binance'
import { apiKey, secretKey } from './config'
import RedisSMQ from 'rsmq'
import { isWsFormattedTrade } from './type-guards'

const Q_NAME = 'trade_test'

const rsmq = new RedisSMQ({ host: '3.89.115.130', port: 6379, ns: 'rsmq' })

// usdm | coinm | spot
const wsMarket = 'spot';

const wsLogger = {
  ...DefaultLogger,
}

console.log("apiKey, secretKey",apiKey, secretKey)

const wsClient = new WebsocketClient(
  {
    api_key: apiKey,
    api_secret: secretKey,
    beautify: true,
  },
  wsLogger,
)


// notification when a connection is opened
wsClient.on('open', data => {
  console.log('connection opened open:'+data.wsKey)
})

// receive formatted events with beautified keys. Any "known" floats stored in strings as parsed as floats.
wsClient.on('formattedMessage', async data => {
  console.log('Message sent. ID:'+JSON.stringify(data))
  /*
  if (isWsFormattedTrade(data)) {
    rsmq.sendMessage({ qname: Q_NAME, message: JSON.stringify(data) }, (err, resp) => {
      if (err) {
        console.error(err)
        return
      }
      console.log('Message sent. ID:', resp)
    })
  }
  */
})

// read response to command sent via WS stream (e.g LIST_SUBSCRIPTIONS)
wsClient.on('reply', data => {
  console.log('log reply: '+JSON.stringify(data, null, 2))
})

// receive notification when a ws connection is reconnecting automatically
wsClient.on('reconnecting', data => {
  console.log('ws automatically reconnecting.... '+data?.wsKey)
})

// receive notification that a reconnection completed successfully (e.g use REST to check for missing data)
wsClient.on('reconnected', data => {
  console.log('ws has reconnected '+data?.wsKey)
})

// wsClient.subscribeSpotSymbol24hrTicker('ETHUSDT');
// wsClient.subscribeSpotTrades('BTCUSDT')
wsClient.subscribeKlines('BTCUSDT', '15m', wsMarket);
