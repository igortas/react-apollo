import { EntityRepository, EntityManager } from 'typeorm';
import { Category } from './category.entity';
import { CategoryDTO } from '../../performers/dto/category.dto';
import { CreateCategoryInput } from '../../performers/input/crate-category.input';

@EntityRepository(Category)
export class CategoryRepository {
  constructor(private readonly manager: EntityManager) {}

  async getPerformersCategories(): Promise<CategoryDTO[]> {
    return await await this.manager.find(Category, { select: ['name'] });
  }

  async createCategory(
    createCategoryInput: CreateCategoryInput,
  ): Promise<CategoryDTO> {
    const name = createCategoryInput.name.toLowerCase();

    const categoryFound = this.manager.findOne(Category, { where: { name } });

    if (categoryFound) {
      throw new Error('Category exists');
    }

    const category = this.manager.create(Category, {
      name,
    });
    const res = await this.manager.save(category);
    console.log('234234234', res);
    return { name };
  }
}
