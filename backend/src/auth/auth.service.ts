import { Injectable, Get } from '@nestjs/common';
import { UserRepository } from '../models/user/user.repository';
import { CreateAdminInput } from './input/create-admin.input';
import { LoginAdminInput } from './input/login-admin.input';
import { LoginAdminDTO } from './dto/login-admin.dto';

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
