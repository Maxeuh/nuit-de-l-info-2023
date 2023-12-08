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
        answersContainer.innerHTML = '';
    }

    function renderQuestion(data) {
        questionText.innerText = data.question.texteQuestion;
        answersContainer.innerHTML = ''; // Clear previous answers

        data.reponses.forEach(answer => {
            const answerElement = document.createElement('button');
            answerElement.innerText = answer.txt;
            answerElement.classList.add('answer-button', 'btn', 'btn-light', 'w-100', 'mb-3');
            answerElement.onclick = () => handleAnswerClick(answer.pts, answer.id);
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

    function handleAnswerClick(points, id) {
        score += points;

        fetch(`explanation.php?questionId=${questionId}`)
            .then(response => response.json())
            .then(data => {
                // Store the data in a variable
                let questionText = data.question; // Assuming 'data' has a 'question' property

                // Create an h2 element and set its text content
                let h2Element = document.createElement('h2');
                h2Element.textContent = questionText;

                // Append the h2 element to the DOM
                // For example, appending it to a div with id 'question-container'
                document.getElementById('question-container').appendChild(h2Element);

                // You can also call renderQuestion here if needed
                renderQuestion(data);
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