package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"market-center-go/src/binanceServer"
	"net/http"
)

/*
func init() {
	fmt.Println("init====>")
	// 协程test
	fmt.Println("开启协程：")
	go say("world")
	say("hello")
}

func say(s string) {
	fmt.Println("执行")
	for i := 0; i < 5; i++ {
		time.Sleep(10)
		fmt.Println(s)
	}
}
*/

func main() {
	fmt.Println("hello world")
	binanceServer.BinanceServer()
	router := gin.Default()
	router.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "hello world")
	})
	router.Run(":1688")
}
