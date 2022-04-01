package server

import (
	"context"
	"fmt"
	"github.com/adshao/go-binance/v2"
)

var (
	apiKey    = ""
	secretKey = ""
	symbol    = "BTCUSDT"
)

func WsServer() {

	fmt.Println("start web socket====>")

	wsKlineHandler := func(event *binance.WsKlineEvent) {
		fmt.Println(event)
		queryTest()
	}

	errHandler := func(err error) {
		fmt.Println(err)
	}

	doneC, _, err := binance.WsKlineServe(symbol, "15m", wsKlineHandler, errHandler)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(doneC)
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
