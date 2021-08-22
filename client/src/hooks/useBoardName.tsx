import { useState, useEffect } from 'react';
import { useBoardsQuery } from '../generated/graphql';

const useBoardName = (id: string) => {
  const { data } = useBoardsQuery();
  const [boardName, setBoardName] = useState('');

  useEffect(() => {
    if (data?.boards) {
      data.boards.forEach((element) => {
        if (element._id === id) {
          setBoardName(element.boardName);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.boards]);

  return boardName;
};

export default useBoardName;
