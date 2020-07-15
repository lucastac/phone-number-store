import { createSlice } from '@reduxjs/toolkit';

export const PhoneNumbersFilterSlice = createSlice({
    name: 'PhoneNumbersFilter',
    initialState: {
        filter:{
            id : null,
            value : null,
            monthyPrice : null,
            setupPrice : null,
            currency : null
        }
    },
    reducers: {
        setId: (state, action) => {
            state.filter.id = action.payload;
        },
        setValue: (state, action) => {
            state.filter.value = action.payload;
        },
        setMonthyPrice: (state, action) => {
            state.filter.monthyPrice = action.payload;
        },
        setSetupPrice: (state, action) => {
            state.filter.setupPrice = action.payload;
        },
        setCurrency: (state, action) => {
            state.filter.currency = action.payload;
        },
    },
});

export const { setId, setValue, setMonthyPrice, setSetupPrice, setCurrency } = PhoneNumbersFilterSlice.actions;

export const selectFilter = state => state.phoneNumbersFilter.filter;

export default PhoneNumbersFilterSlice.reducer;
