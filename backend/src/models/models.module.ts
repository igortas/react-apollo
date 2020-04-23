import { Module } from '@nestjs/common';
import { UserRepository } from './user/user.repository';
import { PerformerRepository } from './performer/performer.repository';
import { CategoryRepository } from './category/category.repository';

/**
 * Submodule for repositories, injected in app.module
 */
@Module({
  imports: [],
  providers: [UserRepository, PerformerRepository, CategoryRepository],
  exports: [UserRepository, PerformerRepository, CategoryRepository],
})
export class ModelsModule {}
