import { MiddlewareFn } from 'type-graphql';
import MyContext from '../types';

const isAuth: MiddlewareFn<MyContext> = ({ context: { req } }, next) => {
  if (!req.session.userId) {
    throw new Error('You are not authenticated!');
  }

  return next();
};

export default isAuth;
