package entity

type Kline struct {
	id                int64
	symbol            string
	interval          string
	firstTradeId      int64
	lastTradeId       int64
	open              int64
	high              int64
	close             int64
	low               int64
	volume            int64
	trades            string
	final             int64
	quoteVolume       string
	volumeActive      string
	quoteVolumeActive string
	ignored           int64
	startTime         int64
	endTime           int64
}
