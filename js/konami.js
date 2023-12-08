var konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
];

var konamiCodePosition = 0;

document.addEventListener("keydown", function (e) {
    var key = e.key;
    var requiredKey = konamiCode[konamiCodePosition];

    if (key == requiredKey) {
        konamiCodePosition++;
        if (konamiCodePosition == konamiCode.length) {
            activateCheats();
            konamiCodePosition = 0;
        }
    } else {
        konamiCodePosition = 0;
    }
});

function activateCheats() {
    var jeu = document.querySelector(".jeu");
    jeu.innerHTML = '<iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" title="Konami code" frameborder="0"></iframe>';
    jeu.querySelector("iframe").style = "width: 100%; height: 100%;";
}
