function setTheme(theme) {
    document.body.classList.forEach((className) => {
        document.body.classList.remove(className);
    });
    if (theme != "") {
        document.body.classList.add(theme);
    }
}

function anarchique() {
    document.querySelector("body").style.setProperty("--random-font-main", "#" + Math.floor(Math.random()*16777215).toString(16));
    document.querySelector("body").style.setProperty("--random-header-footer", "#" + Math.floor(Math.random()*16777215).toString(16) + "BF");
    document.querySelector("body").style.setProperty("--random-fromage", "#" + Math.floor(Math.random()*16777215).toString(16));
    document.querySelector("body").style.setProperty("--random-header-button", "#" + Math.floor(Math.random()*16777215).toString(16) + "BF");
    document.querySelector("body").style.setProperty("--random-header-button-hover", "#" + Math.floor(Math.random()*16777215).toString(16) + "BF");
    document.querySelector("body").style.setProperty("--random-background", "linear-gradient(#" + Math.floor(Math.random()*16777215).toString(16) + ", #" + Math.floor(Math.random()*16777215).toString(16) + ", #" + Math.floor(Math.random()*16777215).toString(16) + ")");
}

setInterval(() => {
    anarchique();
}, 5000);

anarchique();