import {
  Resolver,
  UseMiddleware,
  Mutation,
  Arg,
  Ctx,
  ObjectType,
  Field,
  Query,
} from 'type-graphql';
import BoardModel, { Board } from '../models/BoardModel';
import MyContext from '../types';
import isAuth from '../utils/isAuth';

@ObjectType()
class BoardCreateError {
  @Field(() => String)
  message!: string;
}

@ObjectType()
class BoardCreateResponse {
  @Field(() => BoardCreateError, { nullable: true })
  errors?: BoardCreateError;

  @Field(() => Board, { nullable: true })
  board?: Board;
}

@Resolver()
export default class BoardResolver {
  @Mutation(() => BoardCreateResponse, { nullable: true })
  @UseMiddleware(isAuth)
  async createBoard(
    @Arg('boardName') boardName: string,
    @Ctx() { req }: MyContext
  ): Promise<BoardCreateResponse> {
    const userBoards = await BoardModel.findOne({
      user: req.session.userId,
      boardName,
    });
    if (boardName === '') {
      return {
        errors: {
          message: 'Board name can not be blank!',
        },
      };
    }
    if (boardName.length < 3) {
      return {
        errors: {
          message: 'Board name must be greater then 3 character!',
        },
      };
    }
    if (userBoards !== null) {
      return {
        errors: {
          message: 'You already have a borad with this name!',
        },
      };
    }
    const board = await BoardModel.create({
      boardName,
      user: req.session.userId,
    });

    return { board };
  }

  @Query(() => [Board])
  @UseMiddleware(isAuth)
  async boards(@Ctx() { req }: MyContext): Promise<Board[] | []> {
    const boards = await BoardModel.find({ user: req.session.userId });

    return boards;
  }
}
