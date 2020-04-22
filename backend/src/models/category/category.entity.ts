import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { ObjectType, Field } from '@nestjs/graphql';
import { Performer } from '../performer/performer.entity';

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
