const calcLowestPrice = require('../../lib/helper').calcLowestPrice

const suppliesStub = [
    {price: 9.99}, {price: 11}, {price: 2.30}, {price: 13.50}]

test('correctly calculates lowest price out of all supplies, between integers and floats', async () => {
    expect(calcLowestPrice(suppliesStub)).toBe(2.30)
});