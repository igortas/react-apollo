import { IsEmpty, MaxLength } from 'class-validator';
import { ObjectType, Field } from '@nestjs/graphql';
import { LoginAdminDTO } from './login-admin.dto';

@ObjectType()
export class createAdminDTO extends LoginAdminDTO {
  @Field()
  @IsEmpty({ message: 'Name is empty' })
  @MaxLength(30, { message: 'Name too long' })
  readonly name: string;

  @Field({ nullable: true })
  @MaxLength(50, { message: 'Name too long' })
  readonly surname?: string | null;
}
