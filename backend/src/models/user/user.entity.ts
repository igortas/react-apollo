// item.entity.ts
import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { Performer } from '../performer/performer.entity';
import { ObjectType, Field } from '@nestjs/graphql';

/**
 * Entity table wrapper for creating on fly tables in db and also for simplicity all fields are exposed to be used by graphql
 * Field decorator use parametherless format for @field() decorator when there is string
 * Holds one to many relation to performers tables, one admin can create multiple performers
 */
@ObjectType()
@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Field()
  @Column({ type: 'varchar', length: 30, unique: true })
  email: string;

  @Field()
  @Column({ type: 'varchar', length: 30 })
  username: string;

  @Field()
  @Column({ type: 'varchar', length: 80 })
  password: string;

  @Field()
  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 50, nullable: true })
  surname?: string | null;

  // @igor.t because we working now only with admin, default is 1
  @Column({ type: 'boolean', default: true })
  isAdmin: boolean = true;

  @Field(type => [Performer])
  @OneToMany(
    type => Performer,
    performer => performer.user,
  )
  userPerformers!: Performer[];
}
