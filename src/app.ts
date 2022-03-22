import express, { Application, json, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import fs from 'fs';
import { typeorm } from './config';


const app:Application = express();

app.use(cors());

app.use(express.urlencoded({ extended: false }));

// 内置了 body 解析: https://expressjs.com/en/api.html#express.json
app.use(json());

console.log('typeorm test 5:', typeorm);

app.get('/', (req:Request, res:Response, next:NextFunction) => {
  console.log('req', req.baseUrl);
  const path = './public/index.html';
  const html = fs.readFileSync(path);
  // res.write(html);
  res.status(200).write(html);
});

app.post('/api/update', (req:Request, res:Response) => {
  console.log(req.url, 'req:', req.body);
  res.status(200).send({
    code:200,
    msg:'请求成功'
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
