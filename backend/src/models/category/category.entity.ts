import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { ObjectType, Field } from '@nestjs/graphql';
import { Performer } from '../performer/performer.entity';

/**
 * Entity table wrapper for creating on fly tables in db and also for simplicity all fields are exposed to be used by graphql
 * Field decorator use parametherless format for @field() decorator when there is string
 * Config table for list of categories
 * One category can be part od many performes, one to many relation
 */
@ObjectType()
@Entity({ name: 'categories' })
export class Category extends BaseEntity {
  // without params is the default implicit string type
  @Field()
  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Field(type => [Performer])
  @OneToMany(
    type => Performer,
    performer => performer.category,
  )
  categoryPerformers!: Performer[];
}
