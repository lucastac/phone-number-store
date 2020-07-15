import { configureStore } from '@reduxjs/toolkit';
import phoneNumbersReducer from '../features/phone-numbers/phoneNumbersSlice';
import counterReducer from '../features/counter/counterSlice';

export default configureStore({
  reducer: {
    phoneNumbers: phoneNumbersReducer,
    counter: counterReducer,
  },
});
