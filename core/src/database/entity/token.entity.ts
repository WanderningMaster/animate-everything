import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { TokenModel } from "shared/build";
import { User } from "~/database/entity/user.entity";

@Entity()
export class Token implements TokenModel {

  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  refreshToken!: string;

  @OneToOne(() => User, { cascade: true })
  @JoinColumn({ name: "userId" })
  user!: User;

  @Column()
  userId!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
