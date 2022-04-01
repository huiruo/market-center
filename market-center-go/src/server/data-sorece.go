package server

import (
	"database/sql"
	"fmt"
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

	fmt.Println("初始化数据库结束=======")

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

func queryTest() {
	rows, error := DataS.Query("select symbol, `interval` from kline_15m where trades = 11289")
	if error != nil {
		fmt.Println("错误：", error)
	}
	var symbol, interval string
	rows.Scan(&symbol, &interval)
	fmt.Println(symbol, "--")
	for rows.Next() {
		rows.Columns()
		rows.Scan(&symbol, &interval)
		fmt.Println(symbol, "--")
		fmt.Println(interval, "--")
	}
}
