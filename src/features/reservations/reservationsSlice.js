// 📁 src/features/reservations/reservationsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'http://localhost:8000/api/reservations';

export const fetchReservations = createAsyncThunk('reservations/fetchAll', async () => {
  const response = await axios.get(apiUrl);
  return response.data;
});

export const addReservation = createAsyncThunk('reservations/addOne', async (data) => {
  const response = await axios.post(apiUrl, data);
  return response.data;
});

export const updateReservation = createAsyncThunk('reservations/updateOne', async ({ id, data }) => {
  const response = await axios.put(`${apiUrl}/${id}`, data);
  return response.data;
});

export const deleteReservation = createAsyncThunk('reservations/deleteOne', async (id) => {
  await axios.delete(`${apiUrl}/${id}`);
  return id;
});

const reservationsSlice = createSlice({
  name: 'reservations',
  initialState: {
    reservations: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReservations.fulfilled, (state, action) => {
        state.loading = false;
        state.reservations = action.payload;
      })
      .addCase(fetchReservations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addReservation.fulfilled, (state, action) => {
        state.reservations.push(action.payload);
      })
      .addCase(updateReservation.fulfilled, (state, action) => {
        const index = state.reservations.findIndex(item => item.id === action.payload.id);
        if (index !== -1) state.reservations[index] = action.payload;
      })
      .addCase(deleteReservation.fulfilled, (state, action) => {
        state.reservations = state.reservations.filter(item => item.id !== action.payload);
      });
  },
});

export default reservationsSlice.reducer;