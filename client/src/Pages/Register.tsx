import React from 'react';

const Register = () => {
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className="w-80 mt-5 mx-auto">
      <div className="w-full flex items-center justify-center text-gray-700">
        <p className="text-2xl font-extrabold">
          Trello<span className="text-blue-600">Clone</span> Registration
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
        <button
          type="submit"
          className="mt-3 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white  'bg-indigo-600'
              bg-blue-600 focus:outline-none"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
