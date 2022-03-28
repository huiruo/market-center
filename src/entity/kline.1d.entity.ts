import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('kline_1d')
export class Kline1d {
  @PrimaryGeneratedColumn({ comment: 'ID' })
    id: number;

  @Column({ comment: 'symbol' })
    symbol: string;

  @Column({ comment: 'interval' })
    interval: string;

  @Column({ comment: 'firstTradeId' })
    firstTradeId: number;

  @Column({ comment: 'lastTradeId' })
    lastTradeId: number;

  // int or string?
  @Column({ comment: 'open' })
    open: string;

  // int or string?
  @Column({ comment: 'high' })
    high: string;

  // int or string?
  @Column({ comment: 'close' })
    close: string;

  // int or string?
  @Column({ comment: 'low' })
    low: string;

  // int or string?
  @Column({ comment: 'volume' })
    volume: string;

  // int or string?
  @Column({ comment: 'trades' })
    trades: string;

  @Column({ comment: 'final' })
    final: number;

  // int or string?
  @Column({ comment: 'quoteVolume' })
    quoteVolume: string;

  // int or string?
  @Column({ comment: 'volumeActive' })
    volumeActive: string;

  // int or string?
  @Column({ comment: 'quoteVolumeActive' })
    quoteVolumeActive: string;

  @Column({ comment: 'ignored' })
    ignored: number;

  @Column({ comment: 'startTime', type: 'bigint' })
    startTime: number;

  @Column({ comment: 'endTime', type: 'bigint' })
    endTime: number;

  @CreateDateColumn()
    createdAt: Date;

  @UpdateDateColumn()
    updatedAt: Date;
}
