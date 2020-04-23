import { Injectable, Get } from '@nestjs/common';
import { CategoryRepository } from '../models/category/category.repository';
import { CategoryDTO } from './dto/category.dto';
import { PerformerDTO } from './dto/performer.dto';
import { PerformerRepository } from '../models/performer/performer.repository';
import { CreateCategoryInput } from './input/crate-category.input';
import { CreatePerfomerInput } from './input/create-performer.input';

/**
 * As described in all .resolvers files, service is in 1:1 relation
 * It used because of best practices bulding software, it's thin layer below the resolver or controller if this is not graphql
 * The service can do many things like injecting many different repos and entities and other objects if needed...
 */
@Injectable()
export class PerformersService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly performerRepository: PerformerRepository,
  ) {}

  async getPerformersCategories(): Promise<CategoryDTO[]> {
    return await this.categoryRepository.getPerformersCategories();
  }

  async getPerformers(): Promise<PerformerDTO[]> {
    return await this.performerRepository.getPerformers();
  }

  async createCategory(
    createCategoryInput: CreateCategoryInput,
  ): Promise<CategoryDTO> {
    return await this.categoryRepository.createCategory(createCategoryInput);
  }

  async createPerfomer(
    createPerfomerInput: CreatePerfomerInput,
  ): Promise<PerformerDTO> {
    return await this.performerRepository.createCategory(createPerfomerInput);
  }
}
