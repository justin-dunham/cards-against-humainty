const cards = require('../decks/base.json');
const { shuffle, answerSlots } = require('./util');

describe('Utils', () => {
    it('answerSlots provides accurate count for question', () => {
        expect(answerSlots('If i were a tree I would be a _.')).toBe(1);
    });

    it('answerSlots provides accurate count for question', () => {
        expect(answerSlots('If i were a _ I would be a _.')).toBe(2);
    });

    it('shuffles', () => {
        const cards = new Array(10).fill(0).map((v, i) => i);
        const shuffled = [...cards].sort(shuffle);

        expect(shuffled.join()).not.toBe(cards.join());
    });
});
