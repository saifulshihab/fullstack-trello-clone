import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useMeQuery } from '../generated/graphql';

const useIsAuth = () => {
  const router = useHistory();

  const { loading, data } = useMeQuery();

  useEffect(() => {
    if (!loading && !data?.me) {
      router.replace(`/login?next= + ${router.location.pathname}`);
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
  }, [loading, data, router]);
};

export default useIsAuth;
