import React, { useEffect, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoCloseOutline } from 'react-icons/all';
import { HiOutlineTemplate, HiOutlineVideoCamera } from 'react-icons/hi';
import { MdMoreHoriz } from 'react-icons/md';
import {
  CardsDocument,
  CardsQuery,
  RegulerCardFragment,
  useChangeStatusMutation,
  useCreateCardMutation,
} from '../generated/graphql';
import { useBoard } from '../Pages/Board';
import { CardStatusType, DndTypes } from '../types';
import Card from './Card';
import Loader from './Loader';

interface BoardColumnProps {
  cardStatus: CardStatusType;
  itemList: RegulerCardFragment[];
}

const BoardColumn = ({ cardStatus, itemList }: BoardColumnProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [newCard, setNewCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');

  const { boardId } = useBoard();

  const [createCard, { loading: createCardLoading }] = useCreateCardMutation();
  const [changeStatus] = useChangeStatusMutation();

  useEffect(() => {
    if (newCard) {
      // eslint-disable-next-line no-unused-expressions
      inputRef.current?.focus();
    }
  }, [newCard]);

  // dnd hooks
  const [{ isOver }, drop] = useDrop({
    accept: DndTypes.CARD,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    drop: (item: any) =>
      changeStatus({
        variables: { cardId: item.id, status: cardStatus },
      }),
  });

  const newCardSubmitHandler = async () => {
    if (newCardTitle !== '') {
      const response = await createCard({
        variables: { title: newCardTitle, status: cardStatus, board: boardId },
        update: (cache, { data: upcomingData }) => {
          if (upcomingData?.createCard !== null) {
            // read cards list
            const readData = cache.readQuery<CardsQuery>({
              query: CardsDocument,
              variables: { board: boardId },
            });

            cache.writeQuery({
              query: CardsDocument,
              data: {
                cards: [...(readData?.cards || []), upcomingData?.createCard],
              },
              variables: { board: boardId },
            });
          }
        },
      });
      if (!response.errors) {
        setNewCardTitle('');
        setNewCard(false);
      }
    }
  };

  const addKeyHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newCardTitle !== '') {
      newCardSubmitHandler();
    }
  };

  return (
    <div
      ref={drop}
      className={`w-72 max-h-full flex flex-col rounded ${
        isOver ? 'bg-gray-300' : 'bg-gray-200'
      }`}
      // style={{
      //   maxHeight: `calc(100% - ${itemList?.length > 0 ? '2.5rem' : '0rem'})`,
      // }}
    >
      <div className="w-full h-10 flex items-center justify-between p-2 px-4">
        <p className="text-md font-semibold">
          {cardStatus === 'todo'
            ? 'To Do'
            : cardStatus === 'doing'
            ? 'Doing'
            : cardStatus === 'done' && 'Done'}
        </p>
        <button type="button">
          <MdMoreHoriz />
        </button>
      </div>
      <div className="w-full py-1 max-h-full overflow-y-auto px-3 flex flex-col h-full space-y-2">
        {itemList?.map((item) => {
          return <Card key={item._id} cardStatus={item?.status} item={item} />;
        })}
      </div>
      <div className="w-full h-auto p-2 px-3">
        {newCard ? (
          <div>
            <input
              ref={inputRef}
              placeholder="Card title..."
              className="w-full text-sm h-12 px-3 rounded outline-none shadow"
              value={newCardTitle}
              onChange={(e) => setNewCardTitle(e.target.value)}
              onKeyPress={addKeyHandler}
            />
            <div className="flex items-center mt-2 space-x-2">
              <button
                disabled={newCardTitle === ''}
                type="button"
                className={`w-12 h-8 rounded flex text-sm text-white items-center justify-center font-semibold bg-blue-500 hover:bg-blue-600 shadow ${
                  newCardTitle === '' && 'cursor-not-allowed'
                }`}
                onClick={newCardSubmitHandler}
              >
                {createCardLoading ? <Loader /> : 'ADD'}
              </button>
              <button
                type="button"
                className="w-8 h-8 rounded flex items-center text-xl justify-center font-semibold hover:text-gray-800"
                onClick={() => setNewCard(false)}
              >
                <IoCloseOutline />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <button
              type="button"
              className="flex flex-1 h-6 items-center space-x-2 hover:bg-gray-400 hover:bg-opacity-20 px-2 rounded"
              onClick={() => setNewCard(true)}
            >
              <div>
                <AiOutlinePlus />
              </div>
              <p className="text-sm">Add a Card</p>
            </button>
            <div className="flex items-center space-x-0">
              <button
                type="button"
                className="flex w-6 h-6 hover:bg-gray-400 text-xs items-center justify-center rounded-sm bg-opacity-30 hover:bg-opacity-20"
              >
                <HiOutlineVideoCamera />
              </button>
              <button
                type="button"
                className="flex w-6 h-6 hover:bg-gray-400 text-xs items-center justify-center rounded-sm bg-opacity-30 hover:bg-opacity-20"
              >
                <HiOutlineTemplate />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoardColumn;
