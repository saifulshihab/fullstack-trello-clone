import { BiStar } from 'react-icons/bi';
import { FaTrello } from 'react-icons/fa';
import { MdKeyboardArrowDown, MdMoreHoriz, MdPublic } from 'react-icons/md';
import BoardColumn from '../Components/BoardColumn';
import { itemType } from '../types';

const cardItems: itemType[] = [
  {
    _id: '1',
    title: 'React Dnd',
    description: 'Dnd is very important...',
    status: 'todo',
  },
  {
    _id: '2',
    title: 'TypeGraphQL',
    description: 'So much important',
    status: 'todo',
  },
  {
    _id: '4',
    title: 'ORM',
    description: 'databses oath',
    status: 'todo',
  },
  {
    _id: '5',
    title: 'Django',
    description: 'Description of card items...',
    status: 'doing',
  },
  {
    _id: '6',
    title: 'AWS',
    status: 'done',
  },
];

const Board = () => {
  const thingsToDoList = cardItems.filter((item) => item.status === 'todo');
  const doingList = cardItems.filter((item) => item.status === 'doing');
  const doneList = cardItems.filter((item) => item.status === 'done');

  console.log('rendering... board');
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
                className="flex h-8 bg-gray-100 items-center justify-center text-xl rounded-sm bg-opacity-30 hover:bg-opacity-20 px-2"
              >
                <span className="ml-2 text-sm">fullstack-trello-clone</span>
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
                className="flex h-8 bg-gray-100 items-center justify-center text-xl rounded-sm bg-opacity-30 hover:bg-opacity-20 px-2"
              >
                <span className="ml-2 text-sm">fullstack-trello-clone</span>
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
          {/* to do */}
          <BoardColumn cardStatus="todo" itemList={thingsToDoList} />
          {/* doing */}
          <BoardColumn cardStatus="doing" itemList={doingList} />
          {/* done */}
          <BoardColumn cardStatus="done" itemList={doneList} />
        </div>
      </div>
    </div>
  );
};

export default Board;
