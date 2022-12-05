import React from 'react';
import Trending from './components/Trending';
import QuestionList from './components/QuestionList';
import SearchInput from './components/SearchInput';
import { Provider } from 'react-redux';
import store from './app/store';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="w-5/6 md:w-4/5 mx-auto relative mb-20">
        <header className="bg-[rgba(255,255,255,0.8)] fixed w-full">
          <SearchInput />
          <Trending />
        </header>
        <QuestionList />
      </div>
    </Provider>
  );
}

export default App;
