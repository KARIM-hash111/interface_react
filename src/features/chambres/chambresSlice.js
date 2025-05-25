import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'http://localhost:8000/api/chambres';

export const fetchChambres = createAsyncThunk('chambres/fetchChambres', async () => {
  const response = await axios.get(apiUrl);
  return response.data;
});

export const addChambre = createAsyncThunk('chambres/addChambre', async (chambre) => {
  const response = await axios.post(apiUrl, chambre);
  return response.data;
});

export const updateChambre = createAsyncThunk('chambres/updateChambre', async ({ id, data }) => {
  const response = await axios.put(`${apiUrl}/${id}`, data);
  return response.data;
});

export const deleteChambre = createAsyncThunk('chambres/deleteChambre', async (id) => {
  await axios.delete(`${apiUrl}/${id}`);
  return id;
});

const chambresSlice = createSlice({
  name: 'chambres',
  initialState: {
    chambres: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChambres.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChambres.fulfilled, (state, action) => {
        state.loading = false;
        state.chambres = action.payload;
      })
      .addCase(fetchChambres.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addChambre.fulfilled, (state, action) => {
        state.chambres.push(action.payload);
      })
      .addCase(updateChambre.fulfilled, (state, action) => {
        const index = state.chambres.findIndex(c => c.id === action.payload.id);
        if (index !== -1) state.chambres[index] = action.payload;
      })
      .addCase(deleteChambre.fulfilled, (state, action) => {
        state.chambres = state.chambres.filter(c => c.id !== action.payload);
      });
  },
});

export default chambresSlice.reducer;