
const navBar = document.getElementById("navBar");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

function atualizarNavbar() {
    navBar.classList.toggle("scrolled", window.scrollY > 40);
}

function fecharMenu() {
    navLinks.classList.remove("open");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
}

window.addEventListener("scroll", atualizarNavbar, { passive: true });
atualizarNavbar();

menuToggle.addEventListener("click", () => {
    const aberto = navLinks.classList.toggle("open");

    menuToggle.classList.toggle("active", aberto);
    menuToggle.setAttribute("aria-expanded", aberto);
    menuToggle.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
});

navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", fecharMenu);
});

document.addEventListener("click", event => {
    if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
        fecharMenu();
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") fecharMenu();
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 700) fecharMenu();
});

// Separadores

document.querySelectorAll(".tabs-container").forEach(grupo => {
    const botoes = grupo.querySelectorAll(".tab-button");
    const conteudos = grupo.querySelectorAll(".tab-content");

    function selecionarTab(botao) {
        const id = botao.dataset.tab;
        const selecionado = grupo.querySelector(`#${id}`);

        if (!selecionado) return;

        botoes.forEach(outro => {
            const ativo = outro === botao;

            outro.classList.toggle("active", ativo);
            outro.setAttribute("aria-selected", ativo);
            outro.setAttribute("tabindex", ativo ? "0" : "-1");
        });

        conteudos.forEach(conteudo => {
            const ativo = conteudo === selecionado;

            conteudo.classList.toggle("active", ativo);
            conteudo.hidden = !ativo;
        });
    }

    botoes.forEach(botao => {
        botao.addEventListener("click", () => selecionarTab(botao));

        botao.addEventListener("keydown", event => {
            if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;

            event.preventDefault();

            const lista = Array.from(botoes);
            const atual = lista.indexOf(botao);
            const direcao = event.key === "ArrowRight" ? 1 : -1;
            const proximo = lista[(atual + direcao + lista.length) % lista.length];

            proximo.focus();
            selecionarTab(proximo);
        });
    });

    selecionarTab(botoes[0]);
});

// Perguntas frequentes

const perguntasFAQ = document.querySelectorAll(".faq-question");

perguntasFAQ.forEach(pergunta => {
    pergunta.addEventListener("click", () => {
        const resposta = document.getElementById(pergunta.getAttribute("aria-controls"));
        const item = pergunta.closest(".faq-item");
        const aberta = pergunta.getAttribute("aria-expanded") === "true";

        perguntasFAQ.forEach(outra => {
            const outraResposta = document.getElementById(outra.getAttribute("aria-controls"));
            const outroItem = outra.closest(".faq-item");

            outra.setAttribute("aria-expanded", "false");
            outraResposta.hidden = true;
            outroItem.classList.remove("active");
        });

        if (!aberta) {
            pergunta.setAttribute("aria-expanded", "true");
            resposta.hidden = false;
            item.classList.add("active");
        }
    });
});

// Preferências de privacidade

const cookieBanner = document.getElementById("cookie-banner");
const STORAGE_KEY = "ecoCodeMobilePrivacyChoice";

function guardarPreferencia(escolha) {
    try {
        localStorage.setItem(STORAGE_KEY, escolha);
    } catch (erro) {
        console.warn("Não foi possível guardar a preferência.", erro);
    }

    cookieBanner.hidden = true;
}

try {
    const preferencia = localStorage.getItem(STORAGE_KEY);
    cookieBanner.hidden = preferencia === "aceite" || preferencia === "recusada";
} catch (erro) {
    cookieBanner.hidden = false;
}

document.getElementById("acceptCookies").addEventListener("click", () => {
    guardarPreferencia("aceite");
});

document.getElementById("rejectCookies").addEventListener("click", () => {
    guardarPreferencia("recusada");
});

console.log("Eco Code Mobile iniciado com sucesso! 🌱");
