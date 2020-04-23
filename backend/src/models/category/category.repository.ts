import { EntityRepository, EntityManager } from 'typeorm';
import { Category } from './category.entity';
import { CategoryDTO } from '../../performers/dto/category.dto';
import { CreateCategoryInput } from '../../performers/input/crate-category.input';

/**
 * Because we have simple logic we don't place the logic for the code in different places like entites, services, domain objects etc...
 * For now they sit on repository level as they have connection with reading and writing to/from data
 * If we follow clean code guides repos needs to be clean and only find, read, write, update data etc
 * All repors have only create operation and listAll like list all categories or create new category
 * In future refactoring we can have update single item, delete all, delete single item etc...
 * The logic is encapusalted in smaller functions to be reusable, and to be swapped in other folder tommorow if we doing refactoring
 * We can unit testing the private functions that are more like util level functions, we can also the other functions bigger one and more concrete, but they used db so we need to mockup or leave it as integration testing
 */
@EntityRepository(Category)
export class CategoryRepository {
  constructor(private readonly manager: EntityManager) {}

  async getPerformersCategories(): Promise<CategoryDTO[]> {
    return await this.manager.find(Category, { select: ['id', 'name'] });
  }

  async createCategory(
    createCategoryInput: CreateCategoryInput,
  ): Promise<CategoryDTO> {
    const name = createCategoryInput.name.toLowerCase();

    const categoryFound = await this.manager.findOne(Category, {
      where: { name },
    });

    console.log('name', categoryFound);

    if (categoryFound) {
      throw new Error('Category exists');
    }

    const category = this.manager.create(Category, {
      name,
    });
    const res = await this.manager.save(category);
    return { id: res.id, name };
  }
}
