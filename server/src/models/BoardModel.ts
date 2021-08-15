import { getModelForClass, prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { ObjectId } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';
import { User } from './UserModel';

@ObjectType()
export class Board extends TimeStamps {
  @Field(() => String)
  readonly _id!: ObjectId;

  @Field()
  @prop({ required: true })
  boardName!: string;

  @Field()
  @prop({ ref: () => User })
  user!: string;
}

const BoardModel = getModelForClass(Board);

export default BoardModel;
