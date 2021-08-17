import { getModelForClass, plugin, prop, Ref } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { ObjectId } from 'mongodb';
import autopopulate from 'mongoose-autopopulate';
import { Field, ObjectType } from 'type-graphql';
import { User } from './UserModel';

@ObjectType()
@plugin(autopopulate)
export class Board extends TimeStamps {
  @Field(() => String)
  readonly _id!: ObjectId;

  @Field()
  @prop({ required: true })
  boardName!: string;

  @Field(() => User)
  @prop({ ref: () => User, autopopulate: true })
  user!: Ref<User>;
}

const BoardModel = getModelForClass(Board);

export default BoardModel;
