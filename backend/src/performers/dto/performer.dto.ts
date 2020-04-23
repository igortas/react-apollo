import { Field, ObjectType, Int } from '@nestjs/graphql';
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
