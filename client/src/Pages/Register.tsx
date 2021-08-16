import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import InputField from '../Components/InputField';
import { MeQuery, MeDocument, useRegisterMutation } from '../generated/graphql';
import toErrorMap from '../utils/toErrorMap';

const Register = () => {
  const history = useHistory();
  const [register, { loading }] = useRegisterMutation();
  return (
    <div className="w-80 mt-5 mx-auto">
      <div className="w-full flex items-center justify-center text-gray-700">
        <p className="text-2xl font-extrabold">
          Trello<span className="text-blue-600">Clone</span> Registration
        </p>
      </div>
      <Formik
        initialValues={{
          email: '',
          username: '',
          password: '',
        }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({
            variables: { registerInput: values },
            update: (cache, { data }) => {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  me: data?.register.user,
                },
              });
            },
          });
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data?.register.errors));
          } else {
            history.push('/boards');
          }
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <form className="w-full mt-3" onSubmit={handleSubmit}>
            <InputField
              type="text"
              name="email"
              placeholder="Enter your email"
            />
            <InputField
              type="text"
              name="username"
              placeholder="Choose a username"
            />
            <InputField
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="password"
            />
            <button
              disabled={isSubmitting}
              type="submit"
              className="mt-2 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white  'bg-indigo-600'
              bg-blue-600 focus:outline-none"
            >
              Register {loading && '...'}
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
