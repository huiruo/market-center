import { DataSource } from 'typeorm';
import { wsMarketPublic } from '../binance-server/ws-market-Public';
import { logger } from '../utils/logger';
import { apiKey, secretKey, typeorm } from './index';

export default class DataBase {
  public AppDataSource:DataSource;

  constructor () {
    this.connectToDatabase();
  }

  private connectToDatabase () {
    this.AppDataSource = new DataSource(typeorm);

    this.AppDataSource.initialize()
      .then(() => {
        logger.info('数据库链接成功!初始化ws');
        wsMarketPublic(apiKey, secretKey, 'BTCUSDT', this.AppDataSource);
      })
      .catch((error) => console.log('sql:'+error));
  }

  public getRepository (entity:any):any {

    return this.AppDataSource.getRepository(entity);
  }
}
