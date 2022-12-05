import api from '../utils/api';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  setTrending,
  setTrendingClicked,
  setLoading,
  setErrorMessage,
  resetPage,
  setInput,
} from './stackoverflow/stackoverflow.slice';
import Loader from './Loader';
import { Fragment, useEffect } from 'react';

const Trending = () => {
  const currentTrending = useAppSelector((state) => state.stackoverflow.trending);
  const trendingClicked = useAppSelector((state) => state.stackoverflow.trendingClicked);
  const isLoading = useAppSelector((state) => state.stackoverflow.isLoading);
  const errorMessage = useAppSelector((state) => state.stackoverflow.errorMessage);
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
        dispatch(setTrendingClicked(String(trending.items[0].name)));
        dispatch(setInput(String(trending.items[0].name)));
      });
  };
  useEffect(() => {
    {
      handleFetch();
    }
  }, []);
  return (
    <div className="bg-[rgba(255,255,255,0.8)] w-full">
      <p className="text-slate-700 text-2xl">Trending</p>
      <div className="flex w-full justify-start flex-wrap my-1 gap-x-0.5 gap-y-1 text-xs md:text-base">
        {currentTrending.length > 0 ? (
          currentTrending.slice(0, 10).map((trending) => (
            <Fragment key={trending.name}>
              {trending.name === trendingClicked ? (
                <button
                  onClick={() => {
                    dispatch(setTrendingClicked(trending.name));
                    dispatch(setInput(trending.name));
                    dispatch(resetPage(1));
                  }}
                  className="py-1 px-2 mx-1 rounded-xl text-white bg-sky-700 border-2 border-sky-700"
                >
                  {trending.name}
                </button>
              ) : (
                <button
                  onClick={() => {
                    dispatch(setTrendingClicked(trending.name));
                    dispatch(setInput(trending.name));
                    dispatch(resetPage(1));
                  }}
                  className="py-1 px-2 mx-1 rounded-xl text-slate-700 bg-sky-200 border-2 border-sky-700 hover:bg-sky-700 hover:text-white"
                >
                  {trending.name}
                </button>
              )}
            </Fragment>
          ))
        ) : (
          <>
            {isLoading && <Loader />}
            <p className="my-10 text-slate-700 font-bold">{errorMessage}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Trending;
