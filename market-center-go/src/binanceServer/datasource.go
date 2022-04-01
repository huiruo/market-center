package binanceServer

/*
type DataSource struct {
	DB *sql.DB
}

var DataS *sql.DB

func (d *DataSource) InitDb() {
	fmt.Println("初始化数据库=======")
	fmt.Println("初始化数据库=======")
	var err error
	DataS, err = sql.Open("mysql", utils.GetDataSourceConfig())
	if err != nil {
		fmt.Println("Connect fail")
		return
	}

	fmt.Println(DataS)
	fmt.Println("初始化数据库结束=======")
	//设置数据库最大连接数
	DataS.SetConnMaxLifetime(500)
	//设置上数据库最大闲置连接数
	DataS.SetMaxIdleConns(10)

	//关闭数据库
	defer DataS.Close()

	// 验证连接
	errDb := DataS.Ping()
	if errDb != nil {
		fmt.Println("open database fail")
		return
	} else {
		fmt.Println("connect success")
	}

	//queryTest()
	//queryTest2()
}
*/

/*
func queryTest() {
	fmt.Println(" ======多行查询queryTest======")
	rows, _ := DataS.Query("select symbol, `interval` from kline_15m where trades = 11289")
	var symbol, interval string
	for rows.Next() {
		rows.Columns()
		rows.Scan(&symbol, &interval)
		fmt.Println(symbol, "--")
		fmt.Println(interval, "--")
	}
}
*/
