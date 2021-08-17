import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Board = {
  __typename?: 'Board';
  _id: Scalars['String'];
  boardName: Scalars['String'];
  user: User;
};

export type BoardCreateError = {
  __typename?: 'BoardCreateError';
  message: Scalars['String'];
};

export type BoardCreateResponse = {
  __typename?: 'BoardCreateResponse';
  errors?: Maybe<BoardCreateError>;
  board?: Maybe<Board>;
};

export type Card = {
  __typename?: 'Card';
  _id: Scalars['String'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  status: Scalars['String'];
  board: Scalars['String'];
};

export type CardDeleteError = {
  __typename?: 'CardDeleteError';
  message?: Maybe<Scalars['String']>;
};

export type CardDeleteResponse = {
  __typename?: 'CardDeleteResponse';
  errors?: Maybe<CardDeleteError>;
  card?: Maybe<Card>;
};

export type CardInputType = {
  _id: Scalars['String'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  status: Scalars['String'];
  board: Scalars['String'];
};

export type CardUpdateError = {
  __typename?: 'CardUpdateError';
  message?: Maybe<Scalars['String']>;
};

export type CardUpdateResponse = {
  __typename?: 'CardUpdateResponse';
  errors?: Maybe<CardUpdateError>;
  card?: Maybe<Card>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBoard?: Maybe<BoardCreateResponse>;
  createCard: Card;
  editCard: CardUpdateResponse;
  deleteCard: CardDeleteResponse;
  changeStatus: Card;
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
};


export type MutationCreateBoardArgs = {
  boardName: Scalars['String'];
};


export type MutationCreateCardArgs = {
  status: Scalars['String'];
  board: Scalars['String'];
  title: Scalars['String'];
};


export type MutationEditCardArgs = {
  cardInput: CardInputType;
};


export type MutationDeleteCardArgs = {
  cardId: Scalars['String'];
};


export type MutationChangeStatusArgs = {
  status: Scalars['String'];
  cardId: Scalars['String'];
};


export type MutationRegisterArgs = {
  registerInput: RegisterInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  boards: Array<Board>;
  cards: Array<Card>;
  me?: Maybe<User>;
};


export type QueryCardsArgs = {
  board: Scalars['String'];
};

export type RegisterInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type BoardInfoFragment = { __typename?: 'Board', _id: string, boardName: string, user: { __typename?: 'User', _id: string, username: string } };

export type RegulerCardFragment = { __typename?: 'Card', _id: string, title: string, description?: Maybe<string>, status: string, board: string };

export type RegulerUserFragment = { __typename?: 'User', _id: string, username: string };

export type ChangeStatusMutationVariables = Exact<{
  status: Scalars['String'];
  cardId: Scalars['String'];
}>;


export type ChangeStatusMutation = { __typename?: 'Mutation', changeStatus: { __typename?: 'Card', _id: string, title: string, description?: Maybe<string>, status: string, board: string } };

export type CreateBoardMutationVariables = Exact<{
  boardName: Scalars['String'];
}>;


export type CreateBoardMutation = { __typename?: 'Mutation', createBoard?: Maybe<{ __typename?: 'BoardCreateResponse', errors?: Maybe<{ __typename?: 'BoardCreateError', message: string }>, board?: Maybe<{ __typename?: 'Board', _id: string, boardName: string, user: { __typename?: 'User', _id: string, username: string } }> }> };

export type CreateCardMutationVariables = Exact<{
  title: Scalars['String'];
  board: Scalars['String'];
  status: Scalars['String'];
}>;


export type CreateCardMutation = { __typename?: 'Mutation', createCard: { __typename?: 'Card', _id: string, title: string, description?: Maybe<string>, status: string, board: string } };

export type DeleteCardMutationVariables = Exact<{
  cardId: Scalars['String'];
}>;


export type DeleteCardMutation = { __typename?: 'Mutation', deleteCard: { __typename?: 'CardDeleteResponse', errors?: Maybe<{ __typename?: 'CardDeleteError', message?: Maybe<string> }>, card?: Maybe<{ __typename?: 'Card', _id: string, title: string, description?: Maybe<string>, status: string, board: string }> } };

export type EditCardMutationVariables = Exact<{
  cardInput: CardInputType;
}>;


export type EditCardMutation = { __typename?: 'Mutation', editCard: { __typename?: 'CardUpdateResponse', card?: Maybe<{ __typename?: 'Card', _id: string, title: string, description?: Maybe<string>, status: string, board: string }>, errors?: Maybe<{ __typename?: 'CardUpdateError', message?: Maybe<string> }> } };

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', user?: Maybe<{ __typename?: 'User', _id: string, username: string }>, errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>> } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  registerInput: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', user?: Maybe<{ __typename?: 'User', _id: string, username: string }>, errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>> } };

