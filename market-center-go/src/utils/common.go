package utils

import (
	"github.com/spf13/viper"
	"strconv"
	"strings"
)

func GetDataSourceConfig() string {
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
