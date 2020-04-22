import { IsEmpty, MaxLength, IsOptional } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAdminInput {
  @Field()
  @IsEmpty({ message: 'Name is empty' })
  @MaxLength(30, { message: 'Name too long' })
  readonly name: string;

  @Field()
  @MaxLength(50, { message: 'Name too long' })
  readonly surname: string | null;

  @Field()
  @MaxLength(30, { message: 'Email too long' })
  readonly email: string;

  @Field()
  @IsOptional()
  @MaxLength(30, { message: 'Username length too long' })
  readonly username?: string;

  @Field()
  @IsEmpty({ message: 'Password is empty' })
  @MaxLength(80, { message: 'Password length too long' })
  readonly password: string;
}
