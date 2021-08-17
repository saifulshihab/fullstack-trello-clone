/* eslint-disable react/jsx-props-no-spreading */
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useMeQuery } from '../generated/graphql';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PrivateRouteProps extends RouteProps {}

const PrivateRoute = ({ component, ...rest }: PrivateRouteProps) => {
  const { data, loading } = useMeQuery();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!data || loading) return null;

        // user not logged in
        if (!data.me) {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { next: props.location.pathname },
              }}
            />
          );
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const Component = component as any;

        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
