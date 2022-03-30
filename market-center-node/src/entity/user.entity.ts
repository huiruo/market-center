import { Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({ comment: '唯一标识', default: '' })
    login: string;

  @Column({ comment: '用户名', default: '' })
    username: string;

  @Column({ comment: '全名/昵称', default: '' })
    nickname: string;

  @Column({ length: 400, comment: '个人简介', default: '' })
    bio: string;

  @Column({ comment: '头像', default: '' })
    avatar: string;

  @Column({ comment: '邮箱', default: '' })
    email: string;

  @Column({ comment: '邮箱校验时间', nullable: true })
    emailValidatedAt: Date;

  @Column({ comment: '手机', default: '' })
    phone: string;

  @Column({ comment: '职业', default: '' })
    jobTitle: string;

  @Column({ comment: '密码', default: '' })
    password: string;

  @DeleteDateColumn({ comment: '是否已被删除' })
    deletedAt: Date;

  @CreateDateColumn()
    createdAt: Date;

  @UpdateDateColumn()
    updatedAt: Date;
}
