#### 判断类型
```go
fmt.Println("type:", reflect.TypeOf(event))
```

##### json
```go
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
	Interval             string `json:"intervalTime"`
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

wsKline := WsKline{
    StartTime:            Kline.StartTime,
    EndTime:              Kline.EndTime,
    Symbol:               Kline.Symbol,
    Interval:             Kline.Interval,
    FirstTradeID:         Kline.FirstTradeID,
    LastTradeID:          Kline.LastTradeID,
    Open:                 Kline.Open,
    Close:                Kline.Close,
    High:                 Kline.High,
    Low:                  Kline.Low,
    Volume:               Kline.Volume,
    TradeNum:             Kline.TradeNum,
    IsFinal:              Kline.IsFinal,
    QuoteVolume:          Kline.QuoteVolume,
    ActiveBuyVolume:      Kline.ActiveBuyVolume,
    ActiveBuyQuoteVolume: Kline.ActiveBuyQuoteVolume,
}
result, err := json.Marshal(wsKline)
if err != nil {
    fmt.Println(err)
}
jsonStringData := string(result)
fmt.Println(jsonStringData)
fmt.Println("event 分割线 end")
```