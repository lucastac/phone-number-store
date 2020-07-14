import { createSlice } from '@reduxjs/toolkit';

export const phoneNumbersSlice = createSlice({
  name: 'phoneNumbers',
  initialState: {
    isLoading: false,
    numbers: [
        {
            "id": 0,
            "value": "+55 84 91234-4321",
            "monthyPrice": "0.03",
            "setupPrice": "3.40",
            "currency": "U$"
        },
        {
            "id": 1,
            "value": "+55 84 91234-4321",
            "monthyPrice": "0.03",
            "setupPrice": "3.40",
            "currency": "U$"
        },
        {
            "id": 2,
            "value": "+55 84 91234-4321",
            "monthyPrice": "0.03",
            "setupPrice": "3.40",
            "currency": "U$"
        },
        {
            "id": 3,
            "value": "+55 84 91234-4321",
            "monthyPrice": "0.03",
            "setupPrice": "3.40",
            "currency": "U$"
        },
        {
            "id": 4,
            "value": "+55 84 91234-4321",
            "monthyPrice": "0.03",
            "setupPrice": "3.40",
            "currency": "U$"
        },
        {
            "id": 5,
            "value": "+55 84 91234-4321",
            "monthyPrice": "0.03",
            "setupPrice": "3.40",
            "currency": "U$"
        }
    ],
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setNumber: (state, action) => {
      state.numbers[action.payload.id] = action.payload;
    },
    addNumber: (state, action) => {
      state.numbers.push(action.payload);
    },
    removeNumber: (state, action) => {
      state.numbers.remove(action.payload);
    },
  },
});

export const { setLoading, setNumber, addNumber, removeNumber } = phoneNumbersSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const setNumberAsync = number => dispatch => {
  setLoading(true);
  setTimeout(() => {
    dispatch(setNumber(number));
    setLoading(false);
  }, 2000);
};

export const addNumberAsync = number => dispatch => {
    setLoading(true);
    setTimeout(() => {
      dispatch(addNumber(number));
      setLoading(false);
    }, 2000);
  };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectNumbers = state => state.phoneNumbers.numbers;
export const selectLoading = state => state.phoneNumbers.isLoading;

export default phoneNumbersSlice.reducer;
