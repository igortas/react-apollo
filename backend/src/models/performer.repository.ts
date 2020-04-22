import { EntityRepository, Repository } from 'typeorm';
import { Performer } from './performer.entity';

@EntityRepository(Performer)
export class PerformerRepository extends Repository<Performer> {}
