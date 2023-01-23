import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  ApiErrorResponse,
  ApiResponse,
  Practitioner,
} from "../constants/globalType";

import {
  fetchAll as fetchAllPractitioners,
  create,
  edit,
  remove,
} from "../services/practitioner.service";

interface practitionerState {
  practitioners: any;
  loading: boolean;
  isAdding: boolean;
  isEditing: boolean;
  error: ApiErrorResponse;
}

const initialState: practitionerState = {
  practitioners: [],
  loading: false,
  isAdding: false,
  isEditing: false,
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
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchAllPractitioners();
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createPractitioner = createAsyncThunk(
  "practitioners/createPractitioner",
  async (payload: object, { rejectWithValue }) => {
    try {
      const response = await create(payload);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const editPractitioner = createAsyncThunk(
  "practitioners/editPractitioner",
  async (data: any, { rejectWithValue }) => {
    try {
      const { id, ...payload } = data;

      const response = await edit(id, payload);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const removePractitioner = createAsyncThunk(
  "practitioners/removePractitioner",
  async (id: any, { rejectWithValue }) => {
    try {
      const res = await remove(id);
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const practitionerSlice = createSlice({
  name: "practitioner",
  initialState,

  reducers: {
    addPractitioner: (state, action) => {
      state.practitioners.push(action.payload.data);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPractitioners.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      fetchPractitioners.fulfilled,
      (state, action: PayloadAction<ApiResponse>) => {
        state.loading = false;

        console.log(action.payload);
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

    builder.addCase(createPractitioner.pending, (state) => {
      state.isAdding = true;
    });

    builder.addCase(createPractitioner.fulfilled, (state, action: any) => {
      state.isAdding = false;
      state.practitioners = [...state.practitioners, action.payload.data];
    });

    builder.addCase(createPractitioner.rejected, (state, action: any) => {
      state.isAdding = false;
      state.error = action.payload;
    });

    builder.addCase(editPractitioner.pending, (state) => {
      state.isEditing = true;
    });

    builder.addCase(editPractitioner.fulfilled, (state, action: any) => {
      state.isEditing = false;

      const { data } = action.payload;

      state.practitioners = state.practitioners.map((item: Practitioner) => {
        if (item.id === data.id) {
          return {
            ...item,
            ...data,
          };
        }
        return item;
      });
    });

    builder.addCase(editPractitioner.rejected, (state, action: any) => {
      state.isEditing = false;
      state.error = action.payload;
    });

    builder.addCase(removePractitioner.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(removePractitioner.fulfilled, (state, action: any) => {
      state.loading = false;

      const { id } = action.payload.data.info;

      state.practitioners = state.practitioners.filter(
        (item: Practitioner) => item.id !== +id
      );
    });

    builder.addCase(removePractitioner.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default practitionerSlice.reducer;
