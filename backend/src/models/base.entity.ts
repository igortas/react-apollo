import {
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

/**
 * Base abstract class, for simple purpose all tables has primary auto generated simple incremental id key 1,2,3.... and create and update dates
 * Maybe better aproach is to use uuid for primary keys
 * All other tables extends this base class
 */
export abstract class BaseEntity {
  @PrimaryGeneratedColumn('increment', { type: 'int' })
  id: number;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}
