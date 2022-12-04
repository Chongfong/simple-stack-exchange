import api from '../utils/api';
import { useEffect } from 'react';
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
            key={question.question_id}
            onClick={(e) => {
              e.stopPropagation;
              window.open(`${question.link}`, '_blank');
            }}
          >
            <div>
              <div>
                <div>{question.title}</div>
              </div>
              <div>
                <div>
                  <p>Score</p>
                  <div>{question.score}</div>
                </div>
                <div>
                  <p>Answers</p>
                  <div>{question.answer_count}</div>
                  <div>{question.is_answered === true ? 'ture' : 'false'}</div>
                </div>
                <div>
                  <p>Viewed</p>
                  <div>{question.view_count}</div>
                </div>
              </div>
            </div>
            <div>
              <div>
                <img src={question.owner.profile_image} />
              </div>
              <div>{question.owner.display_name}</div>
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
