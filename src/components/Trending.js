import api from '../utils/api';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setTrending, setTrendingClicked, setLoading, setErrorMessage } from './stackoverflow/stackoverflow.slice';
import { Fragment, useEffect } from 'react';

const Trending = () => {
  const currentTrending = useAppSelector((state) => state.stackoverflow.trending);
  const trendingClicked = useAppSelector((state) => state.stackoverflow.trendingClicked);
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
        dispatch(setTrendingClicked(trending.items[0].name));
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
              {trending.name === trendingClicked ? (
                <button
                  onClick={() => {
                    dispatch(setTrendingClicked(trending.name));
                  }}
                  className="text-white bg-sky-700"
                >
                  {trending.name}
                </button>
              ) : (
                <button
                  onClick={() => {
                    dispatch(setTrendingClicked(trending.name));
                  }}
                  className="bg-sky-200"
                >
                  {trending.name}
                </button>
              )}
            </Fragment>
          ))}
      </div>
    </>
  );
};

export default Trending;
