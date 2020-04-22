import { IsEmpty, MaxLength } from 'class-validator';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class LoginAdminDTO {
  @Field()
  @IsEmpty({ message: 'Username is empty' })
  @MaxLength(30, { message: 'Username length too long' })
  readonly username: string;

  @Field()
  @IsEmpty({ message: 'Password is empty' })
  @MaxLength(30, { message: 'Password length too long' })
  readonly password: string;
}
