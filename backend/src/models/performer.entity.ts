import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';
// Problem with importing registerEnumType
// import { registerEnumType } from 'type-graphql';

enum PerformerCategory {
  SINGING = 'SINGING',
  DANCING = 'DANCING',
}

// Problem with importing registerEnumType
// registerEnumType(PerformerCategory, {
//   name: 'PerformerCategory',
//   description: 'Performers categories',
// });

@ObjectType()
@Entity({ name: 'performers' })
export class Performer extends BaseEntity {
  // without params is the default implicit string type
  @Field()
  @Column({ type: 'varchar', length: 30, nullable: false })
  name: string;

  @Field(type => Int)
  @Column({ type: 'smallint', nullable: false })
  age: number;

  // @igor.t because we working now only with admin, default is 1
  // Changed to String, instead of ENUM problem with importing type-graphql
  @Field(type => String)
  @Column({ type: 'varchar', length: 50, nullable: false })
  category: string;

  @Field(type => User)
  @ManyToOne(
    type => User,
    user => user.performers,
  )
  user!: User;
}
