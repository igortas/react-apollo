import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateAdminInput } from './input/create-admin.input';
import { AuthService } from './auth.service';
import { LoginAdminDTO } from './dto/login-admin.dto';
import { LoginAdminInput } from './input/login-admin.input';

/**
 * The main resolver with queries and mutation
 * Every mutation is bind 1:1 to one service, as wrapper when executing code
 * If tommorow we have many mutations and queries we can use something like CQRS to divide commands and queries in different resolvers
 * Even if we use tommorow CQRS, with services as one more layer in code we still we have 1:1 relation from command resolver to service or query resolvers
 */
@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => LoginAdminDTO)
  async loginAdmin(@Args('input') input: LoginAdminInput) {
    return await this.authService.loginAdmin(input);
  }

  @Mutation(() => LoginAdminDTO)
  async createAdmin(
    @Args('input') input: CreateAdminInput,
  ): Promise<LoginAdminDTO> {
    return await this.authService.createAdmin(input);
  }
}
