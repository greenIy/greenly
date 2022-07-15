/*  Greenly Helper Library
    Functions included are simple logic functions widely used by the persistence layer as well as other layers which may require them.
*/

// Proper rounding function as oposed to JS Math
function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}   

// Server-side pagination
function manualPagination (array, page_size, page_number) {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
}


function calcLowestPrice (supplies) {
    let min = Number.POSITIVE_INFINITY;
    supplies.forEach((supply) => {
        if (parseFloat(supply.price) < parseFloat(min)) {
            min = supply.price
        }
    })

    return min;
}; 

function calcHighestPrice (supplies) {
    let max = Number.NEGATIVE_INFINITY;
    supplies.forEach((supply) => {
        if (parseFloat(supply.price) > parseFloat(max)) {
            max = supply.price
        }
    })

    return max;
}; 

module.exports = {
    round,
    manualPagination,
    calcLowestPrice,
    calcHighestPrice
}