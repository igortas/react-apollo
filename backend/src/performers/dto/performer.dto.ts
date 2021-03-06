import { Field, ObjectType, Int } from '@nestjs/graphql';

/**
 * Maybe this is wrong for return type to be DTO :)
 * Because grahpql has input vocabular for args, and nest.js using DTO for that one, i use DTO for returning back to the client even there is one prop
 * Pure class with only fields
 */
@ObjectType()
export class PerformerDTO {
  @Field(() => Int)
  readonly id: number;

  @Field()
  readonly performerName: string;

  @Field(() => Int)
  readonly performerAge: number;

  @Field()
  readonly categoryName: string;
}
