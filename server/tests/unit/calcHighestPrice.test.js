const calcHighestPrice = require('../../lib/helper').calcHighestPrice

const suppliesStub = [
    {price: 9.99}, {price: 11}, {price: 2.30}, {price: 13.50}]

test('correctly calculates sighest price out of all supplies, between integers and floats', async () => {
    expect(calcHighestPrice(suppliesStub)).toBe(13.50)
});