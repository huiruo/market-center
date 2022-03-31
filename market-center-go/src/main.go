package main

import (
	"database/sql"
	"fmt"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"github.com/spf13/viper"
	"net/http"
	"strconv"
	"strings"
)

func init() {

	db, _ := sql.Open("mysql", getDataSourceConfig())

	//关闭数据库
	defer db.Close()

	//连接数据库
	errDb := db.Ping()
	if errDb != nil {
		fmt.Println("数据库连接失败")
		return
	} else {
		fmt.Println("数据库连接成功")
	}

	//多行查询
	//rows, _ := db.Query("select * from kline_15m where trades = 11289")
	//rows := db.QueryRow("select * from kline_15m where trades = 11289")
	rows, _ := db.Query("select symbol, `interval` from kline_15m where trades = 11289")
	var symbol, interval string
	for rows.Next() {
		rows.Columns()
		rows.Scan(&symbol, &interval)
		fmt.Println(symbol, "--")
		fmt.Println(interval, "--")
	}
}

func main() {
	//binanceServer.BinanceServer()
	router := gin.Default()
	router.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "hello world")
	})
	router.Run(":1688")
}

func getDataSourceConfig() string {
	viper.SetConfigName("main")
	viper.SetConfigType("toml")
	viper.AddConfigPath("./src/config")
	err := viper.ReadInConfig()
	if err != nil {
		fmt.Println(err)
	}

	username := (viper.Get("mysql.username")).(string)
	password := (viper.Get("mysql.password")).(string)
	host := (viper.Get("mysql.host")).(string)
	port := (viper.Get("mysql.port")).(int64)
	database := (viper.Get("mysql.database")).(string)

	var dataSource strings.Builder
	dataSource.WriteString(username)
	dataSource.WriteString(":")
	dataSource.WriteString(password)
	dataSource.WriteString("@(")
	dataSource.WriteString(host)
	dataSource.WriteString(":")
	dataSource.WriteString(strconv.FormatInt(port, 10))
	dataSource.WriteString(")/")
	dataSource.WriteString(database)

	return dataSource.String()
}
