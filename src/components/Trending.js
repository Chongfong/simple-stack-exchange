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
      <div className="flex justify-start flex-nowrap my-1">
        {currentTrending.length > 0 &&
          currentTrending.map((trending) => (
            <Fragment key={trending.name}>
              {trending.name === trendingClicked ? (
                <button
                  onClick={() => {
                    dispatch(setTrendingClicked(trending.name));
                  }}
                  className="py-1 px-2 mx-1 rounded-xl text-white bg-sky-700 border-2 border-sky-700"
                >
                  {trending.name}
                </button>
              ) : (
                <button
                  onClick={() => {
                    dispatch(setTrendingClicked(trending.name));
                  }}
                  className="py-1 px-2 mx-1 rounded-xl bg-sky-200 border-2 border-sky-700 hover:bg-sky-700 hover:text-white"
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
