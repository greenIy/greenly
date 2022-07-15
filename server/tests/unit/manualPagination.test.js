const manualPagination = require('../../lib/helper').manualPagination

const baseArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

test('correctly paginates an array', async () => {
    expect(manualPagination(baseArray, 2, 2)).toStrictEqual([3,4])
});

test('correctly paginates an array where the last page is shorter than the limit', async () => {
    expect(manualPagination(baseArray, 4, 3)).toStrictEqual([9,10])
});

test('correctly paginates an array with less data than the limit', async () => {
    expect(manualPagination(baseArray, 50, 1)).toStrictEqual(baseArray)
})

test('correctly paginates an array when the page is longer than the number of existing pages', async () => {
    expect(manualPagination(baseArray, 5, 3)).toStrictEqual([])
})