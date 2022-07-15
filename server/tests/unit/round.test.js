const round = require('../../lib/helper').round

// Comentário

test('correctly rounds positive number with 6 decimal points to 2 decimal points', async () => {
    expect(round(78.315124, 2)).toBe(78.32)
});

test('correctly rounds negative number with 10 decimal points to 6 decimal points', async () => {
    expect(round(-102.5928374632, 6)).toBe(-102.592837)
})