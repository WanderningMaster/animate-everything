import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { GifModel } from "shared/build";
import { User } from "~/database/entity/user.entity";

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

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
