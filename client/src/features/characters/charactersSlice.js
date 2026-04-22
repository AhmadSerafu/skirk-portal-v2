import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../../constants/url";

const initialState = {
  data: [],
  loading: false,
  error: "",
};

export const charactersSlice = createSlice({
  name: "characters",
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

export const { fetchPending, fetchSuccess, fetchFailed } =
  charactersSlice.actions;

export const fetchCharacters =
  (params = {}) =>
  async (dispatch) => {
    try {
      dispatch(fetchPending());
      const { data } = await axios.get(`${url}/characters`, { params });
      dispatch(fetchSuccess(data));
    } catch (error) {
      dispatch(fetchFailed(error.message));
    }
  };

export const charactersReducer = charactersSlice.reducer;
