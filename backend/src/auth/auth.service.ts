import { Injectable, Get } from '@nestjs/common';
import { UserRepository } from '../models/user/user.repository';
import { CreateAdminInput } from './input/create-admin.input';
import { LoginAdminInput } from './input/login-admin.input';
import { LoginAdminDTO } from './dto/login-admin.dto';

/**
 * As described in all .resolvers files, service is in 1:1 relation
 * It used because of best practices bulding software, it's thin layer below the resolver or controller if this is not graphql
 * The service can do many things like injecting many different repos and entities and other objects if needed...
 */
@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async createAdmin(createAdminInput: CreateAdminInput): Promise<LoginAdminDTO> {
    return await this.userRepository.createAdmin(createAdminInput);
  }

  async loginAdmin(loginAdminInput: LoginAdminInput): Promise<LoginAdminDTO> {
    return await this.userRepository.login(loginAdminInput);
  }
}
