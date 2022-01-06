import { IsEmail } from 'class-validator';
import { Exclude } from 'class-transformer';

import { ApiHideProperty } from '@nestjs/swagger';

import * as bcrypt from 'bcrypt';

import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  Unique,
  BaseEntity,
} from 'typeorm';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @Exclude()
  @ApiHideProperty()
  password: string;

  @Column()
  @Exclude()
  @ApiHideProperty()
  salt: string;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);

    return hash === this.password;
  }
}
