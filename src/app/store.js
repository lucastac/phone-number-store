import { configureStore } from '@reduxjs/toolkit';
import phoneNumbersReducer from '../features/phone-numbers/phoneNumbersSlice';
import phoneNumbersFilterReducer from '../features/phone-numbers-filter/phoneNumbersFilterSlice';
import counterReducer from '../features/counter/counterSlice';

export default configureStore({
  reducer: {
    phoneNumbers: phoneNumbersReducer,
    phoneNumbersFilter: phoneNumbersFilterReducer,
    counter: counterReducer,
  },
});