export type BoardsQueryVariables = Exact<{ [key: string]: never; }>;


export type BoardsQuery = { __typename?: 'Query', boards: Array<{ __typename?: 'Board', _id: string, boardName: string, user: { __typename?: 'User', _id: string, username: string } }> };

export type CardsQueryVariables = Exact<{
  board: Scalars['String'];
}>;


export type CardsQuery = { __typename?: 'Query', cards: Array<{ __typename?: 'Card', _id: string, title: string, description?: Maybe<string>, status: string, board: string }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', _id: string, username: string }> };

export const BoardInfoFragmentDoc = gql`
    fragment BoardInfo on Board {
  _id
  boardName
  user {
    _id
    username
  }
}
    `;
export const RegulerCardFragmentDoc = gql`
    fragment RegulerCard on Card {
  _id
  title
  description
  status
  board
}
    `;
export const RegulerUserFragmentDoc = gql`
    fragment RegulerUser on User {
  _id
  username
}
    `;
export const ChangeStatusDocument = gql`
    mutation ChangeStatus($status: String!, $cardId: String!) {
  changeStatus(status: $status, cardId: $cardId) {
    ...RegulerCard
  }
}
    ${RegulerCardFragmentDoc}`;
export type ChangeStatusMutationFn = Apollo.MutationFunction<ChangeStatusMutation, ChangeStatusMutationVariables>;

/**
 * __useChangeStatusMutation__
 *
 * To run a mutation, you first call `useChangeStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeStatusMutation, { data, loading, error }] = useChangeStatusMutation({
 *   variables: {
 *      status: // value for 'status'
 *      cardId: // value for 'cardId'
 *   },
 * });
 */
export function useChangeStatusMutation(baseOptions?: Apollo.MutationHookOptions<ChangeStatusMutation, ChangeStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeStatusMutation, ChangeStatusMutationVariables>(ChangeStatusDocument, options);
      }
export type ChangeStatusMutationHookResult = ReturnType<typeof useChangeStatusMutation>;
export type ChangeStatusMutationResult = Apollo.MutationResult<ChangeStatusMutation>;
export type ChangeStatusMutationOptions = Apollo.BaseMutationOptions<ChangeStatusMutation, ChangeStatusMutationVariables>;
export const CreateBoardDocument = gql`
    mutation CreateBoard($boardName: String!) {
  createBoard(boardName: $boardName) {
    errors {
      message
    }
    board {
      ...BoardInfo
    }
  }
}
    ${BoardInfoFragmentDoc}`;
export type CreateBoardMutationFn = Apollo.MutationFunction<CreateBoardMutation, CreateBoardMutationVariables>;

/**
 * __useCreateBoardMutation__
 *
 * To run a mutation, you first call `useCreateBoardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBoardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBoardMutation, { data, loading, error }] = useCreateBoardMutation({
 *   variables: {
 *      boardName: // value for 'boardName'
 *   },
 * });
 */
export function useCreateBoardMutation(baseOptions?: Apollo.MutationHookOptions<CreateBoardMutation, CreateBoardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBoardMutation, CreateBoardMutationVariables>(CreateBoardDocument, options);
      }
export type CreateBoardMutationHookResult = ReturnType<typeof useCreateBoardMutation>;
export type CreateBoardMutationResult = Apollo.MutationResult<CreateBoardMutation>;
export type CreateBoardMutationOptions = Apollo.BaseMutationOptions<CreateBoardMutation, CreateBoardMutationVariables>;
export const CreateCardDocument = gql`
    mutation CreateCard($title: String!, $board: String!, $status: String!) {
  createCard(title: $title, board: $board, status: $status) {
    ...RegulerCard
  }
}
    ${RegulerCardFragmentDoc}`;
export type CreateCardMutationFn = Apollo.MutationFunction<CreateCardMutation, CreateCardMutationVariables>;

/**
 * __useCreateCardMutation__
 *
 * To run a mutation, you first call `useCreateCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCardMutation, { data, loading, error }] = useCreateCardMutation({
 *   variables: {
 *      title: // value for 'title'
 *      board: // value for 'board'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useCreateCardMutation(baseOptions?: Apollo.MutationHookOptions<CreateCardMutation, CreateCardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCardMutation, CreateCardMutationVariables>(CreateCardDocument, options);
      }
export type CreateCardMutationHookResult = ReturnType<typeof useCreateCardMutation>;
export type CreateCardMutationResult = Apollo.MutationResult<CreateCardMutation>;
export type CreateCardMutationOptions = Apollo.BaseMutationOptions<CreateCardMutation, CreateCardMutationVariables>;
export const DeleteCardDocument = gql`
    mutation DeleteCard($cardId: String!) {
  deleteCard(cardId: $cardId) {
    errors {
      message
    }
    card {
      ...RegulerCard
    }
  }
}
    ${RegulerCardFragmentDoc}`;
export type DeleteCardMutationFn = Apollo.MutationFunction<DeleteCardMutation, DeleteCardMutationVariables>;

/**
 * __useDeleteCardMutation__
 *
 * To run a mutation, you first call `useDeleteCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCardMutation, { data, loading, error }] = useDeleteCardMutation({
 *   variables: {
 *      cardId: // value for 'cardId'
 *   },
 * });
 */
export function useDeleteCardMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCardMutation, DeleteCardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCardMutation, DeleteCardMutationVariables>(DeleteCardDocument, options);
      }
