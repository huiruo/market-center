import { DataSource } from 'typeorm';
import { logger } from '../utils/logger';
import { typeorm } from './index';

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
        // this.initWsMarketPublic();
      })
      .catch((error) => console.log('sql:'+error));
  }

  public getRepository (entity:any):any {

    return this.AppDataSource.getRepository(entity);
  }
}
