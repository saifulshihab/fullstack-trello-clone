/* eslint-disable react/jsx-props-no-spreading */
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useMeQuery } from '../generated/graphql';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PrivateRouteProps extends RouteProps {}

const PrivateRoute = ({ ...rest }: PrivateRouteProps) => {
  const { data: meData } = useMeQuery();

  if (!meData?.me) return <Redirect to="/login" />;
  return <Route {...rest} />;
};
export default PrivateRoute;
