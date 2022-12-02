import api from '../utils/api';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setTrending, setLoading, setErrorMessage } from './stackoverflow/stackoverflow.slice';
import { Fragment, useEffect } from 'react';

const Trending = () => {
  const currentTrending = useAppSelector((state) => state.stackoverflow.trending);
  const dispatch = useAppDispatch();

  const handleFetch = async () => {
    api
      .getTrending()
      .then((json) => {
        if (json.length === 0) {
          dispatch(setLoading(false));
          dispatch(setErrorMessage('No such data'));
        } else {
          return json;
        }
      })
      .then((trending) => {
        dispatch(setTrending(trending.items));
      });
  };
  useEffect(() => {
    {
      handleFetch();
    }
  }, []);
  return (
    <>
      <p>Trending</p>
      <div>
        {currentTrending.length > 0 &&
          currentTrending.map((trending) => (
            <Fragment key={trending.name}>
              <button>{trending.name}</button>
            </Fragment>
          ))}
      </div>
    </>
  );
};

export default Trending;
