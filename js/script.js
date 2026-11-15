const cookieBanner = document.getElementById("cookie-banner");

// Verificar se os cookies já foram aceites
if (localStorage.getItem("cookiesAccepted") === "true") {
    cookieBanner.style.display = "none";
}

function responderCookies() {
    cookieBanner.style.display = "none";
    localStorage.setItem("cookiesAccepted", "true");
}

const navBar = document.getElementById("navBar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navBar.classList.add("scrolled");
    } else {
        navBar.classList.remove("scrolled");
    }
});
function mostrarData(id) {
    const conteudos = document.querySelectorAll(".conteudo-data");

    conteudos.forEach(conteudo => {
        conteudo.style.display = "none";
    });

    document.getElementById(id).style.display = "block";
}


function mostrarObjetivo(id) {
    const conteudos = document.querySelectorAll(".conteudo-objetivo");

    conteudos.forEach(conteudo => {
        conteudo.style.display = "none";
    });

    document.getElementById(id).style.display = "block";
}
