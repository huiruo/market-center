package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"market-center-go/src/server"

	_ "github.com/go-sql-driver/mysql"
	"github.com/spf13/viper"
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
	server.InitDb()
}

func main() {
	server.WsServer()
	router := gin.Default()
	router.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "hello world")
	})
	router.Run(":1688")
}
