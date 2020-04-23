import { Field, ObjectType, Int } from '@nestjs/graphql';
@ObjectType()
export class LoginAdminDTO {
  @Field(() => Int)
  readonly id: number;

  @Field()
  readonly email: string;
}
