import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiErrorResponse, ApiResponse } from "../constants/globalType";

import { fetchAll as fetchAllPractitioners } from "../services/practitioner.service";

interface practitionerState {
  practitioners: any;
  loading: boolean;
  error: ApiErrorResponse;
}

const initialState: practitionerState = {
  practitioners: [],
  loading: false,
  error: {
    data: {
      info: "",
    },
    message: "",
    status: 500,
  },
};

export const fetchPractitioners = createAsyncThunk(
  "practitioners/fetchAllPractitioners",
  () => {
    return fetchAllPractitioners();
  }
);

const practitionerSlice = createSlice({
  name: "practitioner",
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPractitioners.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      fetchPractitioners.fulfilled,
      (state, action: PayloadAction<ApiResponse>) => {
        state.loading = false;
        state.practitioners = action.payload.data;
      }
    );

    builder.addCase(
      fetchPractitioners.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.practitioners = [];

        state.error = {
          data: {
            info: action.payload.data.info,
          },
          message: action.payload.message,
          status: action.payload.status,
        };
      }
    );
  },
});

export default practitionerSlice.reducer;
