const cards = require('../decks/base.json');

const Game = require('.');
const game = new Game();

const player1 = 'Justin';
const player2 = 'Nicole';
const player3 = 'Colin';

describe('Game', () => {
    it('adds players', () => {
        game.addPlayer(player1);
        game.addPlayer(player2);
        game.addPlayer(player3);
        expect(game.players.length).toBe(3);
    });

    it('shuffles cards', () => {
        expect(game.answers).not.toBe(cards.cards);
    });

    it('deals cards', () => {
        expect(game.players[0].cards.length).toBe(7);
    });

    it('shows active player', () => {
        expect(game.getActivePlayerName()).toBe(player1);
    });

    it('takes turns', () => {
        expect(game.activePlayer).toBe(0);
        game.nextTurn();
        expect(game.activePlayer).toBe(1);
        game.nextTurn();
        expect(game.activePlayer).toBe(2);
    });

    it('gets question', () => {
        expect(game.round.question.length).toBeGreaterThan(1);
    });

    it('provides turn information', () => {
        expect(game.getTurn(player1).answerSlots).toBeGreaterThan(0);
        expect(game.getTurn(player2).answerSlots).toBeGreaterThan(0);
        expect(game.getTurn(player3).answerSlots).toBe(0);
    });

    it('allows answers', () => {
        const player = game.getPlayer(player1);
        const answer = [...player.cards][0];
        const turn = game.submitAnswer(player1, [answer]);

        expect(turn.cards.find((a) => a === answer)).toBe(undefined);
    });
});
