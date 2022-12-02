import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  trending: [],
  loading: false,
  errorMessage: '',
};

export const stackoverflowSlice = createSlice({
  name: 'stackoverflow',
  initialState,
  reducers: {
    setTrending: (state, action) => {
      state.trending = action.payload;
    },
    setLoading: (state, action) => {
      state.trending = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.trending = action.payload;
    },
  },
});

export const { setTrending, setLoading, setErrorMessage } = stackoverflowSlice.actions;

export default stackoverflowSlice.reducer;
