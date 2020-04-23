// src/config/config.service.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
// @igor.t go three times back to .env file, or create 'shodow' .env file in the be folder
config({ path: __dirname + './../../../.env' });

/**
 * Enum types of current popular databases, if we like to make this config file more reusable tommorow
 */
enum dbTypes {
  'mysql' = 'mysql',
}

/**
 * Config service file for settng up and preparing the database
 * Read data from .env file, can be refactored to support more db's
 * for now is stick to ony one, also the .env keys can be more generic like DB_HOST, not MYSQL_DB_HOST
 * It's checking if we are on production or not but can be develop more in that way
 * Missing migration parts, also missing seeding of the database with some default values
 * We can unit tests all public and private methods to be sure they produce valid returns
 * If we don't have seed, maybe we can create some admins wuth unit testing
 */
class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getEnvValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public isProduction() {
    const mode = this.getEnvValue('ENV_MODE', false);
    return mode !== 'development';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      // @igor.t somme issues when parsing directly as string
      type: dbTypes[this.getEnvValue('DB_TYPE')],
      host: this.getEnvValue('MYSQL_DB_HOST'),
      port: parseInt(this.getEnvValue('MYSQL_DB_PORT')),
      username: this.getEnvValue('MYSQL_USER'),
      password: this.getEnvValue('MYSQL_PASSWORD'),
      database: this.getEnvValue('MYSQL_DATABASE'),
      synchronize: !this.isProduction(),
      logging: !this.isProduction(),
      entities: [__dirname + './../**/*.entity{.ts,.js}'],
      ssl: this.isProduction(),
    };
  }
}

const configService = new ConfigService(process.env);

export { configService };
