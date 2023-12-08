
////////////////////
//PARTIE QUESTIONS//
////////////////////

// Liste des questions et réponses
const quizData = [
    {
        question: "Changement climatique = Intox !",
        answer: false
    },
    {
        question: "Tout est fini, on va tous mourir !",
        answer: false
    },
    {
        question: "On peut pas y faire grand chose !",
        answer: false
    },
    {
        question: "Je n’y peux rien !",
        answer: false
    },
    {
        question: "La technologie nous sauvera !",
        answer: false
    },
    {
        question: "Le CO2 cause l’intégralité de l’effet de serre !",
        answer: false
    },
    {
        question: "Le CO2 participe à l’effet de serre",
        answer: true
    },
    {
        question: "Le CO2 n’a aucune incidence sur l’effet de serre !",
        answer: false
    },
    {
        question: "Un petit réchauffement de ~1°C n’a pas beaucoup d’incidence sur la Terre !",
        answer: false
    }
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

        if (score >= quizData.length / 2) {
            alert("Vous avez un bon score, vous êtes bien informé sur le sujet !");
            window.parent.document.getElementById("score").innerText = parseInt(window.parent.document.getElementById("score").innerText) - 1;
            if (window.parent.document.getElementById("score").innerText < 0) {
                window.parent.document.getElementById("score").innerText = 0;
            }
            window.parent.changeEarthTexture(images[window.parent.document.getElementById("score").innerText])

        } else {
            alert("Vous avez un mauvais score, vous n'êtes pas bien informé sur le sujet !");
            window.parent.document.getElementById("score").innerText = parseInt(window.parent.document.getElementById("score").innerText) + 1;
            if (window.parent.document.getElementById("score").innerText > 3) {
                window.parent.document.getElementById("score").innerText = 3;
            }
            window.parent.changeEarthTexture(images[window.parent.document.getElementById("score").innerText])
        }
    }
}

displayQuestion();
