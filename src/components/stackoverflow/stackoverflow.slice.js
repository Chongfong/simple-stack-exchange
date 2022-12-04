import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  trending: [],
  trendingClicked: '',
  isLoading: true,
  errorMessage: '',
  questions: [],
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
      state.questions = action.payload;
    },
  },
});

export const { setTrending, setTrendingClicked, setLoading, setErrorMessage, setQuestions } =
  stackoverflowSlice.actions;

export default stackoverflowSlice.reducer;
