import { PrimaryGeneratedColumn, Column } from 'typeorm';

export class Stage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  steps: string[];
}