export type DeleteCardMutationHookResult = ReturnType<typeof useDeleteCardMutation>;
export type DeleteCardMutationResult = Apollo.MutationResult<DeleteCardMutation>;
export type DeleteCardMutationOptions = Apollo.BaseMutationOptions<DeleteCardMutation, DeleteCardMutationVariables>;
export const EditCardDocument = gql`
    mutation EditCard($cardInput: CardInputType!) {
  editCard(cardInput: $cardInput) {
    card {
      ...RegulerCard
    }
    errors {
      message
    }
  }
}
    ${RegulerCardFragmentDoc}`;
export type EditCardMutationFn = Apollo.MutationFunction<EditCardMutation, EditCardMutationVariables>;

/**
 * __useEditCardMutation__
 *
 * To run a mutation, you first call `useEditCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editCardMutation, { data, loading, error }] = useEditCardMutation({
 *   variables: {
 *      cardInput: // value for 'cardInput'
 *   },
 * });
 */
export function useEditCardMutation(baseOptions?: Apollo.MutationHookOptions<EditCardMutation, EditCardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditCardMutation, EditCardMutationVariables>(EditCardDocument, options);
      }
export type EditCardMutationHookResult = ReturnType<typeof useEditCardMutation>;
export type EditCardMutationResult = Apollo.MutationResult<EditCardMutation>;
export type EditCardMutationOptions = Apollo.BaseMutationOptions<EditCardMutation, EditCardMutationVariables>;
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    user {
      _id
      username
    }
    errors {
      field
      message
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($registerInput: RegisterInput!) {
  register(registerInput: $registerInput) {
    user {
      ...RegulerUser
    }
    errors {
      field
      message
    }
  }
}
    ${RegulerUserFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      registerInput: // value for 'registerInput'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const BoardsDocument = gql`
    query Boards {
  boards {
    ...BoardInfo
  }
}
    ${BoardInfoFragmentDoc}`;

/**
 * __useBoardsQuery__
 *
 * To run a query within a React component, call `useBoardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBoardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBoardsQuery({
 *   variables: {
 *   },
 * });
 */
export function useBoardsQuery(baseOptions?: Apollo.QueryHookOptions<BoardsQuery, BoardsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BoardsQuery, BoardsQueryVariables>(BoardsDocument, options);
      }
export function useBoardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BoardsQuery, BoardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BoardsQuery, BoardsQueryVariables>(BoardsDocument, options);
        }
export type BoardsQueryHookResult = ReturnType<typeof useBoardsQuery>;
export type BoardsLazyQueryHookResult = ReturnType<typeof useBoardsLazyQuery>;
export type BoardsQueryResult = Apollo.QueryResult<BoardsQuery, BoardsQueryVariables>;
export const CardsDocument = gql`
    query Cards($board: String!) {
  cards(board: $board) {
    ...RegulerCard
  }
}
    ${RegulerCardFragmentDoc}`;

/**
 * __useCardsQuery__
 *
 * To run a query within a React component, call `useCardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCardsQuery({
 *   variables: {
 *      board: // value for 'board'
 *   },
 * });
 */
export function useCardsQuery(baseOptions: Apollo.QueryHookOptions<CardsQuery, CardsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CardsQuery, CardsQueryVariables>(CardsDocument, options);
      }
export function useCardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CardsQuery, CardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CardsQuery, CardsQueryVariables>(CardsDocument, options);
        }
export type CardsQueryHookResult = ReturnType<typeof useCardsQuery>;
export type CardsLazyQueryHookResult = ReturnType<typeof useCardsLazyQuery>;
export type CardsQueryResult = Apollo.QueryResult<CardsQuery, CardsQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...RegulerUser
  }
}
    ${RegulerUserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;