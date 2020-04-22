import { Field, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class LoginAdminDTO {
  @Field()
  readonly email: string;

  @Field()
  readonly username: string;

  @Field()
  readonly password: string;
}
