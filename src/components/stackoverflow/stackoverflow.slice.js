import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../utils/api';

const initialState = {
  trending: [],
  trendingClicked: '',
  isLoading: true,
  errorMessage: '',
  questions: [],
  page: 1,
  input: '',
};

export const fetchQuestions = createAsyncThunk('stackoverflow/getQuestions', async (props) => {
  const { currentPage, trendingClicked } = props;
  const response = await api.getQuestions(currentPage, trendingClicked);
  return response.items;
});

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload?.length === 0) {
          state.questions = [];
          state.errorMessage = 'No Data';
        } else {
          state.questions = state.questions.slice().concat(action.payload);
        }
      })
      .addCase(fetchQuestions.rejected, (state) => {
        state.isLoading = false;
        state.questions = [];
        state.errorMessage = 'No Data';
      });
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
