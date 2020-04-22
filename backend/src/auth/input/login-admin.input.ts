import { Field, InputType } from '@nestjs/graphql';
import { MaxLength, IsOptional } from 'class-validator';

/**
 * Accidentaly we have duplicate fields in the inout as in the dto
 * If we have more complex scenario, or we have more of this duplicates, is better to have shared class to be extended
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
