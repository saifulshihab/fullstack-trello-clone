import { getModelForClass, prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { ObjectId } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class User extends TimeStamps {
  @Field(() => String)
  readonly _id!: ObjectId;

  @Field()
  @prop({ required: true })
  email!: string;

  @Field()
  @prop({ required: true, unique: true })
  username!: string;

  @prop({ required: true })
  password!: string;
}

const UserModel = getModelForClass(User);
export default UserModel;
