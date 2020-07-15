///////////////////////////////////////////////
// AUXILIARY FUNCTIONS, JUST FOR THIS MOCKUP //
///////////////////////////////////////////////

// Generates a string with random numbers
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

// Populate the locastorage with random generated numbers
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

// Splite the array according to the pagination (this should be done on server side)
const paginateArray = (array, pagination) => {
    var pageBegin = (pagination.page - 1) * pagination.perPage;

    array = array.slice(pageBegin, pageBegin + pagination.perPage);

    return array;
}

// Filter the number according to filter criteria (this should be done on server side)
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

/////////////////////////////////
//  EXPORTED FUNCTIONS (CRUD)  //
/////////////////////////////////

const SERVER_DELAY = 2000; // used to simulate server delay time

const ApiHandler = {};

// Creates a new number
ApiHandler.createNumber = number => {
    return new Promise((resolve, reject) => { 
        setTimeout(() => {
            var idCounter = localStorage.getItem('idCounter');

            number.id = Number(idCounter) + 1;

            localStorage.setItem('idCounter', number.id);

            var allNumbers = JSON.parse(localStorage.getItem('allNumbers'));
            allNumbers[number.id] = number;
            localStorage.setItem('allNumbers', JSON.stringify(allNumbers));
            resolve("success");
        }, SERVER_DELAY);
    });
};

// Updates a existing number
ApiHandler.updateNumber = number => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            var allNumbers = JSON.parse(localStorage.getItem('allNumbers'));
            allNumbers[number.id] = number;
            localStorage.setItem('allNumbers', JSON.stringify(allNumbers));
            resolve("success");
        }, SERVER_DELAY);
    });
};

// Deletes a existing number
ApiHandler.deleteNumber = number => {
    return new Promise((resolve, reject) => { 
         setTimeout(() => {
            var allNumbers = JSON.parse(localStorage.getItem('allNumbers'));
            delete allNumbers[number.id];
            localStorage.setItem('allNumbers', JSON.stringify(allNumbers));
            resolve("success");
        }, SERVER_DELAY);
    });
};

// Get all numbers that matchs filtering and pagination criteria
ApiHandler.getNumbers = (filter, pag) => {
    return new Promise((resolve, reject) => {
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
            resolve({data:numbers, pagination: pagination});
        }, SERVER_DELAY);
    });    
};

export default ApiHandler;
