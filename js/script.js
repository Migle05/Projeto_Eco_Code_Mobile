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
