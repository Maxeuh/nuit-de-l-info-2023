document.addEventListener('DOMContentLoaded', function () {
    const questionText = document.getElementById('question-text');
    const answersContainer = document.getElementById('answers-container');

    let currentQuestionId = 1;

    function fetchQuestion(questionId) {
        fetch(`quiz.php?questionId=${questionId}`)
            .then(response => response.json())
            .then(data => renderQuestion(data))
            .catch(error => console.error('Error:', error));
    }

    function renderQuestion(data) {
        questionText.innerText = data.question.texteQuestion;
        answersContainer.innerHTML = ''; // Clear previous answers

        data.reponses.forEach(answer => {
            const answerElement = document.createElement('button');
            answerElement.innerText = answer.txt;
            answerElement.classList.add('answer-button');
            answerElement.onclick = () => handleAnswerClick(answer.pts);
            answersContainer.appendChild(answerElement);
        });
    }

    function handleAnswerClick(points) {
        currentQuestionId++;
        fetchQuestion(currentQuestionId);
    }

    fetchQuestion(currentQuestionId); // Initially load the first question
});
