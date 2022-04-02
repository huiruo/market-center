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

type WsKlineEvent struct {
	Event  string  `json:"e"`
	Time   int64   `json:"E"`
	Symbol string  `json:"s"`
	Kline  WsKline `json:"k"`
}

type WsKline struct {
	StartTime            int64  `json:"startTime"`
	EndTime              int64  `json:"endTime"`
	Symbol               string `json:"symbol"`
	Interval             string `json:"interval"`
	FirstTradeID         int64  `json:"firstTradeId"`
	LastTradeID          int64  `json:"lastTradeId"`
	Open                 string `json:"open"`
	Close                string `json:"close"`
	High                 string `json:"high"`
	Low                  string `json:"low"`
	Volume               string `json:"volume"`
	TradeNum             int64  `json:"trades"`
	IsFinal              bool   `json:"final"`
	QuoteVolume          string `json:"quoteVolume"`
	ActiveBuyVolume      string `json:"quoteVolumeActive"`
	ActiveBuyQuoteVolume string `json:"activeBuyQuoteVolume"`
}

func WsServer() {
	wsKlineHandler := func(event *binance.WsKlineEvent) {
		Kline := event.Kline
		interval := Kline.Interval
		if interval == "15m" {
			isSameKline := doSqlWork(Kline, Kline.StartTime, Kline.EndTime)
			fmt.Println("<======doSqlWork 15m end======>", isSameKline)
		} else {

		}
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
