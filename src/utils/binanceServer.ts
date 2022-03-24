import { MainClient, SymbolPrice } from 'binance';

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

  public async getTickerPrice (symbol: string): Promise<number> {
    const binance = await this.getBinanceClient();
    const res = await binance.getSymbolPriceTicker({ symbol });
    const { price } = res as SymbolPrice;

    return price as number;
  }
}
