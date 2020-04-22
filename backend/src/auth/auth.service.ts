import { Injectable, Get } from '@nestjs/common';
import { UserRepository } from '../models/user.repository';
import { createAdminDTO } from './dto/create-admin.dto';
import { LoginAdminDTO } from './dto/login-admin.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  // If we follow CQRS pattern than POST is command and return void

  async createAdmin(createAdminDTO: createAdminDTO): Promise<void> {
    await this.userRepository.create({ ...createAdminDTO });
  }

  async loginAdmin(loginAdminDto: LoginAdminDTO): Promise<boolean> {
    return await this.userRepository.login(loginAdminDto);
  }
}
