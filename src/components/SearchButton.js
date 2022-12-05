import { useAppDispatch, useAppSelector } from '../app/hooks';
import { resetQuestions, setLoading, setInput, setTrendingClicked } from './stackoverflow/stackoverflow.slice';

const SearchButton = () => {
  const dispatch = useAppDispatch();
  const input = useAppSelector((state) => state.stackoverflow.input);
  const handleSearch = () => {
    dispatch(resetQuestions([]));
    dispatch(setLoading(true));
    dispatch(setInput(input));
    dispatch(setTrendingClicked(input));
  };
  return (
    <>
      <button
        className="w-14 h-10 absolute top-1/2 translate-y-[-50%] right-2 hover:opacity-50"
        onClick={() => {
          handleSearch();
        }}
      >
        🔍
      </button>
    </>
  );
};

export default SearchButton;
