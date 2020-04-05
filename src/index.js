const questions = require('../decks/base_questions.json');
const answers = require('../decks/base.json');
const { shuffle, answerSlots } = require('./util');

class Game {
    constructor(params) {
        this.questions = [...questions.cards].sort(shuffle).sort(shuffle);
        this.answers = [...answers.cards].sort(shuffle).sort(shuffle);
        this.players = [];
        this.activePlayer = 0;
        this.round = {
            player: '',
            question: '',
            answers: [{ player: '', answer: [''] }],
            winner: '',
        };

        // bound functions
        this.addPlayer = this.addPlayer.bind(this);
        this.getPlayer = this.getPlayer.bind(this);
        this.drawCard = this.drawCard.bind(this);
        this.drawQuestion = this.drawQuestion.bind(this);
        this.submitAnswer = this.submitAnswer.bind(this);
        this.readAnswers = this.readAnswers.bind(this);
        this.pickWinner = this.pickWinner.bind(this);
        this.nextTurn = this.nextTurn.bind(this);
    }

    addPlayer(name) {
        const player = {
            name,
            score: 0,
            cards: new Array(7).fill('').map(this.drawCard),
        };
        this.players.push(player);
        return player;
    }

    getPlayer(name) {
        return this.players.find((player) => player.name === name);
    }

    getPlayerId(name) {
        return this.players.map((player) => player.name).indexOf(name);
    }

    getTurn(name) {
        const { question, answers } = this.round;

        if (this.getActivePlayerName() === name) {
            // show question
            return { question, answerSlots: 0, answers };
        } else {
            return { question, answerSlots: answerSlots(question) };
            // show question and answers slot
        }
    }

    getActivePlayerName() {
        return this.players[this.activePlayer].name;
    }

    drawCard() {
        return this.answers.shift();
    }

    drawQuestion() {
        return this.questions.shift();
    }

    submitAnswer(player, answers) {
        const id = this.getPlayerId(player);

        this.round.answers.push({
            player,
            answers,
        });

        // remove submitted answers from hand
        this.players[id].cards = this.players[id].cards.filter((answer) => answers.indexOf(answer) === -1);

        // draw cards
        for (let index = this.players[id].cards.length; index < 7; index++) {
            this.players[id].cards.push(this.drawCard());
        }

        return this.players[id];
    }

    readAnswers() {
        return this.round.answers.map((answers) => answers.answer);
    }

    pickWinner(answers) {
        this.round.winner = this.round.answers.find((answer) => answer.answer === answers).player;
    }

    startGame() {
        this.players = this.players.sort(shuffle);
    }

    nextTurn() {
        if (this.getWinner()) {
            // end game
            return false;
        }

        // normal turn actions
        this.getNextPlayer();
        this.players[this.activePlayer].question = this.drawQuestion();

        this.round.player = this.players[this.activePlayer].name;
        this.round.question = this.players[this.activePlayer].question;

        this.players[this.activePlayer].question = this.drawQuestion();
    }

    getNextPlayer() {
        if (this.activePlayer < this.players.length - 1) {
            this.activePlayer++;
        } else {
            this.activePlayer = 0;
        }
        return this.activePlayer;
    }

    getWinner() {
        return this.players.find((player) => player.score >= 10);
    }
}

module.exports = Game;
