package binanceServer

import (
	"database/sql"
	"fmt"
	"market-center-go/src/utils"
)

type DataSource struct {
	DB *sql.DB
}

var DB *sql.DB

func (d *DataSource) InitDb() {
	DB, _ := sql.Open("mysql", utils.GetDataSourceConfig())
	//设置数据库最大连接数
	DB.SetConnMaxLifetime(500)
	//设置上数据库最大闲置连接数
	DB.SetMaxIdleConns(10)

	//关闭数据库
	defer DB.Close()

	// 验证连接
	errDb := DB.Ping()
	if errDb != nil {
		fmt.Println("open database fail")
		return
	} else {
		fmt.Println("connect success")
	}
}
