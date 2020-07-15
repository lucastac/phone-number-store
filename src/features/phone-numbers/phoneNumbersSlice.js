import { createSlice } from '@reduxjs/toolkit';

export const phoneNumbersSlice = createSlice({
    name: 'phoneNumbers',
    initialState: {
        isLoading: false,
        isSaving: false,
        refreshData: 0,
        numbers: [],
        pagination: {
            total: 0,
            pageSelect:{
                page: 1,
                perPage: 10
            }
        },
        filter:{
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
        setSaving: (state, action) => {
            state.isSaving = action.payload;
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
    setSaving,
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

const generateRandomNumber = (size, min, max) => {
    var s = "";
    for(var i = 0; i < size; i++)
    {
        var delta = max - min;
        var n = Math.floor(Math.random() * delta) + min;
        s = s + n;
    }
    return s;
};

const populateStorageWithRandomNumbers = (quantity) => {

    var allNumbers = {};
    for (let i = 0; i < quantity; i++)
    {
        var currency = "";
        var currencyId = Math.floor(Math.random() * 3);
        switch (currencyId) {
            case 0: currency = "U$";                
                break;
            case 1: currency = "R$";                
                break;
            case 2: currency = "EUR";                
                break;
        }
        var number = {
            id: (i+1),
            value: "+55 84 9" + generateRandomNumber(4, 0, 9) + "-" + generateRandomNumber(4, 0, 9),
            monthyPrice: "0." + generateRandomNumber(2, 0, 9),
            setupPrice: generateRandomNumber(1, 1, 5) + "." + generateRandomNumber(2, 0, 9),
            currency: currency
        };
        allNumbers[number.id] = number;      
    }

    localStorage.setItem('allNumbers', JSON.stringify(allNumbers));
    localStorage.setItem('idCounter', quantity);

    return allNumbers;
}

const paginateArray = (array, pagination) => {
    var pageBegin = (pagination.page - 1) * pagination.perPage;

    array = array.slice(pageBegin, pageBegin + pagination.perPage);

    return array;
}


export const updateNumberServer = number => dispatch => {
    dispatch(setLoading(true));
    setTimeout(() => {

        var allNumbers = JSON.parse(localStorage.getItem('allNumbers'));
        allNumbers[number.id] = number;
        localStorage.setItem('allNumbers', JSON.stringify(allNumbers));

        dispatch(setRefreshData());
        dispatch(setLoading(false));
    }, 2000);
};

export const createNumberServer = number => dispatch => {
    dispatch(setLoading(true));
    setTimeout(() => {

        var idCounter = localStorage.getItem('idCounter');

        number.id = Number(idCounter) + 1;

        localStorage.setItem('idCounter', number.id);

        var allNumbers = JSON.parse(localStorage.getItem('allNumbers'));
        allNumbers[number.id] = number;
        localStorage.setItem('allNumbers', JSON.stringify(allNumbers));

        dispatch(setRefreshData())
        dispatch(setLoading(false));
    }, 2000);
};

export const removeNumberServer = number => dispatch => {
    dispatch(setLoading(true));
    setTimeout(() => {

        var allNumbers = JSON.parse(localStorage.getItem('allNumbers'));
        delete allNumbers[number.id];
        localStorage.setItem('allNumbers', JSON.stringify(allNumbers));
        
        dispatch(setRefreshData())
        dispatch(setLoading(false));
    }, 2000);
};

const filterNumbers = (allNumbers, filter) => {
    return Object.values(allNumbers).filter(n => {
        if (filter.id && !n.id.toString().includes(filter.id)) return false;
        if (filter.value && !n.value.includes(filter.value)) return false;
        if (filter.monthyPrice && !n.monthyPrice.includes(filter.monthyPrice)) return false;
        if (filter.setupPrice && !n.setupPrice.includes(filter.setupPrice)) return false;
        if (filter.currency && !n.currency.includes(filter.currency)) return false;
        return true;
    });
};

export const retrieveNumbers = (filter, pag) => dispatch => {
    dispatch(setLoading(true));

    setTimeout(() => {
        var allNumbers = JSON.parse(localStorage.getItem("allNumbers"));

        if(!allNumbers)
        {
            allNumbers = populateStorageWithRandomNumbers(800);            
        }                
        
        var numbers = filterNumbers(allNumbers, filter);

        var pagination = {
            total: numbers.length,
            page: pag.page,
            perPage: pag.perPage
        }

        numbers = paginateArray(numbers, pagination);
        dispatch(setPaginationTotal(pagination.total));
        dispatch(setNumberList(numbers));
        dispatch(setLoading(false));

    }, 2000);    
};


export const selectNumbers = state => state.phoneNumbers.numbers;
export const selectRefreshData = state => state.phoneNumbers.refreshData;
export const selectFilter = state => state.phoneNumbers.filter;
export const selectPagination = state => state.phoneNumbers.pagination;
export const selectPaginationPageSelect = state => state.phoneNumbers.pagination.pageSelect;
export const selectLoading = state => state.phoneNumbers.isLoading;
export const selectSaving = state => state.phoneNumbers.isSaving;

export default phoneNumbersSlice.reducer;
