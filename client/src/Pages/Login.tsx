import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className="w-80 mt-5 mx-auto">
      <div className="w-full flex items-center justify-center text-gray-700">
        <p className="text-2xl font-extrabold">
          Trello<span className="text-blue-600">Clone</span> Login
        </p>
      </div>
      <form className="w-full mt-3" onSubmit={submitHandler}>
        <input
          type="text"
          className="appearance-none rounded relative block w-full px-3 py-2 border-2 border-blue-200 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Username or email"
          required
        />
        <input
          type="password"
          className="appearance-none mt-2 rounded relative block w-full px-3 py-2 border-2 border-blue-200 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Password"
          required
        />
        <div className="mt-2 w-full flex items-center justify-end">
          <Link to="/register">
            <p className="text-xs font-semibold text-blue-600">
              Not Registered?
            </p>
          </Link>
        </div>
        <button
          type="submit"
          className="mt-2 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white  'bg-indigo-600'
              bg-blue-600 focus:outline-none"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
