import React from 'react';
import Trending from './components/Trending';
import QuestionList from './components/QuestionList';
import SearchInput from './components/SearchInput';
import SearchButton from './components/SearchButton';
import { Provider } from 'react-redux';
import store from './app/store';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="w-5/6 md:w-4/5 mx-auto relative mb-20">
        <header className="bg-[rgba(255,255,255,0.8)] fixed w-5/6 md:w-4/5 h-[330px] md:h-[305px] pt-2.5">
          <div className="w-full md:min-w-[500px] h-14 rounded-2xl bg-white flex flex-wrap content-start relative">
            <SearchInput />
            <SearchButton />
            <Trending />
          </div>
        </header>
        <QuestionList />
      </div>
    </Provider>
  );
}

export default App;
