import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserModel } from "shared/build";
import { Gif } from "./gif.entity";

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

  @OneToMany(() => Gif, (gif) => gif.author)
  gifs!: Gif[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
