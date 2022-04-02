package server

import (
	"database/sql"
	"fmt"
	"github.com/adshao/go-binance/v2"
	"market-center-go/src/utils"
)

var DataS *sql.DB

func InitDb() {
	var err error
	DataS, err = sql.Open("mysql", utils.GetDataSourceConfig())
	if err != nil {
		fmt.Println("Connect fail")
		return
	}
	//设置数据库最大连接数
	DataS.SetConnMaxLifetime(500)

	//设置上数据库最大闲置连接数
	DataS.SetMaxIdleConns(100)
	/*
		defer Db.Close()会在init函数结束的时候执行。
		由于 defer 是在逻辑的最后执行的，实际上到 return 的时候，返回的已经是 null。
		继续操作会提示：sql: database is closed
		那么我们可以把 defer db.Close() 放在具体的 repository 逻辑中
	*/
	// defer DataS.Close()

	// 验证连接
	errDb := DataS.Ping()
	if errDb != nil {
		fmt.Println("open database fail")
		return
	} else {
		fmt.Println("connect success")
	}
}

func insertKline(kline binance.WsKline) {
	stmt, err := DataS.Prepare(`INSERT kline_15m (symbol, intervalTime, startTime, endTime,firstTradeId,lastTradeId,open,close,high,low,volume,trades,final,quoteVolume,volumeActive,quoteVolumeActive) VALUES (?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
	check(err)

	res, err := stmt.Exec(kline.Symbol, kline.Interval, kline.StartTime, kline.EndTime, kline.FirstTradeID, kline.LastTradeID, kline.Open, kline.Close, kline.High, kline.Low, kline.Volume, kline.TradeNum, kline.IsFinal, kline.QuoteVolume, kline.ActiveBuyVolume, kline.ActiveBuyQuoteVolume)
	check(err)

	id, err := res.LastInsertId()
	check(err)

	defer stmt.Close()

	fmt.Println("插入数据成功", id)
}

func updateKline(kline binance.WsKline) {
	stmt, err := DataS.Prepare(`UPDATE kline_15m set firstTradeId=?,lastTradeId=?,open=?,close=?,high=?,low=?,volume=?,trades=?,final=?,quoteVolume=?,volumeActive=?,quoteVolumeActive=? WHERE startTime =? AND endTime =?`)
	check(err)

	res, err := stmt.Exec(kline.FirstTradeID, kline.LastTradeID, kline.Open, kline.Close, kline.High, kline.Low, kline.Volume, kline.TradeNum, kline.IsFinal, kline.QuoteVolume, kline.ActiveBuyVolume, kline.ActiveBuyQuoteVolume, kline.StartTime, kline.EndTime)
	check(err)

	num, err := res.RowsAffected()
	check(err)

	defer stmt.Close()

	fmt.Println("更新数据成功:", num)
}

func doSqlWork(kline binance.WsKline, startTime int64, endTime int64) bool {
	rows, err := DataS.Query(`SELECT startTime,endTime FROM kline_15m WHERE startTime =? AND endTime =? LIMIT 1`, startTime, endTime)
	check(err)

	count := 0
	// var start, end int64
	for rows.Next() {
		/*
			if err := rows.Scan(&start, &end); err != nil {
				log.Fatal(err)
			}
		*/
		count += 1
		rows.Columns()
	}
	rows.Close()

	fmt.Println("doSqlWork:查询条数：", count)

	if count > 0 {
		fmt.Println("A.找到该时间段的k线,需要更新该k线数据")
		updateKline(kline)

		return true
	} else {
		fmt.Println("b.没找到该时间段的k线,插入该K线数据")
		insertKline(kline)

		return false
	}
}

func check(err error) {
	if err != nil {
		fmt.Println("check:", err)
		panic(err)
	}
}
