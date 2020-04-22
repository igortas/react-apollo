import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateAdminInput } from './input/create-admin.input';
import { AuthService } from './auth.service';
import { LoginAdminDTO } from './dto/login-admin.dto';
import { LoginAdminInput } from './input/login-admin.input';

/**
 * If we follow the CQRS pattern is best to have separate resolvers for commands and queries
 * On top of the resolvers we can use JWT decorator for side concerns, and to use sessions
 */
@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => LoginAdminDTO)
  async loginAdmin(@Args('input') input: LoginAdminInput) {
    return await this.authService.loginAdmin(input);
  }

  /**
   * Args input can be of class CreateAdminInput, but for simplicity, I stick to use only DTO
   * Even if I follow CQRS, still for simplicity I will return DTO
   */
  @Mutation(() => LoginAdminDTO)
  async createAdmin(
    @Args('input') input: CreateAdminInput,
  ): Promise<LoginAdminDTO> {
    return await this.authService.createAdmin(input);
  }
}
