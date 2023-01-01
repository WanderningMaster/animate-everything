import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "~/database/entity/user.entity";
import { Gif } from "./gif.entity";

@Entity()
export class Reaction {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Gif, { cascade: true })
  @JoinColumn({ name: "gifId" })
  gif!: Gif;

  @Column()
  gifId!: string;

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
