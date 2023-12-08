async function recupererDonneesJSON() {

    const questionText = document.getElementById('question-text');
    const answersContainer = document.getElementById('answers-container');
    const scoreElement = document.getElementById('score');

    let currentQuestionId = 1;
    let score = 0;

    scoreElement.innerText = score;

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
            answerElement.classList.add('answer-button btn btn-light w-100 mb-3');
            answerElement.onclick = () => handleAnswerClick(answer.pts);
            answersContainer.appendChild(answerElement);
        });

        const tableauHauteur = [];
        const tableauBouton = document.querySelectorAll('.answer-button');
        tableauBouton.forEach(bouton => {
            tableauHauteur.push(bouton.offsetHeight);
        });

        const hauteurMax = Math.max(...tableauHauteur);

        tableauBouton.forEach(bouton => {
            bouton.style.height = hauteurMax + "px";
        });

    }

    function handleAnswerClick(points) {
        score += points;
        scoreElement.innerText = score;
        currentQuestionId++;
        fetchQuestion(currentQuestionId);
    }

    fetchQuestion(currentQuestionId); // Initially load the first question
}