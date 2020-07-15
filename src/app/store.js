import { configureStore } from '@reduxjs/toolkit';
import phoneNumbersReducer from '../features/phone-numbers/phoneNumbersSlice';

export default configureStore({
  reducer: {
    phoneNumbers: phoneNumbersReducer
  },
});
