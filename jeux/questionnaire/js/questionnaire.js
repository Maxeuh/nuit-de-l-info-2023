async function recupererDonneesJSON() {
    try {

        const url = 'donnee.json';
        const reponse = await fetch(url);
        if (!reponse.ok) {
            throw new Error(`Erreur lors de la récupération des données : ${reponse.status}`);
        }
        const donnees = await reponse.json();
        document.getElementById('question').innerHTML = donnees.question.texteQuestion;
        document.getElementById('button1').innerHTML = "A :" + donnees.reponses[0].txt;
        document.getElementById('button2').innerHTML = "B :" + donnees.reponses[1].txt;
        document.getElementById('button3').innerHTML = "C :" + donnees.reponses[2].txt;
        document.getElementById('button4').innerHTML = "D :" + donnees.reponses[3].txt;



    } catch (erreur) {
        console.error('Erreur :', erreur.message);
    }
}

recupererDonneesJSON();