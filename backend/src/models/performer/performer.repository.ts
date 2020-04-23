import { EntityRepository, EntityManager } from 'typeorm';
import { Performer } from './performer.entity';
import { PerformerDTO } from '../../performers/dto/performer.dto';
import { CreatePerfomerInput } from '../../performers/input/create-performer.input';

/**
 * Because we have simple logic we don't place the logic for the code in different places like entites, services, domain objects etc...
 * For now they sit on repository level as they have connection with reading and writing to/from data
 * If we follow clean code guides repos needs to be clean and only find, read, write, update data etc
 * All repors have only create operation and listAll like list all categories or create new category
 * In future refactoring we can have update single item, delete all, delete single item etc...
 * The logic is encapusalted in smaller functions to be reusable, and to be swapped in other folder tommorow if we doing refactoring
 * We can unit testing the private functions that are more like util level functions, we can also the other functions bigger one and more concrete, but they used db so we need to mockup or leave it as integration testing
 */
@EntityRepository(Performer)
export class PerformerRepository {
  constructor(private readonly manager: EntityManager) {}

  async getPerformers(): Promise<PerformerDTO[]> {
    const performers = await this.manager.find(Performer, {
      select: ['id', 'name', 'age', 'category'],
      relations: ['category'],
    });

    return performers.map(
      ({
        id,
        name: performerName,
        age: performerAge,
        category: { name: categoryName },
      }) => ({
        id,
        performerName,
        performerAge,
        categoryName,
      }),
    );
  }

  async createCategory(
    createPerformerInput: CreatePerfomerInput,
  ): Promise<PerformerDTO> {
    /**
     * We pass in here userId, because we don't have JWT or something else,
     * This way is not reliable at ALL, but just to serve the purpose
     */
    const {
      name,
      age,
      userId,
      categoryId,
      categoryName,
    } = createPerformerInput;

    const performerFound = await this.manager.findOne(Performer, {
      where: { name: name.toLowerCase(), age, category: { id: categoryId } },
    });

    if (performerFound) {
      throw new Error('Performer exists');
    }

    const performer = this.manager.create(Performer, {
      name,
      age,
      user: { id: userId },
      category: { id: categoryId },
    });
    const res = await this.manager.save(performer);
    return {
      id: res.id,
      performerName: name,
      performerAge: age,
      categoryName: categoryName,
    };
  }
}
