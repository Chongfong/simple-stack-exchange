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
            className="flex flex-nowrap py-4 border-b-2 border-sky-200"
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
                <div className="w-1/3">
                  <p>Score</p>
                  <div>{question.score}</div>
                </div>
                <div className="w-1/3">
                  <p>Answers</p>
                  <div>{question.answer_count}</div>
                  <div>{question.is_answered === true ? 'ture' : 'false'}</div>
                </div>
                <div className="w-1/3">
                  <p>Viewed</p>
                  <div>{question.view_count}</div>
                </div>
              </div>
            </div>
            <div className="w-1/5 flex flex-wrap text-center">
              <div className="w-full">
                <img src={question.owner.profile_image} className="rounded-full w-20 h-20 mx-auto" />
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
