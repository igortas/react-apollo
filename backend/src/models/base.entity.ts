import {
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('increment', { type: 'int' })
  id: number;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}
