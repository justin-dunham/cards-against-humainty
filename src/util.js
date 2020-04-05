// utility functions
function shuffle() {
    return Math.random() - 0.5;
}

function answerSlots(question) {
    return (question.match(/_/g) || []).length;
}

module.exports = {
    shuffle,
    answerSlots,
};
