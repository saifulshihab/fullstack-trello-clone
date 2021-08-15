import { Request, Response } from 'express';
import { Redis } from 'ioredis';

type MyContext = {
  req: Request;
  res: Response;
  redis: Redis;
};

export default MyContext;
