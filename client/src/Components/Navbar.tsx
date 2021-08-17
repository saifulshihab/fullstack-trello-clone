import { useApolloClient } from '@apollo/client';
import { AiOutlinePlus } from 'react-icons/ai';
import {
  BiInfoCircle,
  BiLogInCircle,
  BiLogOutCircle,
  BiSearch,
} from 'react-icons/bi';
import { BsGrid3X3Gap } from 'react-icons/bs';
import { FaRegBell, FaTrello } from 'react-icons/fa';
import { VscHome } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import {
  MeDocument,
  MeQuery,
  useLogoutMutation,
  useMeQuery,
} from '../generated/graphql';

const Navbar = () => {
  const apolloClient = useApolloClient();
  const { data } = useMeQuery();
  const [logout] = useLogoutMutation();

  return (
    <div
      className="w-full h-10 p-1 text-white"
      style={{ backgroundColor: '#026AA7' }}
    >
      <div className="flex items-center">
        <div className="flex space-x-1 items-center">
          <button
            type="button"
            className="flex w-8 h-8 bg-gray-100 items-center justify-center text-xl rounded-sm bg-opacity-30 hover:bg-opacity-20"
          >
            <BsGrid3X3Gap />
          </button>
          <Link to="/">
            <button
              type="button"
              className="flex w-8 h-8 bg-gray-100 items-center justify-center text-xl rounded-sm bg-opacity-30 hover:bg-opacity-20"
            >
              <VscHome />
            </button>
          </Link>
          <Link to="/boards">
            <button
              type="button"
              className="flex h-8 bg-gray-100 items-center justify-center text-xl rounded-sm bg-opacity-30 hover:bg-opacity-20 px-2"
            >
              <FaTrello />
              <span className="ml-2 text-sm font-semibold">Boards</span>
            </button>
          </Link>
          <div className="hidden md:flex relative h-8 bg-gray-100 items-center justify-center text-xl rounded-sm bg-opacity-30 hover:bg-opacity-20 px-3">
            <input
              placeholder="Jump to..."
              className="h-full w-40 focus:w-64 text-sm outline-none bg-transparent placeholder-white"
            />
            <span className="absolute right-0 mr-1">
              <BiSearch />
            </span>
          </div>
        </div>

        <div className="h-8 flex flex-1 text-white text-opacity-50 items-center justify-center space-x-1">
          <FaTrello />
          <p className="text-xl pr-40 font-extrabold">
            Trello<span className="text-gray-600">Clone</span>
          </p>
        </div>

        <div className="ml-auto flex space-x-1 items-center">
          <button
            type="button"
            className="flex w-8 h-8 bg-gray-100 items-center justify-center text-xl rounded-sm bg-opacity-30 hover:bg-opacity-20"
          >
            <AiOutlinePlus />
          </button>
          <button
            type="button"
            className="flex w-8 h-8 bg-gray-100 items-center justify-center text-xl rounded-sm bg-opacity-30 hover:bg-opacity-20"
          >
            <FaRegBell />
          </button>
          <button
            type="button"
            className="flex w-8 h-8 bg-gray-100 items-center justify-center text-xl rounded-sm bg-opacity-30 hover:bg-opacity-20"
          >
            <BiInfoCircle />
          </button>
          {data?.me ? (
            <>
              <button
                type="button"
                className="flex w-8 h-8 items-center justify-center text-xl rounded-full bg-opacity-30 hover:bg-opacity-20"
              >
                <img
                  className="w-full h-full rounded-full"
                  src="https://picsum.photos/200"
                  alt="dp"
                />
              </button>
              <button
                type="button"
                className="flex h-8 px-2 items-center space-x-1 rounded shadow text-sm bg-red-500 hover:bg-red-600"
                onClick={async () => {
                  await logout({
                    update: (cache) => {
                      cache.writeQuery<MeQuery>({
                        query: MeDocument,
                        data: {
                          me: null,
                        },
                      });
                    },
                  });
                  await apolloClient.resetStore();
                }}
              >
                <div>
                  <BiLogOutCircle />
                </div>
                <p>Logout</p>
              </button>
            </>
          ) : (
            <Link to="/login">
              <button
                type="button"
                className="flex h-8 px-2 items-center space-x-1 rounded shadow text-sm bg-green-500 hover:bg-green-600"
              >
                <div>
                  <BiLogInCircle />
                </div>
                <p>Login</p>
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
