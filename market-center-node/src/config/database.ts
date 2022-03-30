import { DataSource } from 'typeorm';
import { wsMarketPublic } from '../binance-server/ws-market-Public';
import { logger } from '../utils/logger';
import { apiKey, secretKey, typeorm } from './index';

export default class DataBase {
  public appDataSource:DataSource;

  constructor () {
    this.connectToDatabase();
  }

  private connectToDatabase () {
    this.appDataSource = new DataSource(typeorm);

    this.appDataSource.initialize()
      .then(() => {
        logger.info('数据库链接成功!开始初始化wsMarket...');
        wsMarketPublic(apiKey, secretKey, 'BTCUSDT', this.appDataSource);
      })
      .catch((error) => console.log('sql:'+error));
  }

  public getRepository (entity:any):any {

    return this.appDataSource.getRepository(entity);
  }
}
