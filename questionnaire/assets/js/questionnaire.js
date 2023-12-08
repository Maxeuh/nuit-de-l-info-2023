document.addEventListener('DOMContentLoaded', function () {

    const questionText = document.getElementById('question-text');
    const answersContainer = document.getElementById('answers-container');

    let currentQuestionId = 1;
    let score = 0;

    function fetchQuestion(questionId) {
        fetch(`quiz.php?questionId=${questionId}`)
            .then(response => response.json())
            .then(data => renderQuestion(data))
            .catch(finishQuiz());
    }

    function finishQuiz() {
        questionText.innerText = 'Vous avez fini le questionnaire !';
        answersContainer.innerHTML = 'Votre score est de ' + score + ' points.';
        if (score < 0) {
            answersContainer.innerHTML += '<br>Vous avez fait se réchauffer la planète !';
        } else {
            answersContainer.innerHTML += '<br>Vous avez fait refroidir la planète !';
        }
    }

    function renderQuestion(data) {
        questionText.innerText = data.question.texteQuestion;
        answersContainer.innerHTML = ''; // Clear previous answers

        data.reponses.forEach(answer => {
            const answerElement = document.createElement('button');
            answerElement.innerText = answer.txt;
            answerElement.classList.add('answer-button', 'btn', 'btn-light', 'w-100', 'mb-3');
            answerElement.onclick = () => handleAnswerClick(answer.pts, currentQuestionId);
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


    function handleContinueClick() {
        currentQuestionId++;
        fetchQuestion(currentQuestionId);
    }

    async function handleAnswerClick(points, id) {
        score += points;

        await fetch(`explanation.php?questionId=${currentQuestionId}`)
            .then(response => response.text())
            .then(data => {
                // Store the data in a variable
                let Text = data.question; // Assuming 'data' has a 'question' property
                questionText.innerText = Text;
                console.log(Text);
            })


        const continueButton = document.createElement('button');
        continueButton.innerText = 'Continuer';
        continueButton.classList.add('btn', 'btn-light', 'w-100', 'mb-3');
        continueButton.onclick = () => handleContinueClick();
        answersContainer.innerHTML = '';
        answersContainer.appendChild(continueButton);
    }

    fetchQuestion(currentQuestionId); // Initially load the first question
});