import { Formik } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import InputField from '../Components/InputField';
import { MeDocument, MeQuery, useLoginMutation } from '../generated/graphql';
import toErrorMap from '../utils/toErrorMap';

interface CustomLocationProps {
  next?: string;
}

const Login = () => {
  const history = useHistory();

  const [login, { loading }] = useLoginMutation();

  return (
    <div className="w-80 mt-5 mx-auto">
      <div className="w-full flex items-center justify-center text-gray-700">
        <p className="text-2xl font-extrabold">
          Trello<span className="text-blue-600">Clone</span> Login
        </p>
      </div>
      <Formik
        initialValues={{
          usernameOrEmail: '',
          password: '',
        }}
        // eslint-disable-next-line consistent-return
        onSubmit={async (values, { setErrors }) => {
          const response = await login({
            variables: values,
            update: (cache, { data }) => {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  me: data?.login.user,
                },
              });
            },
          });
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data?.login.errors));
          } else {
            const { state } = history.location;
            if (state) {
              const { next } = state as CustomLocationProps;
              if (next && next) {
                return history.push(next);
              }
            }
            history.push('/boards');
          }
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <form className="w-full mt-3" onSubmit={handleSubmit}>
            <InputField
              type="text"
              name="usernameOrEmail"
              placeholder="Username or email"
            />
            <InputField
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="password"
            />
            <div className="mt-2 w-full flex items-center justify-end">
              <Link to="/register">
                <p className="text-xs font-semibold text-blue-600">
                  Not Registered?
                </p>
              </Link>
            </div>
            <button
              disabled={isSubmitting}
              type="submit"
              className="mt-2 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white  'bg-indigo-600'
              bg-blue-600 focus:outline-none"
            >
              Login {loading && '...'}
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
