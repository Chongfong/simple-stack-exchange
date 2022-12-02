import { configureStore } from '@reduxjs/toolkit';
import stackoverflowReducer from '../components/stackoverflow/stackoverflow.slice';

const store = configureStore({
  reducer: {
    stackoverflow: stackoverflowReducer,
  },
});

export default store;
