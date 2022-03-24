import { MainClient } from 'binance';

interface IOptions{
  apiKey:string
  secretKey:string
}

export class BinanceServer {
  secretKey: string;
  apiKey: string;

  constructor (options:IOptions) {
    console.log('config', options);
    this.apiKey=options.apiKey;
    this.secretKey=options.secretKey;
  }

  private async getBinanceClient () {
    const binance = new MainClient({
      api_key: this.apiKey,
      api_secret: this.secretKey,
    });

    return binance;
  }

  async getTickerPrice (apiId: number, symbol: string): Promise<number> {
    const binance = await this.getBinanceClient(apiId);
    const { price } = (await binance.getSymbolPriceTicker({ symbol })) as SymbolPrice;

    return price as number;
  }
}
