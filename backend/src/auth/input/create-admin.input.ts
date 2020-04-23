import { IsEmpty, MaxLength, IsOptional } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

/**
 * Separate folder for all inputs which are used as arguments for queries and commands
 * Now the inputs are structure per action like create, login etc...
 * Is using class-validator for first level check on the BE that some fields are invalid from the FE
 * Can be extend and made more robust each field for validation checks
 * It can happen tommorow to have duplicate props, but we can have some shared placed with abstract inputs and all concrete input can extends
 * @field() decorator is put on every property for simplicity
 */
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
