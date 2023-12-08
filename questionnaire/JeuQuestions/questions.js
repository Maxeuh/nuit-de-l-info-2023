
////////////////////
//PARTIE QUESTIONS//
////////////////////

// Liste des questions et réponses
const quizData = [
    {
        question: "Le ciel est bleu.",
        answer: true
    },
    {
        question: "La Terre est plate.",
        answer: false
    }
    // Ajoutez autant de questions que nécessaire
];

let currentQuestion = 0;
let score = 0;

function displayQuestion() {
    const bubble = document.getElementById('bubble');
    bubble.innerText = quizData[currentQuestion].question;
}

function checkAnswer(userAnswer) {
    const correctAnswer = quizData[currentQuestion].answer;

    if (userAnswer === correctAnswer) {
        score++;
    }

    // Passer à la question suivante
    nextQuestion();
}

function nextQuestion() {
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        displayQuestion();
    } else {
        // Afficher le score final
        alert(`Félicitations, vous avez terminé! Score final: ${score} sur ${quizData.length}`);
        // Vous pouvez ajouter d'autres actions ici, comme l'enregistrement des réponses, etc.
    }
}

displayQuestion();
