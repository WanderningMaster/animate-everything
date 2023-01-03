import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserModel } from "shared/build";
import { Gif } from "./gif.entity";
import { Reaction } from "./reaction.entity";

@Entity()
export class User implements UserModel {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @Column({ type: "text" })
  avatar!: string;

  @Column({ type: "bool", width: 1, default: false })
  privacy!: boolean;

  @OneToMany(() => Gif, (gif) => gif.author)
  gifs!: Gif[];

  @OneToMany(() => Reaction, (reaction) => reaction.author)
  reactions!: Reaction[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
