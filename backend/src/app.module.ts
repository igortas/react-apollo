import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

import { configService } from './config/db-service.config';
import { AuthModule } from './auth/auth.module';
import { PerfomersModule } from './performers/performers.module';

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
