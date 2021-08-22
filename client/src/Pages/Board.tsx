import { useState, useEffect, createContext, useContext } from 'react';
import { BiStar } from 'react-icons/bi';
import { FaTrello } from 'react-icons/fa';
import { MdKeyboardArrowDown, MdMoreHoriz, MdPublic } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import BoardColumn from '../Components/BoardColumn';
import { CardInputType, useCardsQuery } from '../generated/graphql';
import useBoardName from '../hooks/useBoardName';

const BoardContext = createContext<{
  boardId: string;
  cardItems?: CardInputType[] | [];
} | null>(null);

const Board = () => {
  const { boardId } = useParams<{ boardId?: string }>();
  const boardName = useBoardName(boardId as string);

  const { data, error } = useCardsQuery({
    variables: { board: boardId as string },
  });

  const [cardItems, setCardItems] = useState<CardInputType[] | []>([]);
  const [todoItems, setTodoItems] = useState<CardInputType[] | []>([]);
  const [doingItems, setDoingItems] = useState<CardInputType[] | []>([]);
  const [doneItems, setDoneItems] = useState<CardInputType[] | []>([]);

  useEffect(() => {
    if (!error && data?.cards) {
      setCardItems(data?.cards);

      const todo = cardItems.filter((item) => item.status === 'todo');
      const doing = cardItems.filter((item) => item.status === 'doing');
      const done = cardItems.filter((item) => item.status === 'done');

      // set items
      setTodoItems(todo);
      setDoingItems(doing);
      setDoneItems(done);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, data?.cards, cardItems]);

  return (
    <div
      className="w-full h-full"
      style={{ backgroundColor: 'rgb(1 120 190)' }}
    >
      <div className="w-full h-full flex flex-col">
        {/* header */}
        <div className="w-full h-12 p-2 text-white px-3">
          <div className="flex items-center">
            <div className="flex space-x-1 items-center">
              <button
                type="button"
                className="flex space-x-1 h-8 bg-gray-100 items-center justify-between text-xl rounded-sm bg-opacity-30 hover:bg-opacity-20 px-2"
              >
                <div className="flex items-center">
                  <FaTrello />
                  <span className="ml-2 text-sm">Boards</span>
                </div>
                <div>
                  <MdKeyboardArrowDown />
                </div>
              </button>
              <button
                type="button"
                className="flex h-8 w-36 max-w-40 bg-gray-100 items-center justify-center text-xl rounded-sm bg-opacity-30 hover:bg-opacity-20 px-2"
              >
                <span className="ml-2 text-sm truncate">
                  {boardName !== '' ? boardName : 'Loading...'}
                </span>
              </button>
              <button
                type="button"
                className="flex w-8 h-8 bg-gray-100 items-center justify-center text-sm rounded-sm bg-opacity-30 hover:bg-opacity-20"
              >
                <BiStar />
              </button>
            </div>
            <div className="ml-3 flex space-x-3 items-center">
              <button
                type="button"
                className="flex h-8 w-36 max-w-40 bg-gray-100 items-center justify-center text-xl rounded-sm bg-opacity-30 hover:bg-opacity-20 px-2"
              >
                <span className="ml-2 text-sm truncate">
                  {boardName !== '' ? boardName : 'Loading...'}
                </span>
              </button>
              <button
                type="button"
                className="flex h-8 bg-gray-100 items-center justify-center text-xl rounded-sm bg-opacity-30 hover:bg-opacity-20 px-2"
              >
                <MdPublic />
                <span className="ml-2 text-sm">Public</span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="flex items-center -space-x-1">
                  <div className="h-8 w-8 rounded-full">
                    <img
                      className="w-full h-full text-xs rounded-full"
                      src="https://picsum.photos/200"
                      alt="dp"
                    />
                  </div>
                  <div className="h-8 w-8 rounded-full">
                    <img
                      className="w-full h-full text-xs rounded-full"
                      src="https://picsum.photos/200"
                      alt="dp"
                    />
                  </div>
                  <div className="h-8 w-8 rounded-full">
                    <img
                      className="w-full h-full text-xs rounded-full"
                      src="https://picsum.photos/200"
                      alt="dp"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  className="flex px-2 h-8 bg-gray-100 items-center justify-center text-sm rounded-sm bg-opacity-30 hover:bg-opacity-20"
                >
                  Invite
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-2 ml-auto">
              <button
                type="button"
                className="flex space-x-2 h-8 bg-gray-100 items-center justify-between text-xl rounded-sm bg-opacity-30 hover:bg-opacity-20 px-2"
              >
                <FaTrello />
                <span className="ml-2 text-sm">Automation</span>
              </button>
              <button
                type="button"
                className="flex space-x-2 h-8 bg-gray-100 items-center justify-between text-xl rounded-sm bg-opacity-30 hover:bg-opacity-20 px-2"
              >
                <MdMoreHoriz />
                <span className="ml-2 text-sm">Show menu</span>
              </button>
            </div>
          </div>
        </div>
        {/* board content */}
        <div className="w-full flex items-start flex-no-wrap overflow-x-auto space-x-3 p-1 text-gray-600">
          <BoardContext.Provider value={{ boardId: boardId as string }}>
            {/* to do */}
            <BoardColumn cardStatus="todo" itemList={todoItems} />
            {/* doing */}
            <BoardColumn cardStatus="doing" itemList={doingItems} />
            {/* done */}
            <BoardColumn cardStatus="done" itemList={doneItems} />
          </BoardContext.Provider>
        </div>
      </div>
    </div>
  );
};

export const useBoard = () => {
  const context = useContext(BoardContext);

  if (!context) throw Error('No context');

  return context;
};

export default Board;
