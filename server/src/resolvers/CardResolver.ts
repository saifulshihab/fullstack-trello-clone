import {
  Resolver,
  Mutation,
  UseMiddleware,
  Arg,
  Query,
  InputType,
  Field,
  ObjectType,
} from 'type-graphql';
import CardModel, { Card } from '../models/CardModel';
// import MyContext from '../types';
import isAuth from '../utils/isAuth';

@InputType()
class CardInputType {
  @Field(() => String)
  _id!: string;

  @Field(() => String)
  title!: string;

  @Field(() => String, { nullable: true })
  description!: string;

  @Field(() => String)
  status?: string;

  @Field(() => String)
  board?: string;
}

@ObjectType()
class CardUpdateError {
  @Field(() => String, { nullable: true })
  message?: string;
}

@ObjectType()
class CardUpdateResponse {
  @Field(() => CardUpdateError, { nullable: true })
  errors?: CardUpdateError;

  @Field(() => Card, { nullable: true })
  card?: Card;
}

@ObjectType()
class CardDeleteError {
  @Field(() => String, { nullable: true })
  message?: string;
}

@ObjectType()
class CardDeleteResponse {
  @Field(() => CardDeleteError, { nullable: true })
  errors?: CardDeleteError;

  @Field(() => Card, { nullable: true })
  card?: Card;
}

@Resolver()
export default class CardResolver {
  @Query(() => [Card])
  @UseMiddleware(isAuth)
  async cards(@Arg('board') board: string): Promise<Card[] | []> {
    const cards = await CardModel.find({ board });
    return cards;
  }

  @Mutation(() => Card)
  @UseMiddleware(isAuth)
  async createCard(
    @Arg('title') title: string,
    @Arg('board') board: string,
    @Arg('status') status: string
  ): Promise<Card> {
    const newCard = await CardModel.create({ title, board, status });
    return newCard;
  }

  @Mutation(() => CardUpdateResponse)
  @UseMiddleware(isAuth)
  async editCard(
    @Arg('cardInput') cardInput: CardInputType
  ): Promise<CardUpdateResponse> {
    if (cardInput.title === '') {
      return {
        errors: {
          message: 'Card title can not be blank',
        },
      };
    }
    const update = await CardModel.findByIdAndUpdate(
      cardInput._id,
      { $set: cardInput },
      { new: true }
    );

    if (!update) {
      return {
        errors: {
          message: 'Failed to update card!',
        },
      };
    }
    const card = update;
    return { card };
  }

  @Mutation(() => CardDeleteResponse)
  @UseMiddleware(isAuth)
  async deleteCard(@Arg('cardId') cardId: string): Promise<CardDeleteResponse> {
    const cardExist = await CardModel.findById(cardId);

    if (!cardExist) {
      return {
        errors: {
          message: 'Card not found!',
        },
      };
    }

    const card = await cardExist.remove();

    return { card };
  }

  @Mutation(() => Card)
  @UseMiddleware(isAuth)
  async changeStatus(
    @Arg('cardId') cardId: string,
    @Arg('status') status: string
  ): Promise<Card | null> {
    const card = await CardModel.findById(cardId);
    if (card) {
      card.status = status;
    }
    await card?.save();
    return card;
  }
}
