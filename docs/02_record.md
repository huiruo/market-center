#### 目标
用 websocket 拉k线数据存到 mongodb

#### test api
```
http://localhost:8888/api/update
{
    "admin":"12233",
    "password":"test"
}


http://localhost:8888/api/get?id=12344
```


```
yarn add @typescript-eslint/parser -D
yarn add eslint -D
yarn add @typescript-eslint/eslint-plugin
yarn add @typescript-eslint/parser -D
yarn add eslint-plugin-no-for-of-loops -D
yarn add log4js
```
#### 日线
```json
{
	"startTime": 1648339200000,
	"endTime": 1648425599999,
	"symbol": "BTCUSDT",
	"interval": "1d",
	"firstTradeId": 2075711583,
	"lastTradeId": 2076466075,
	"open": 44489.3,
	"close": 44579.5,
	"high": 44987.4,
	"low": 44416,
	"volume": 73186.21,
	"trades": 754489,
	"final": false,
	"quoteVolume": 3265961218.41703,
	"volumeActive": 36882.107,
	"quoteVolumeActive": 1646095565.00321,
	"ignored": 0
}

spot
{
	"startTime": 1648339200000,
	"endTime": 1648425599999,
	"symbol": "BTCUSDT",
	"interval": "1d",
	"firstTradeId": 1305372191,
	"lastTradeId": 1305765648,
	"open": 44511.27,
	"close": 44674.09,
	"high": 44950,
	"low": 44421.46,
	"volume": 12119.01329,
	"trades": 393458,
	"final": false,
	"quoteVolume": 540930319.6972518,
	"volumeActive": 5833.28261,
	"quoteVolumeActive": 260365819.4447273,
	"ignored": 0
}
```

#### 周线对比
spot 和 usdm
usdm
```json
{
	"startTime": 1647820800000,
	"endTime": 1648425599999,
	"symbol": "BTCUSDT",
	"interval": "1w",
	"firstTradeId": 2059310046,
	"lastTradeId": 2076475256,
	"open": 41261,
	"close": 44659.8,
	"high": 45142,
	"low": 40430,
	"volume": 1860465.398,
	"trades": 17162195,
	"final": false,
	"quoteVolume": 79876526343.53127,
	"volumeActive": 940530.835,
	"quoteVolumeActive": 40397215107.25651,
	"ignored": 0
}

{
	"startTime": 1647820800000,
	"endTime": 1648425599999,
	"symbol": "BTCUSDT",
	"interval": "1w",
	"firstTradeId": 1299103195,
	"lastTradeId": 1305763215,
	"open": 41262.11,
	"close": 44687.5,
	"high": 45094.14,
	"low": 40467.94,
	"volume": 285593.985,
	"trades": 6660021,
	"final": false,
	"quoteVolume": 12287842892.0646,
	"volumeActive": 142498.92798,
	"quoteVolumeActive": 6132414719.603403,
	"ignored": 0
}
```
