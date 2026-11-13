      const navBar = document.getElementById("navBar");
 
    window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navBar.classList.add("scrolled");
    } else {
        navBar.classList.remove("scrolled");
    }
});

const cookieBanner = document.getElementById("cookie-banner");

if (localStorage.getItem("cookiesRespondidos")) {
    cookieBanner.style.display = "none";
}

function responderCookies() {
    localStorage.setItem("cookiesRespondidos", "true");
    cookieBanner.style.display = "none";
}