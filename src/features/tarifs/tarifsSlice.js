// 📁 src/features/tarifs/tarifsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'http://localhost:8000/api/tarifs';

export const fetchTarifs = createAsyncThunk('tarifs/fetchTarifs', async () => {
  const response = await axios.get(apiUrl);
  return response.data;
});

export const addTarif = createAsyncThunk('tarifs/addTarif', async (tarif) => {
  const response = await axios.post(apiUrl, tarif);
  return response.data;
});

export const updateTarif = createAsyncThunk('tarifs/updateTarif', async ({ id, data }) => {
  const response = await axios.put(`${apiUrl}/${id}`, data);
  return response.data;
});

export const deleteTarif = createAsyncThunk('tarifs/deleteTarif', async (id) => {
  await axios.delete(`${apiUrl}/${id}`);
  return id;
});

const tarifsSlice = createSlice({
  name: 'tarifs',
  initialState: {
    tarifs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTarifs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTarifs.fulfilled, (state, action) => {
        state.loading = false;
        state.tarifs = action.payload;
      })
      .addCase(fetchTarifs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addTarif.fulfilled, (state, action) => {
        state.tarifs.push(action.payload);
      })
      .addCase(updateTarif.fulfilled, (state, action) => {
        const index = state.tarifs.findIndex(t => t.id_Tarif === action.payload.id_Tarif);
        if (index !== -1) state.tarifs[index] = action.payload;
      })
      .addCase(deleteTarif.fulfilled, (state, action) => {
        state.tarifs = state.tarifs.filter(t => t.id_Tarif !== action.payload);
      });
  },
});

export default tarifsSlice.reducer;