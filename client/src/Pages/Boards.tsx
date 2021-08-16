import { useCallback, useState } from 'react';
import {
  AiOutlinePlus,
  DiTrello,
  FaRegHeart,
  FaTrello,
  FiTrello,
  GiSoundWaves,
  HiOutlineTable,
  IoCloseOutline,
  IoPeopleSharp,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  RiSettings5Line,
} from 'react-icons/all';
import { Link } from 'react-router-dom';
import Loader from '../Components/Loader';
import {
  useBoardsQuery,
  useCreateBoardMutation,
  BoardsDocument,
} from '../generated/graphql';

interface ErrorType {
  message: string;
  __typename?: string | undefined;
}

const Boards = () => {
  const [dropDown, setDropDown] = useState(false);
  const [newBoard, setNewBoard] = useState(false);
  const [newBoardName, setNewBoardName] = useState('');
  const [createBoardError, setCreateBoardError] = useState<ErrorType | null>(
    null
  );

  const { data, loading: boardsLoading } = useBoardsQuery();
  const [createBoard, { loading: createBoardLoading }] =
    useCreateBoardMutation();

  const createBoardHandler = async () => {
    const response = await createBoard({
      variables: { boardName: newBoardName },
      update: (cache, { data: newData }) => {
        if (newData?.createBoard?.board !== null) {
          cache.writeQuery({
            query: BoardsDocument,
            data: {
              __typename: 'Query',
              boards: [...(data?.boards || []), newData?.createBoard?.board],
            },
          });
        }
      },
    });
    if (response.data?.createBoard?.errors) {
      setCreateBoardError(response.data?.createBoard?.errors);
    } else {
      setNewBoard(false);
      setNewBoardName('');
      setCreateBoardError(null);
    }
  };

  return (
    <div className="w-full flex mt-5">
      <div className="w-full sm:max-w-6xl mx-auto flex text-gray-700 space-x-3">
        {/* left sidebar */}
        <div className="w-10 sm:w-32 md:w-64 h-full">
          <div className="flex flex-col space-y-3">
            <div className="flex flex-col space-y-2 text-sm ">
              <div className="flex items-center space-x-2 rounded-md hover:bg-gray-200 p-2 px-3 cursor-pointer bg-blue-100 text-blue-600">
                <div>
                  <FaTrello />
                </div>
                <p className="hidden sm:block font-bold">Boards</p>
              </div>
              <div className="flex items-center space-x-2 rounded-md hover:bg-gray-200 p-2 px-3 cursor-pointer">
                <div>
                  <FiTrello />
                </div>
                <p className="hidden sm:block font-bold">Templates</p>
              </div>
              <div className="flex items-center space-x-2 rounded-md hover:bg-gray-200 p-2 px-3 cursor-pointer">
                <div>
                  <GiSoundWaves />
                </div>
                <p className="hidden sm:block font-bold">Home</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-gray-500 font-semibold p-2">
              <p className="hidden sm:block text-sm">WORKSPACES</p>
              <button
                style={{ padding: 2 }}
                type="button"
                className="hover:bg-gray-200 rounded"
              >
                <AiOutlinePlus />
              </button>
            </div>
            <div className="flex flex-col space-y-3">
              <button
                onClick={useCallback(() => {
                  setDropDown(!dropDown);
                }, [dropDown])}
                type="button"
                className="flex items-center justify-between w-full text-sm font-bold p-2 hover:bg-gray-200 rounded"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 flex items-center justify-center text-white rounded-md bg-purple-600 font-bold">
                    T
                  </div>
                  <p className="hidden sm:block">team-saiful-shihab</p>
                </div>
                <span>
                  {dropDown ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
                </span>
              </button>
              {dropDown ? (
                <div className="flex flex-col space-y-3 text-xs text-gray-600 font-thin cursor-pointer">
                  <div className="flex items-center space-x-2 p-1.5 px-7 rounded-md hover:bg-gray-200">
                    <div>
                      <FaTrello />
                    </div>
                    <p className="hidden sm:block">Boards</p>
                  </div>
                  <div className="flex items-center space-x-2 p-1.5 px-7 rounded-md hover:bg-gray-200">
                    <div>
                      <FaRegHeart />
                    </div>
                    <p className="hidden sm:block">Highlights</p>
                  </div>
                  <div className="flex items-center space-x-2 p-1.5 px-7 rounded-md hover:bg-gray-200">
                    <div>
                      <HiOutlineTable />
                    </div>
                    <p className="hidden sm:block">Workspace table</p>
                  </div>
                  <div className="flex items-center space-x-2 p-1.5 px-7 rounded-md hover:bg-gray-200">
                    <div>
                      <IoPeopleSharp />
                    </div>
                    <p className="hidden sm:block">Members</p>
                  </div>
                  <div className="flex items-center space-x-2 p-1.5 px-7 rounded-md hover:bg-gray-200">
                    <div>
                      <RiSettings5Line />
                    </div>
                    <p className="hidden sm:block">Settings</p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        {/* boards */}
        <div className="flex-1">
          <div className="w-full">
            <p className="text-md font-bold uppercase text-gray-500">
              Your Workspaces
            </p>
          </div>
          <div className="mt-5 flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-20">
            <div className="flex space-x-2 items-center">
              <div className="w-8 h-8 flex items-center justify-center text-white rounded-md bg-purple-600 font-bold">
                T
              </div>
              <p className="font-bold">team-saiful-shihab</p>
            </div>
            <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0 text-sm text-gray-600 cursor-pointer">
              <div className="flex items-center space-x-2 p-1 px-2 rounded bg-gray-100 hover:bg-gray-200">
                <div>
                  <FaTrello />
                </div>
                <p>Boards</p>
              </div>
              <div className="flex items-center space-x-2 p-1 px-2 rounded bg-gray-100 hover:bg-gray-200">
                <div>
                  <HiOutlineTable />
                </div>

                <p>Workspace table</p>
              </div>
              <div className="flex items-center space-x-2 p-1 px-2 rounded bg-gray-100 hover:bg-gray-200">
                <div>
                  <IoPeopleSharp />
                </div>
                <p>Members</p>
              </div>
              <div className="flex items-center space-x-2 p-1 px-2 rounded bg-gray-100 hover:bg-gray-200">
                <div>
                  <RiSettings5Line />
                </div>
                <p>Settings</p>
              </div>
              <div className="flex items-center space-x-2 p-1 px-2 rounded bg-purple-200 text-purple-800 hover:bg-gray-200">
                <div>
                  <DiTrello />
                </div>
                <p>Upgrade</p>
              </div>
            </div>
          </div>
          {createBoardError && (
            <div className="mt-3">
              <p className="p-2 bg-red-100 text-sm font-semibold text-red-500">
                {createBoardError?.message}
              </p>
            </div>
          )}
          <div className="grid mt-3 grid-cols-4 gap-2">
            {boardsLoading ? (
              <Loader />
            ) : // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            !boardsLoading ? (
              data?.boards.map((board) => (
                <div
                  key={board?._id}
                  className="col-span-1 h-24 rounded-md p-2 bg-blue-500 cursor-pointer text-white"
                >
                  <Link to={`/b/${board?._id}`}>
                    <p className="font-bold w-full h-full hover:underline">
                      {board?.boardName}
                    </p>
                  </Link>
                </div>
              ))
            ) : null}
            {!newBoard ? (
              <button
                onClick={() => setNewBoard(true)}
                type="button"
                className="col-span-1 h-24 flex items-center justify-center rounded-md p-2 bg-gray-100 cursor-pointer"
              >
                <p className="text-sm">Create new board</p>
              </button>
            ) : (
              <div className="col-span-1 h-24 bg-gray-100 rounded shadow p-2 text-gray-600">
                <div className="w-full flex items-center justify-between mb-4">
                  <p className="text-sm">Create New Board</p>
                  <button
                    type="button"
                    className="w-6 h-6 rounded shadow outline-none hover:bg-gray-300 flex items-center justify-center"
                    onClick={() => setNewBoard(false)}
                  >
                    <IoCloseOutline />
                  </button>
                </div>
                <div className="w-full flex items-center">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Board name..."
                      className="bg-transparent font-semibold w-full p-1 px-2 border border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 rounded focus:bg-white"
                      value={newBoardName}
                      onChange={(e) => setNewBoardName(e.target.value)}
                    />
                  </div>
                  {createBoardLoading ? (
                    <div className="ml-2">
                      <Loader />
                    </div>
                  ) : (
                    <button
                      onClick={createBoardHandler}
                      type="button"
                      className={`ml-2 w-12 h-8 rounded flex text-sm text-white items-center justify-center font-semibold shadow ${
                        newBoardName === ''
                          ? 'bg-blue-200 cursor-not-allowed'
                          : 'bg-blue-500 hover:bg-blue-600'
                      }`}
                      disabled={newBoardName === ''}
                    >
                      Add
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Boards;
