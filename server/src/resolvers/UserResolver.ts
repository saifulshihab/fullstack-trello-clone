import bcrypt from 'bcryptjs';
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import { COKKIE_NAME } from '../constants';
import UserModel, { User } from '../models/UserModel';
import MyContext from '../types';
import validateRegister from '../utils/validateRegister';

@ObjectType()
export class FieldError {
  @Field()
  field!: string;

  @Field()
  message!: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@InputType()
export class RegisterInput {
  @Field()
  username!: string;

  @Field()
  email!: string;

  @Field()
  password!: string;
}

@Resolver()
export default class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext): Promise<User | null> {
    if (!req.session.userId) {
      return null;
    }
    const user = await UserModel.findById(req.session.userId);
    return user;
  }

  // registration
  @Mutation(() => UserResponse)
  async register(
    @Arg('registerInput') registerInput: RegisterInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const errors = validateRegister(registerInput);

    if (errors) {
      return { errors };
    }

    const hashPassword = await bcrypt.hash(registerInput.password, 10);
    let user;

    try {
      user = await UserModel.create({
        ...registerInput,
        password: hashPassword,
      });
    } catch (error) {
      if (
        error.code === '11000' ||
        error.message.includes('username_1 dup key')
      ) {
        return {
          errors: [
            {
              field: 'username',
              message: 'Username already taken.',
            },
          ],
        };
      }
    }

    // redirect: login after registration
    req.session.userId = user?._id;
    return { user };
  }

  // login
  @Mutation(() => UserResponse)
  async login(
    @Arg('usernameOrEmail') usernameOrEmail: string,
    @Arg('password') password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    if (usernameOrEmail === '') {
      return {
        errors: [
          {
            field: 'usernameOrEmail',
            message: 'Username or email required!',
          },
        ],
      };
    }
    if (password === '') {
      return {
        errors: [
          {
            field: 'password',
            message: 'Password required!',
          },
        ],
      };
    }
    const user = await UserModel.findOne(
      usernameOrEmail.includes('@')
        ? { email: usernameOrEmail }
        : { username: usernameOrEmail }
    );
    if (!user) {
      return {
        errors: [
          {
            field: 'usernameOrEmail',
            message: 'Incorrect username or email!',
          },
        ],
      };
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return {
        errors: [
          {
            field: 'password',
            message: 'Invalid password!',
          },
        ],
      };
    }

    req.session.userId = user.id;

    return { user };
  }

  // logout
  @Mutation(() => Boolean)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) => {
      req.session.destroy((err) => {
        if (err) {
          resolve(false);
          return;
        }
        // remove the cookie
        res.clearCookie(COKKIE_NAME);
        resolve(true);
      });
    });
  }
}
