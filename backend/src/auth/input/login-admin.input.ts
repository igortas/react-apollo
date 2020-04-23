import { Field, InputType } from '@nestjs/graphql';
import { MaxLength, IsOptional } from 'class-validator';

/**
 * Separate folder for all inputs which are used as arguments for queries and commands
 * Now the inputs are structure per action like create, login etc...
 * Is using class-validator for first level check on the BE that some fields are invalid from the FE
 * Can be extend and made more robust each field for validation checks
 * It can happen tommorow to have duplicate props, but we can have some shared placed with abstract inputs and all concrete input can extends
 * @field() decorator is put on every property for simplicity
 */
@InputType()
export class LoginAdminInput {
  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(30, { message: 'Email too long' })
  readonly email?: string;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(30, { message: 'Username too long' })
  readonly username?: string;

  @Field()
  @MaxLength(80, { message: 'Password too long' })
  readonly password: string;
}
