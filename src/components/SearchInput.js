import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  setTrendingClicked,
  setErrorMessage,
  resetQuestions,
  setLoading,
  setInput,
} from './stackoverflow/stackoverflow.slice';
import { useState } from 'react';

export const SearchInput = () => {
  const currentTrending = useAppSelector((state) => state.stackoverflow.trending);
  const dispatch = useAppDispatch();
  const [inputFocus, setInputFocus] = useState(false);
  const input = useAppSelector((state) => state.stackoverflow.input);
  const trendingIsClicked = useAppSelector((state) => state.stackoverflow.trendingClicked);
  const [trending] = useState(
    currentTrending.filter((value, index, self) => index === self.findIndex((t) => t.name === value.name))
  );

  const handleChange = (e) => {
    dispatch(setErrorMessage(''));
    dispatch(setInput(e.target.value));
  };
  const handleKeyboardEvent = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (trending !== input) {
        dispatch(setTrendingClicked(input));
        dispatch(resetQuestions([]));
        dispatch(setLoading(true));
      }
    }
  };
  const handleFocus = () => {
    setInputFocus(true);
  };
  const handleFocusOut = () => {
    if (trendingIsClicked) {
      setInputFocus(false);
    }
  };
  return (
    <>
      <input
        className="w-3/5 h-14 mx-5 border-sky-200 border-4 rounded-l-lg p-3 focus:outline-none"
        value={input}
        placeholder="search a trending"
        onChange={handleChange}
        onKeyDown={handleKeyboardEvent}
        onFocus={handleFocus}
        onBlur={() => {
          setTimeout(handleFocusOut, 500);
        }}
      ></input>
      <div className="w-full h-auto text-left text-stone-600 rounded-b-3xl relative top-[-10px] py-3 pl-6">
        {inputFocus &&
          currentTrending
            .filter((a) => a.name.slice(0, input.length).toLowerCase() === input.toLowerCase())
            .slice(0, 5)
            .map((e) => (
              <div
                className="my-1 hover:bg-gray-300 hover:cursor-pointer hover:text-stone-800 hover:font-bold pl-3 rounded-lg"
                key={e.id}
              >
                <div
                  onClick={() => {
                    dispatch(resetQuestions([]));
                    dispatch(setLoading(true));
                    dispatch(setInput(e.name));
                    dispatch(setTrendingClicked(e.name));
                  }}
                >{`${e.name}`}</div>
              </div>
            ))}
      </div>
    </>
  );
};

export default SearchInput;
