import { Field, ObjectType, Int } from '@nestjs/graphql';
@ObjectType()
export class CategoryDTO {
  @Field(() => Int)
  readonly id: number;

  @Field()
  readonly name: string;
}
