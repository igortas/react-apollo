import { IsEmpty, MaxLength, IsString, IsInt, IsNumber } from 'class-validator';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateCategoryInput {
  @Field()
  @IsEmpty({ message: 'Performer is empty' })
  @IsString()
  @MaxLength(30, { message: 'caregory name too long' })
  readonly name: string;
}
