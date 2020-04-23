import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { User } from '../user/user.entity';
import { Category } from '../category/category.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';

/**
 * Entity table wrapper for creating on fly tables in db and also for simplicity all fields are exposed to be used by graphql
 * Field decorator use parametherless format for @field() decorator when there is string
 * Holds many to one relation to users table and categories table
 * One performer can be part od different groups and can be created by different admins
 */
@ObjectType()
@Entity({ name: 'performers' })
export class Performer extends BaseEntity {
  // without params is the default implicit string type
  @Field()
  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Field(type => Int)
  @Column({ type: 'smallint' })
  age: number;

  @Field(type => User)
  @ManyToOne(
    type => User,
    user => user.userPerformers,
  )
  user!: User;

  @Field(type => Category)
  @ManyToOne(
    type => Category,
    category => category.categoryPerformers,
  )
  category!: Category;
}
