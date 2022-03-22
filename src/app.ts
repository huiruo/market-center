import http from 'http';
import fs from 'fs';
import url from 'url';
import querystring from 'querystring';

const app = http.createServer((req: any, res: any) => {
  console.log('接口被访问：', res.url);

  res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });

  if (req.url.indexOf('/favicon.ico') === -1) {
    if (req.url.indexOf('/api') !== -1) {
      // 处理地址栏的数据
      const urlObj = url.parse(req.url, true);
      console.log(urlObj.query);
      // 非地址栏的数据
      let noAddressData = '';
      req.on('data', (chunk: any) => {
        noAddressData += chunk;
      });
      req.on('end', () => {
        console.log('非地址栏的数据：', querystring.parse(noAddressData));
      });
    } else {
      try {
        const path = req.url === '/' ? './public/index.html' : req.url;
        console.log('直接将html结果返回给浏览器', path);
        const html = fs.readFileSync(path);
        res.write(html);
      } catch (error) {
        console.log('error', error);
      }
    }
  }
  res.end();
});

app.listen(8800);
