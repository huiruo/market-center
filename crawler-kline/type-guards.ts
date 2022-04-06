
import { WsFormattedMessage } from 'binance'

type WsMessageTradeFormatted = {
  eventType: 'trade',
  eventTime: number,
  symbol: string,
  tradeId: number,
  price: number,
  quantity: number,
  buyerOrderId: number,
  sellerOrderId: number,
  time: number,
  maker: boolean,
  ignored: boolean,
  wsMarket: 'spot',
  wsKey: string
}

export function isWsFormattedTrade(
  data: WsFormattedMessage
): data is WsMessageTradeFormatted {
  return !Array.isArray(data) && data.eventType === 'trade';
}
