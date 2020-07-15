import { createSlice } from '@reduxjs/toolkit';

export const phoneNumbersSlice = createSlice({
    name: 'phoneNumbers',
    initialState: {
        isLoading: false,
        idCounter: 0,
        numbers: [],
    },
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setNumber: (state, action) => {
            state.numbers[action.payload.id] = action.payload;
        },
        addNumber: (state, action) => {
            state.idCounter++;
            action.payload.id = state.idCounter;
            state.numbers.push(action.payload);
        },
        removeNumber: (state, action) => {
            state.numbers.remove(action.payload);
        },
    },
});

export const { setLoading, setNumber, addNumber, removeNumber } = phoneNumbersSlice.actions;

export const setNumberAsync = number => dispatch => {
    dispatch(setLoading(true));
    setTimeout(() => {
        dispatch(setNumber(number));
        dispatch(setLoading(false));
    }, 2000);
};

export const addNumberAsync = number => dispatch => {
    dispatch(setLoading(true));
    setTimeout(() => {
        dispatch(addNumber(number));
        dispatch(setLoading(false));
    }, 2000);
};

export const removeNumberAsync = number => dispatch => {
    dispatch(setLoading(true));
    setTimeout(() => {
        dispatch(removeNumber(number));
        dispatch(setLoading(false));
    }, 2000);
};

export const loadData = quantity => dispatch => {
    for (let i = 0; i < quantity; i++)
    {
        var number = {
            "value": "+55 84 91234-4321",
            "monthyPrice": "0.03",
            "setupPrice": "3.40",
            "currency": "U$"
        };
        dispatch(addNumber(number));
    }
};


export const selectNumbers = state => state.phoneNumbers.numbers;
export const selectLoading = state => state.phoneNumbers.isLoading;

export default phoneNumbersSlice.reducer;
