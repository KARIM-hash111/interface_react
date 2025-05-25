import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'http://localhost:8000/api/chambre_tarifs';

export const fetchChambreTarifs = createAsyncThunk('chambreTarifs/fetchAll', async () => {
  const response = await axios.get(apiUrl);
  return response.data;
});

export const addChambreTarif = createAsyncThunk('chambreTarifs/addOne', async (data) => {
  const response = await axios.post(apiUrl, data);
  return response.data;
});

export const updateChambreTarif = createAsyncThunk('chambreTarifs/updateOne', async ({ id, data }) => {
  const response = await axios.put(`${apiUrl}/${id}`, data);
  return response.data;
});

export const deleteChambreTarif = createAsyncThunk('chambreTarifs/deleteOne', async (id) => {
  await axios.delete(`${apiUrl}/${id}`);
  return id;
});

const chambreTarifsSlice = createSlice({
  name: 'chambreTarifs',
  initialState: {
    chambreTarifs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChambreTarifs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChambreTarifs.fulfilled, (state, action) => {
        state.loading = false;
        state.chambreTarifs = action.payload;
      })
      .addCase(fetchChambreTarifs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addChambreTarif.fulfilled, (state, action) => {
        state.chambreTarifs.push(action.payload);
      })
      .addCase(updateChambreTarif.fulfilled, (state, action) => {
        const index = state.chambreTarifs.findIndex(item => item.id === action.payload.id);
        if (index !== -1) state.chambreTarifs[index] = action.payload;
      })
      .addCase(deleteChambreTarif.fulfilled, (state, action) => {
        state.chambreTarifs = state.chambreTarifs.filter(item => item.id !== action.payload);
      });
  },
});

export default chambreTarifsSlice.reducer;