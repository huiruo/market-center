import express, { Application, json, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import fs from 'fs';
import { apiKey, secretKey, typeorm } from './config';
import { DataSource } from 'typeorm';
import { User } from './entity/user.entity';
import { BinanceServer } from './binance-server/binance-server';
import { wsMarketPublic } from './binance-server/ws-public';

// 创建 typeorm 连接
const AppDataSource = new DataSource(typeorm);

AppDataSource.initialize()
  .then(() => {
    console.log('数据库链接成功!');
  })
  .catch((error) => console.log('sql:'+error));

// inint Binance
const BinanceClient = new BinanceServer({apiKey, secretKey});
console.log('BinanceClient:', BinanceClient);

// web sockect test
wsMarketPublic(apiKey, secretKey, 'BTCUSDT');

const app:Application = express();

// start express
app.use(cors());

app.use(express.urlencoded({ extended: false }));

// 内置了 body 解析: https://expressjs.com/en/api.html#express.json
app.use(json());

app.get('/', (req:Request, res:Response, next:NextFunction) => {
  console.log('req', req.baseUrl);
  const path = './public/index.html';
  const html = fs.readFileSync(path);
  // res.write(html);
  res.status(200).write(html);
});

app.post('/api/update', async (req:Request, res:Response) => {
  console.log(req.url, 'req:', req.body);

  // orm test
  const userRepository = AppDataSource.getRepository(User);
  const allUsers = await userRepository.find();
  // orm test

  // binance test
  const price = await BinanceClient.getTickerPrice('BTCUSDT');
  // binance test

  res.status(200).send({
    code:200,
    msg:'请求成功',
    price,
    result:allUsers
  });
});

app.get('/api/get', (req:Request, res:Response) => {
  const params = req.query;
  console.log('req:', params);
  res.status(200).json({
    code: 0,
    msg:'请求成功',
    params
  });
});

app.listen(8888, function () {
  console.log('app is runing at port 8888');
});
