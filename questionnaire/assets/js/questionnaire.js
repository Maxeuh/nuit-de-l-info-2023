async function recupererDonneesJSON() {
    try {

        const url = 'donnee.json';
        const reponse = await fetch(url);
        if (!reponse.ok) {
            throw new Error(`Erreur lors de la récupération des données : ${reponse.status}`);
        }
        const donnees = await reponse.json();
        const button1 = document.getElementById('button1');
        const button2 = document.getElementById('button2');
        const button3 = document.getElementById('button3');
        const button4 = document.getElementById('button4');

        document.getElementById('question').innerHTML = donnees.question.texteQuestion;
        button1.innerHTML = donnees.reponses[0].txt;
        button2.innerHTML = donnees.reponses[1].txt;
        button3.innerHTML = donnees.reponses[2].txt;
        button4.innerHTML = donnees.reponses[3].txt;

        let tableauHauteur = [];
        tableauHauteur.push(button1.offsetHeight);
        tableauHauteur.push(button2.offsetHeight);
        tableauHauteur.push(button3.offsetHeight);
        tableauHauteur.push(button4.offsetHeight);

        let hauteurMax = Math.max(...tableauHauteur);

        button1.style.height = hauteurMax + "px";
        button2.style.height = hauteurMax + "px";
        button3.style.height = hauteurMax + "px";
        button4.style.height = hauteurMax + "px";



    } catch (erreur) {
        console.error('Erreur :', erreur.message);
    }
}

recupererDonneesJSON();