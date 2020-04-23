// src/config/config.service.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
// @igor.t go three times back to .env file, or create 'shodow' .env file in the be folder
config({ path: __dirname + './../../../.env' });

// List of all current db's
enum dbTypes {
  'mysql' = 'mysql',
}

// @igor.t kind of reusable code to swap database, maybe with some strategy pattern or similar it can be achieve this
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
      host: this.getEnvValue('DB_HOST'),
      port: parseInt(this.getEnvValue('DB_PORT')),
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
