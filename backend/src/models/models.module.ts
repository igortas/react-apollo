import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { PerformerRepository } from './performer.repository';

@Module({
  imports: [],
  providers: [UserRepository, PerformerRepository],
  exports: [UserRepository, PerformerRepository],
})
export class ModelsModule {}
