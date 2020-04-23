import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ModelsModule } from '../models/models.module';
import { AuthResolver } from './auth.resolver';

/**
 * Submodule for auth feature, injected in app.module
 */
@Module({
  imports: [ModelsModule],
  providers: [AuthResolver, AuthService],
  exports: [AuthService, AuthResolver],
})
export class AuthModule {}
