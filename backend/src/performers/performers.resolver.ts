import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PerformersService } from './performers.service';
import { CategoryDTO } from './dto/category.dto';
import { PerformerDTO } from './dto/performer.dto';
import { CreateCategoryInput } from './input/crate-category.input';
import { CreatePerfomerInput } from './input/create-performer.input';

/**
 * The main resolver with queries and mutation
 * Every mutation is bind 1:1 to one service, as wrapper when executing code
 * If tommorow we have many mutations and queries we can use something like CQRS to divide commands and queries in different resolvers
 * Even if we use tommorow CQRS, with services as one more layer in code we still we have 1:1 relation from command resolver to service or query resolvers
 */
@Resolver()
export class PerformersResolver {
  constructor(private readonly performersService: PerformersService) {}

  @Query(() => [CategoryDTO])
  async getPerformersCategories(): Promise<CategoryDTO[]> {
    return await this.performersService.getPerformersCategories();
  }

  @Query(() => [PerformerDTO])
  async getPerformers(): Promise<PerformerDTO[]> {
    return await this.performersService.getPerformers();
  }

  @Mutation(() => CategoryDTO)
  async createCategory(
    @Args('input') input: CreateCategoryInput,
  ): Promise<CategoryDTO> {
    return await this.performersService.createCategory(input);
  }

  @Mutation(() => PerformerDTO)
  async createPerformer(
    @Args('input') input: CreatePerfomerInput,
  ): Promise<PerformerDTO> {
    return await this.performersService.createPerfomer(input);
  }
}
