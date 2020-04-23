import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

import { configService } from './config/db-service.config';
import { AuthModule } from './auth/auth.module';
import { PerfomersModule } from './performers/performers.module';

/**
 * Main module, injects sub-modules create per folder/feature like auth or performer
 * All singleton instances needed across the app on bootstrap are initialzed here
 * Graphql is initialized also here, to use code-first approach
 */
@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    AuthModule,
    PerfomersModule,
  ],
  providers: [],
})
export class AppModule {}
