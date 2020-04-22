import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { compare, hash } from 'bcrypt';
import { LoginAdminDTO } from '../auth/dto/login-admin.dto';
import { createAdminDTO } from '../auth/dto/create-admin.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createAdmin(createAdminDTO: createAdminDTO): Promise<void> {
    const { name, surname, username, password } = createAdminDTO;
    try {
      const hashedPassword = hash(password, 8);
      if (!hashedPassword) {
        throw new Error('Problem with hashing the password');
      }
      this.create({ name, surname, username, password: hashedPassword });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async login(loginAdminDTO: LoginAdminDTO): Promise<boolean> {
    const { username, password } = loginAdminDTO;
    const user = await this.findOne(username);
    if (!user) {
      throw new Error('User not found');
    }

    return await compare(password, user.password);
  }
}
