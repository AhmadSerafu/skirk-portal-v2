import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../../constants/url";

const initialState = {
  data: [],
  loading: false,
  error: "",
};

export const buildsSlice = createSlice({
  name: "builds",
  initialState,
  reducers: {
    fetchPending: (state) => {
      state.data = initialState.data;
      state.loading = true;
      state.error = initialState.error;
    },
    fetchSuccess: (state, action) => {
      state.data = action.payload;
      state.loading = initialState.loading;
      state.error = initialState.error;
    },
    fetchFailed: (state, action) => {
      state.data = initialState.data;
      state.loading = initialState.loading;
      state.error = action.payload;
    },
  },
});

export const { fetchPending, fetchSuccess, fetchFailed } = buildsSlice.actions;

export const fetchBuilds = () => async (dispatch) => {
  try {
    dispatch(fetchPending());
    const { data } = await axios.get(`${url}/builds`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    dispatch(fetchSuccess(data));
  } catch (error) {
    dispatch(fetchFailed(error.message));
  }
};

export const buildsReducer = buildsSlice.reducer;
