import { EntityRepository, Repository, EntityManager } from 'typeorm';
import { User } from './user.entity';
import { compare, hash } from 'bcrypt';
import { LoginAdminInput } from '../../auth/input/login-admin.input';
import { CreateAdminInput } from '../../auth/input/create-admin.input';
import { LoginAdminDTO } from '../../auth/dto/login-admin.dto';

@EntityRepository(User)
export class UserRepository {
  constructor(private readonly manager: EntityManager) {}

  private async userExists(
    email: CreateAdminInput['email'],
    username: CreateAdminInput['username'],
    password: CreateAdminInput['password'],
  ): Promise<boolean> {
    const user = await this.manager.findOne(User, {
      where: [{ email }, { username }],
    });

    if (!user) {
      throw new Error('User not found');
    }

    return (
      (username === user.username || email === user.email) &&
      (await compare(password, user.password))
    );
  }

  private async hashPassword(password: User['password']): Promise<string> {
    const hashedPassword = hash(password, 8);
    if (!hashedPassword) {
      throw new Error('Problem with hashing the password');
    }
    return hashedPassword;
  }

  async createAdmin(
    createAdminInput: CreateAdminInput,
  ): Promise<LoginAdminDTO> {
    /**
     * It's questionable where the logic for hashing can appear, the're multiple places, but non of them is best appoaach
     * static method on the user entity class
     * In the auth service
     * Or here
     */
    const { name, surname, email, username, password } = createAdminInput;

    const userFound = await this.manager.findOne(User, {
      where: { email },
    });

    if (userFound) {
      throw new Error('User exists');
    }

    try {
      const hashedPassword = await this.hashPassword(password);
      const user = this.manager.create(User, {
        name,
        surname,
        email,
        username,
        password: hashedPassword,
      });
      await this.manager.save(user);
      return { email, username, password: hashedPassword };
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async login(loginAdminInput: LoginAdminInput): Promise<LoginAdminDTO> {
    const { email, username = '', password } = loginAdminInput;
    if (!(await this.userExists(email, username, password))) {
      throw new Error('Email(username) / password does not match');
    }

    return { email, username, password };
  }
}
