import api from '../utils/api';
import { Fragment, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setLoading, setErrorMessage, setQuestions } from './stackoverflow/stackoverflow.slice';
import Loader from './Loader';

const QuestionList = () => {
  const currentQuestion = useAppSelector((state) => state.stackoverflow.questions);
  const trendingClicked = useAppSelector((state) => state.stackoverflow.trendingClicked);
  const isLoading = useAppSelector((state) => state.stackoverflow.isLoading);
  const errorMessage = useAppSelector((state) => state.stackoverflow.errorMessage);
  const dispatch = useAppDispatch();
  const fetchData = async () => {
    api
      .getQuestions(1, trendingClicked)
      .then((json) => {
        if (json.length === 0) {
          dispatch(setLoading(false));
          dispatch(setErrorMessage('No such data'));
        } else {
          return json;
        }
      })
      .then((questions) => {
        dispatch(setQuestions(questions.items));
      });
  };

  useEffect(() => {
    fetchData();
  }, [trendingClicked]);
  return (
    <>
      {currentQuestion.length > 0 ? (
        currentQuestion.map((question) => (
          <div
            className="flex flex-nowrap py-4 border-b-2 border-sky-200 hover:opacity-60 hover:cursor-pointer"
            key={question.question_id}
            onClick={(e) => {
              e.stopPropagation;
              window.open(`${question.link}`, '_blank');
            }}
          >
            <div className="w-4/5 flex flex-wrap">
              <div className="w-full">
                <div>{question.title}</div>
              </div>
              <div className="w-full justify-evenly flex flex-nowrap">
                <div className="w-1/3 text-center">
                  <p className="text-red-700 font-bold pt-1">Score</p>
                  <div className={`text-center ${question.score < 0 && 'text-red-500'}`}>{question.score}</div>
                </div>
                <div className="w-1/3 text-center">
                  <p className="text-red-700 font-bold pt-1">Answers</p>
                  <div
                    className={`mx-auto w-16 text-center ${
                      question.answer_count > 0 && question.is_answered === true
                        ? 'bg-green-600 text-white'
                        : question.answer_count > 0 && 'border-green-600 border-2 text-green-600'
                    }`}
                  >
                    {question.answer_count}
                  </div>
                </div>
                <div className="w-1/3 text-center">
                  <p className="text-red-700 font-bold pt-1">Viewed</p>
                  <div className="text-center">{question.view_count}</div>
                </div>
              </div>
            </div>
            <div className="w-1/5 flex flex-wrap text-center">
              <div className="w-full">
                <img src={question.owner.profile_image} className="rounded-full w-16 h-16 mx-auto" />
              </div>
              <div className="w-full">{question.owner.display_name}</div>
            </div>
          </div>
        ))
      ) : (
        <>
          {isLoading && <Loader />}
          <p className="h-10 my-10 text-slate-700 font-bold">{errorMessage}</p>
        </>
      )}
    </>
  );
};
export default QuestionList;
