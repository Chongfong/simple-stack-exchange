import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  trending: [],
  trendingClicked: '',
  isLoading: true,
  errorMessage: '',
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
  },
});

export const { setTrending, setTrendingClicked, setLoading, setErrorMessage } = stackoverflowSlice.actions;

export default stackoverflowSlice.reducer;
