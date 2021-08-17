import React from 'react';

const LandingPage = () => {
  return (
    <div className="w-full h-full">
      <div className="w-full p-5 flex flex-col space-y-5 md:space-y-0 md:flex-row md:justify-between">
        <div className="w-full md:flex-1">
          <div className="w-full h-full">
            <p className="font-extrabold text-7xl text-gray-800">
              Trello Board Clone
            </p>
            <div className="mt-5">
              <div className="font-thin text-3xl">
                <ul>
                  <li>User Login/Register</li>
                  <li>Create Board</li>
                  <li>Create Card</li>
                  <li>Edit/Delete Card</li>
                  <li>Drag n Drop Card</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:flex-1">
          <img
            className="w-full h-full rounded-md shadow"
            src="https://mir-cdn.behance.net/v1/rendition/project_modules/1400/7109ed125194285.6113ed6716889.png"
            alt="img"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
