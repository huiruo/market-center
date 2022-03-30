import express, { Application, json, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import fs from 'fs';
import { apiKey, secretKey } from './config';
import { BinanceServer } from './binance-server/binance-server';
import { logger } from './utils/logger';
import { User } from './entity/user.entity';
import DataBase from './config/database';

export default class App {
  public app: Application;
  public AppDataSource:any;
  public BinanceClient:BinanceServer;

  constructor () {
    this.app = express();

    this.initializeMiddlewares();
    this.connectToDatabase();
    // this.initBinance();
  }

  private connectToDatabase () {
    this.AppDataSource = new DataBase();
  }

  // inint Binance
  private initBinance () {
    this.BinanceClient = new BinanceServer({apiKey, secretKey});
  }

  private initializeMiddlewares () {
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
    this.app.listen(8888, function () {
      logger.info('Server is runing at port 8888');
    });
  }
}
