import { useCallback, useState } from 'react';
import {
  AiOutlinePlus,
  DiTrello,
  FaRegHeart,
  FaTrello,
  FiTrello,
  GiSoundWaves,
  HiOutlineTable,
  IoPeopleSharp,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  RiSettings5Line,
} from 'react-icons/all';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [dropDown, setDropDown] = useState(false);

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
          <div className="flex mt-5 md:space-x-3 flex-col md:flex-row space-y-2 md:space-y-0 flex-wrap">
            <div className="w-44 h-24 rounded-md p-2 bg-blue-500 cursor-pointer text-white">
              <Link to="/b/hiq24sd95de2iow02">
                <p className="font-bold truncate hover:underline">
                  fullstack-trello-clone
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
