import { IsEmpty, MaxLength, IsString, IsInt, IsNumber } from 'class-validator';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreatePerfomerInput {
  @Field()
  @IsEmpty({ message: 'Performer name is empty' })
  @IsString()
  @MaxLength(30, { message: 'performer name too long' })
  readonly name: string;

  @Field(() => Int)
  @IsEmpty({ message: 'Performer age is empty' })
  @IsInt()
  readonly age: number;

  @Field(() => Int)
  @IsEmpty({ message: 'UserId is empty' })
  @IsNumber()
  readonly userId: number;

  @Field(() => Int)
  @IsEmpty({ message: 'CategoryId is empty' })
  @IsNumber()
  readonly categoryId: number;

  @Field()
  @IsEmpty({ message: 'Category name is empty' })
  @IsString()
  @MaxLength(30, { message: 'Category name too long' })
  readonly categoryName: string;
}
