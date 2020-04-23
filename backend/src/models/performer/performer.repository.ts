import { EntityRepository, EntityManager } from 'typeorm';
import { Performer } from './performer.entity';
import { PerformerDTO } from '../../performers/dto/performer.dto';
import { CreatePerfomerInput } from '../../performers/input/create-performer.input';

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
