import React from 'react';
import Trending from './components/Trending';
import { Provider } from 'react-redux';
import store from './app/store';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div>
        <header>
          <Trending />
        </header>
      </div>
    </Provider>
  );
}

export default App;
