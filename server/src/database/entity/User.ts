import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserModel } from "shared/build";

@Entity()
export class User implements UserModel {

  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  email!: string;

  @Column()
  username!: string;

  @Column()
  password!: string;

}
