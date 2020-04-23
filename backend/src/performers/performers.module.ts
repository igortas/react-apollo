import { Module } from '@nestjs/common';
import { PerformersService } from './performers.service';
import { ModelsModule } from '../models/models.module';
import { PerformersResolver } from './performers.resolver';

/**
 * Submodule for performer feature and performer-category feature, injected in app.module
 */
@Module({
  imports: [ModelsModule],
  providers: [PerformersResolver, PerformersService],
  exports: [PerformersService, PerformersResolver],
})
export class PerfomersModule {}
