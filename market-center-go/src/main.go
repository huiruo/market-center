package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"github.com/spf13/viper"
	"market-center-go/src/binanceServer"
	"net/http"
)

func init() {

	viper.SetConfigName("main")
	viper.SetConfigType("toml")
	viper.AddConfigPath("./src/config")
	err := viper.ReadInConfig()
	if err != nil {
		fmt.Println(err)
	}

	//var dataSource = &binanceServer.DataSource{}
	binanceServer.InitDb()
	/*
		//多行查询
		//rows := db.QueryRow("select * from kline_15m where trades = 11289")
		rows, _ := dataSource.DB.Query("select symbol, `interval` from kline_15m where trades = 11289")
		var symbol, interval string
		for rows.Next() {
			rows.Columns()
			rows.Scan(&symbol, &interval)
			fmt.Println(symbol, "--")
			fmt.Println(interval, "--")
		}
	*/
}

func main() {
	binanceServer.BinanceServer()

	// test

	/*
		//多行查询
		//rows := db.QueryRow("select * from kline_15m where trades = 11289")
		fmt.Println(" ======多行查询======")
		//var dataSource = &binanceServer.DataSource{}
		fmt.Println(binanceServer.DB)
		rows, _ := binanceServer.DB.Query("select symbol, `interval` from kline_15m where trades = 11289")
		var symbol, interval string
		for rows.Next() {
			rows.Columns()
			rows.Scan(&symbol, &interval)
			fmt.Println(symbol, "--")
			fmt.Println(interval, "--")
		}
		// test
	*/

	router := gin.Default()
	router.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "hello world")
	})
	router.Run(":1688")
}
