package binanceServer

import (
	"context"
	"database/sql"
	"fmt"
	"github.com/adshao/go-binance/v2"
	"market-center-go/src/utils"
)

var (
	apiKey    = ""
	secretKey = ""
	symbol    = "BTCUSDT"
)

var DataS *sql.DB

func InitDb() {
	fmt.Println("初始化数据库=======")
	fmt.Println("初始化数据库=======")
	var err error
	DataS, err = sql.Open("mysql", utils.GetDataSourceConfig())
	if err != nil {
		fmt.Println("Connect fail")
		return
	}

	fmt.Println(DataS)
	fmt.Println("初始化数据库结束=======")
	//设置数据库最大连接数
	DataS.SetConnMaxLifetime(500)
	//设置上数据库最大闲置连接数
	DataS.SetMaxIdleConns(10)

	//关闭数据库
	defer DataS.Close()

	// 验证连接
	errDb := DataS.Ping()
	if errDb != nil {
		fmt.Println("open database fail")
		return
	} else {
		fmt.Println("connect success")
		wsServer()
	}
}

func restClient() {
	client := binance.NewClient(apiKey, secretKey)
	//futuresClient := binance.NewFuturesClient(apiKey, secretKey)   // USDT-M Futures
	//deliveryClient := binance.NewDeliveryClient(apiKey, secretKey) // Coin-M Futures

	klines, err := client.NewKlinesService().Symbol("symbol").
		Interval("15m").Do(context.Background())

	if err != nil {
		fmt.Println(err)
		return
	}

	for _, k := range klines {
		fmt.Println(k)
	}
}

func queryTest2() {
	fmt.Println(" ======多行查询queryTest2:======")
	fmt.Println(DataS)
	fmt.Println(" ======多行查询queryTest2 end")
	rows, _ := DataS.Query("select symbol, `interval` from kline_15m where trades = 11289")
	var symbol, interval string
	for rows.Next() {
		rows.Columns()
		rows.Scan(&symbol, &interval)
		fmt.Println(symbol, "--")
		fmt.Println(interval, "--")
	}
}

func wsServer() {
	wsKlineHandler := func(event *binance.WsKlineEvent) {
		fmt.Println("wsServer-")
		fmt.Println(event)
	}

	errHandler := func(err error) {
		fmt.Println(err)
	}

	doneC, _, err := binance.WsKlineServe(symbol, "15m", wsKlineHandler, errHandler)
	if err != nil {
		fmt.Println(err)
		return
	}

	queryTest2()
	fmt.Println(doneC)
}
