import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { ObjectId } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';
import { Board } from './BoardModel';

@ObjectType()
export class Card extends TimeStamps {
  @Field(() => String)
  readonly _id!: ObjectId;

  @Field()
  @prop({ required: true })
  title!: string;

  @Field(() => String, { defaultValue: '' })
  @prop()
  description!: string;

  @Field()
  @prop({ required: true })
  status!: string;

  @Field(() => String)
  @prop({ ref: () => Board })
  public board!: Ref<Board>;
}

const CardModel = getModelForClass(Card);
export default CardModel;
