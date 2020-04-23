import { EntityRepository, Repository, EntityManager } from 'typeorm';
import { User } from './user.entity';
import { compare, hash } from 'bcrypt';
import { LoginAdminInput } from '../../auth/input/login-admin.input';
import { CreateAdminInput } from '../../auth/input/create-admin.input';
import { LoginAdminDTO } from '../../auth/dto/login-admin.dto';

/**
 * Because we have simple logic we don't place the logic for the code in different places like entites, services, domain objects etc...
 * For now they sit on repository level as they have connection with reading and writing to/from data
 * If we follow clean code guides repos needs to be clean and only find, read, write, update data etc
 * All repors have only create operation and listAll like list all categories or create new category
 * In future refactoring we can have update single item, delete all, delete single item etc...
 * The logic is encapusalted in smaller functions to be reusable, and to be swapped in other folder tommorow if we doing refactoring
 * We can unit testing the private functions that are more like util level functions, we can also the other functions bigger one and more concrete, but they used db so we need to mockup or leave it as integration testing
 */
@EntityRepository(User)
export class UserRepository {
  constructor(private readonly manager: EntityManager) {}

  private async userExists(
    email: CreateAdminInput['email'],
    username: CreateAdminInput['username'],
    password: CreateAdminInput['password'],
  ): Promise<number> {
    const user = await this.manager.findOne(User, {
      where: [{ email }, { username }],
    });

    if (!user) {
      throw new Error('User not found');
    }

    const userExists =
      (username === user.username || email === user.email) &&
      (await compare(password, user.password));

    return userExists ? user.id : 0;
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
      return { id: user.id, email };
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async login(loginAdminInput: LoginAdminInput): Promise<LoginAdminDTO> {
    const { email, username, password } = loginAdminInput;
    if (!(await this.userExists(email, username, password))) {
      throw new Error('Email(username) / password does not match');
    }

    const user = await this.manager.findOne(User, {
      where: [{ email }, { username }],
    });

    return { id: user.id, email };
  }
}
