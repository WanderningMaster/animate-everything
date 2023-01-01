import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { GifModel } from "shared/build";
import { User } from "~/database/entity/user.entity";
import { Reaction } from "./reaction.entity";

@Entity()
export class Gif implements GifModel {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  mediaSrc!: string;

  @Column()
  title!: string;

  @Column({ default: 0 })
  liked!: number;

  @ManyToOne(() => User, { cascade: true })
  @JoinColumn({ name: "authorId" })
  author!: User;

  @Column()
  authorId!: string;

  @OneToMany(() => Reaction, (reaction) => reaction.gif)
  reactions!: Reaction[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
