

const cookieBanner = document.getElementById("cookie-banner");

// Aceitar cookies
function responderCookies() {
    cookieBanner.style.display = "none";
}

const navBar = document.getElementById("navBar");
 
    window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navBar.classList.add("scrolled");
    } else {
        navBar.classList.remove("scrolled");
    }
});