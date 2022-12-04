import React from 'react';
import Trending from './components/Trending';
import QuestionList from './components/QuestionList';
import { Provider } from 'react-redux';
import store from './app/store';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="w-11/12 md:w-4/5 mx-auto ">
        <header>
          <Trending />
          <QuestionList />
        </header>
      </div>
    </Provider>
  );
}

export default App;
