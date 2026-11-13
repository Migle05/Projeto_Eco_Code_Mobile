
const cookieBanner = document.getElementById("cookie-banner");

if (localStorage.getItem("cookiesRespondidos")) {
    cookieBanner.style.display = "none";
}

function responderCookies() {
    localStorage.setItem("cookiesRespondidos", "true");
    cookieBanner.style.display = "none";
}