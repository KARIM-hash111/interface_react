import { configureStore } from '@reduxjs/toolkit';
import chambresReducer from '../features/chambres/chambresSlice';
import tarifsReducer from '../features/tarifs/tarifsSlice';
import chambreTarifsReducer from '../features/chambreTarifs/chambreTarifsSlice';
import reservationsReducer from '../features/reservations/reservationsSlice';

export const store = configureStore({
  reducer: {
    chambres: chambresReducer,
    tarifs: tarifsReducer,
    chambreTarifs: chambreTarifsReducer,
    reservations: reservationsReducer, 
  }
});