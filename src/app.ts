import express, { Application, json, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import fs from 'fs';
import { DataSource } from 'typeorm';
import { apiKey, secretKey, typeorm } from './config';
import { BinanceServer } from './binance-server/binance-server';
import { wsMarketPublic } from './binance-server/ws-market-Public';
import { User } from './entity/user.entity';
import { logger } from './utils/logger';

export default class App {
  public app: Application;
  public AppDataSource:DataSource;
  public BinanceClient:BinanceServer;

  constructor () {
    this.app = express();

    this.initializeMiddlewares();
    this.connectToDatabase();
  }

  private connectToDatabase () {
    console.log('typeorm:', typeorm);
    this.AppDataSource = new DataSource(typeorm);

    this.AppDataSource.initialize()
      .then(() => {
        console.log('数据库链接成功!');
      })
      .catch((error) => console.log('sql:'+error));
  }

  // inint Binance
  private initBinance () {
    this.BinanceClient = new BinanceServer({apiKey, secretKey});
    console.log('BinanceClient:', this.BinanceClient);
  }

  // web sockect test
  private initWsMarketPublic () {
    wsMarketPublic(apiKey, secretKey, 'BTCUSDT');
  }

  private initializeMiddlewares () {
    // start express
    this.app.use(cors());

    this.app.use(express.urlencoded({ extended: false }));

    // 内置了 body 解析: https://expressjs.com/en/api.html#express.json
    this.app.use(json());

    this.app.get('/', (req:Request, res:Response, next:NextFunction) => {
      console.log('req', req.baseUrl);
      const path = './public/index.html';
      const html = fs.readFileSync(path);
      // res.write(html);
      res.status(200).write(html);
    });

    this.app.post('/api/update', async (req:Request, res:Response) => {
      console.log(req.url, 'req:', req.body);

      // orm test
      const userRepository = this.AppDataSource.getRepository(User);
      const allUsers = await userRepository.find();
      // orm test

      // binance test
      const price = await this.BinanceClient.getTickerPrice('BTCUSDT');
      // binance test

      res.status(200).send({
        code:200,
        msg:'请求成功',
        price,
        result:allUsers
      });
    });

    this.app.get('/api/get', (req:Request, res:Response) => {
      const params = req.query;
      console.log('req:', params);
      res.status(200).json({
        code: 0,
        msg:'请求成功',
        params
      });
    });
  }

  public start () {
    // app.listen(8888, function () {
    //   console.log('app is runing at port 8888');
    // });
    this.app.listen(8888, function () {
      logger.info('app is runing at port 8888');
    });
  }
}
