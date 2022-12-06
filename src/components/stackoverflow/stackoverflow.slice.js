import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  trending: [],
  trendingClicked: '',
  isLoading: true,
  errorMessage: '',
  questions: [],
  page: 1,
  input: '',
};

export const stackoverflowSlice = createSlice({
  name: 'stackoverflow',
  initialState,
  reducers: {
    setTrending: (state, action) => {
      state.trending = action.payload;
    },
    setTrendingClicked: (state, action) => {
      state.trendingClicked = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setQuestions: (state, action) => {
      state.questions = state.questions.slice().concat(action.payload);
    },
    resetQuestions: (state, action) => {
      state.questions = action.payload;
    },
    setPage: (state) => {
      state.page = state.page + 1;
    },
    resetPage: (state, action) => {
      state.page = action.payload;
    },
    setInput: (state, action) => {
      state.input = action.payload;
    },
  },
});

export const {
  setTrending,
  setTrendingClicked,
  setLoading,
  setErrorMessage,
  setQuestions,
  setPage,
  resetQuestions,
  resetPage,
  setInput,
} = stackoverflowSlice.actions;

export default stackoverflowSlice.reducer;
