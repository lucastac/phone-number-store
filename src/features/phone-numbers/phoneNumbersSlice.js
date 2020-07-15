import { createSlice } from '@reduxjs/toolkit';
import ApiHandler from '../api-handler/ApiHander';

export const phoneNumbersSlice = createSlice({
    name: 'phoneNumbers',
    initialState: {
        isLoading: false, // Informs that the data is currently loading
        refreshData: 0, // Informs that the list view should be refreshed
        numbers: [], // Array with filtered numbers
        pagination: { // Pagination data
            total: 0, // Total length withou the pagination
            pageSelect:{
                page: 1, // Currently delected page
                perPage: 10 // Length per page
            }
        },
        filter:{ // Filter data
            id : null,
            value : null,
            monthyPrice : null,
            setupPrice : null,
            currency : null
        }
    },
    reducers: {
        setRefreshData: (state) => {
            state.refreshData = 1- state.refreshData;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setNumberList: (state, action) => {
            state.numbers = action.payload;
        },
        setPaginationPage: (state, action) => {
            state.pagination.pageSelect.page = action.payload;
        },
        setPaginationPerPage: (state, action) => {
            state.pagination.pageSelect.perPage = action.payload;
        },
        setPaginationTotal: (state, action) => {
            state.pagination.total = action.payload;
        },
        setFilterId: (state, action) => {
            state.filter.id = action.payload;
        },
        setFilterValue: (state, action) => {
            state.filter.value = action.payload;
        },
        setFilterMonthyPrice: (state, action) => {
            state.filter.monthyPrice = action.payload;
        },
        setFilterSetupPrice: (state, action) => {
            state.filter.setupPrice = action.payload;
        },
        setFilterCurrency: (state, action) => {
            state.filter.currency = action.payload;
        },
    },
});

export const { 
    setLoading,
    setNumberList,
    setRefreshData,
    setPaginationTotal,
    setPaginationPage,
    setPaginationPerPage,
    setFilterId,
    setFilterValue,
    setFilterMonthyPrice,
    setFilterSetupPrice,
    setFilterCurrency
} = phoneNumbersSlice.actions;

// Creates a new Number on the server and set the to refresh the data
export const createNumberServer = number => dispatch => {
    dispatch(setLoading(true));
    ApiHandler.createNumber(number).then(()=>{
        dispatch(setRefreshData());
        dispatch(setLoading(false));
    });
};

// Updates a Number on the server and set the to refresh the data
export const updateNumberServer = number => dispatch => {
    dispatch(setLoading(true));
    ApiHandler.updateNumber(number).then(()=>{
        dispatch(setRefreshData());
        dispatch(setLoading(false));
    });
};

// Removes a Number on the server and set the to refresh the data
export const removeNumberServer = number => dispatch => {
    dispatch(setLoading(true));
    ApiHandler.deleteNumber(number).then(()=>{
        dispatch(setRefreshData());
        dispatch(setLoading(false));
    });
};

// Get all numbers that matchs filtering and pagination criteria
export const retrieveNumbers = (filter, pagination) => dispatch => {
    dispatch(setLoading(true));
    ApiHandler.getNumbers(filter, pagination).then((response)=>{
        dispatch(setPaginationTotal(response.pagination.total));
        dispatch(setNumberList(response.data));
        dispatch(setLoading(false));
    });  
};

// Selectors
export const selectNumbers = state => state.phoneNumbers.numbers;
export const selectRefreshData = state => state.phoneNumbers.refreshData;
export const selectFilter = state => state.phoneNumbers.filter;
export const selectPagination = state => state.phoneNumbers.pagination;
export const selectPaginationPageSelect = state => state.phoneNumbers.pagination.pageSelect;
export const selectLoading = state => state.phoneNumbers.isLoading;

export default phoneNumbersSlice.reducer;
