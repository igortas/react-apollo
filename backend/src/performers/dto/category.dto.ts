import { Field, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class CategoryDTO {
  @Field()
  readonly name: string;
}
