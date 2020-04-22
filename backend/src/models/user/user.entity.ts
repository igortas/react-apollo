// item.entity.ts
import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { Performer } from '../performer/performer.entity';
import { ObjectType, Field } from '@nestjs/graphql';

// For now I ommit the indexes, but yes they are edge cases and as soon ar added much better, to help caching on some columns
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
