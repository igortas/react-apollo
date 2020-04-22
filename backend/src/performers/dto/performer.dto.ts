import { Field, ObjectType, Int } from '@nestjs/graphql';
@ObjectType()
export class PerformerDTO {
  @Field()
  readonly performerName: string;

  @Field(() => Int)
  readonly performerAge: number;

  @Field()
  readonly categoryName: string;
}
