import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="w-full mt-20 flex items-center justify-center flex-col space-y-3">
      <p className="text-3xl font-thin">
        <span className="font-semibold">404</span> | Page Not Found
      </p>
      <Link to="/boards">
        <span className="hover:underline text-blue-600">Back to Home</span>
      </Link>
    </div>
  );
};

export default PageNotFound;
