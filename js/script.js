
const navBar = document.getElementById("navBar");

const menuToggle = document.getElementById("menuToggle");

const navLinks = document.getElementById("navLinks");



function atualizarNavbar() {

    if (window.scrollY > 40) {
        navBar.classList.add("scrolled");
    } else {
        navBar.classList.remove("scrolled");
    }

}

window.addEventListener("scroll", atualizarNavbar, {
    passive: true
});

atualizarNavbar();



function fecharMenu() {

    navLinks.classList.remove("open");

    menuToggle.classList.remove("active");

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.setAttribute("aria-label", "Abrir menu");

}


menuToggle.addEventListener("click", () => {

    const menuAberto = navLinks.classList.toggle("open");

    menuToggle.classList.toggle("active", menuAberto);

    menuToggle.setAttribute("aria-expanded", String(menuAberto));

    menuToggle.setAttribute(
        "aria-label",
        menuAberto ? "Fechar menu" : "Abrir menu"
    );

});


navLinks.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", fecharMenu);

});



document.addEventListener("click", (event) => {

    const clicouDentro =
        navLinks.contains(event.target) ||
        menuToggle.contains(event.target);

    if (!clicouDentro) {
        fecharMenu();
    }

});



document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        fecharMenu();
    }

});



window.addEventListener("resize", () => {

    if (window.innerWidth > 700) {
        fecharMenu();
    }

});


function configurarSeparadores() {

    const grupos = document.querySelectorAll(".tabs-container");

    grupos.forEach(grupo => {

        const botoes = grupo.querySelectorAll(".tab-button");

        const conteudos = grupo.querySelectorAll(".tab-content");


        botoes.forEach(botao => {

            botao.addEventListener("click", () => {

                const id = botao.dataset.tab;

                const conteudoSelecionado =
                    grupo.querySelector(`#${id}`);


                if (!conteudoSelecionado) {
                    return;
                }



                botoes.forEach(outroBotao => {

                    outroBotao.classList.remove("active");

                    outroBotao.setAttribute("aria-selected", "false");

                    outroBotao.setAttribute("tabindex", "-1");

                });



                conteudos.forEach(conteudo => {

                    conteudo.classList.remove("active");

                    conteudo.hidden = true;

                });



                botao.classList.add("active");

                botao.setAttribute("aria-selected", "true");

                botao.setAttribute("tabindex", "0");



                conteudoSelecionado.hidden = false;

                conteudoSelecionado.classList.add("active");

            });



            botao.addEventListener("keydown", (event) => {

                if (
                    event.key === "ArrowRight" ||
                    event.key === "ArrowLeft"
                ) {

                    event.preventDefault();

                    const listaBotoes = Array.from(botoes);

                    const indiceAtual = listaBotoes.indexOf(botao);

                    const direcao =
                        event.key === "ArrowRight" ? 1 : -1;

                    const proximoIndice =
                        (indiceAtual + direcao + listaBotoes.length)
                        % listaBotoes.length;

                    const proximoBotao = listaBotoes[proximoIndice];

                    proximoBotao.focus();

                    proximoBotao.click();

                }

            });

        });



        botoes.forEach((botao, indice) => {

            const selecionado = indice === 0;

            botao.classList.toggle("active", selecionado);

            botao.setAttribute(
                "aria-selected",
                String(selecionado)
            );

            botao.setAttribute(
                "tabindex",
                selecionado ? "0" : "-1"
            );

        });


        conteudos.forEach((conteudo, indice) => {

            const selecionado = indice === 0;

            conteudo.hidden = !selecionado;

            conteudo.classList.toggle("active", selecionado);

        });

    });

}

configurarSeparadores();


const cookieBanner = document.getElementById("cookie-banner");

const acceptCookies = document.getElementById("acceptCookies");

const rejectCookies = document.getElementById("rejectCookies");

const STORAGE_KEY = "ecoCodeMobilePrivacyChoice";


function obterPreferencia() {

    try {

        return localStorage.getItem(STORAGE_KEY);

    } catch (erro) {

        console.warn(
            "Não foi possível consultar as preferências.",
            erro
        );

        return null;

    }

}



function guardarPreferencia(escolha) {

    try {

        localStorage.setItem(STORAGE_KEY, escolha);

        return true;

    } catch (erro) {

        console.warn(
            "Não foi possível guardar a preferência.",
            erro
        );

        return false;

    }

}



function iniciarPrivacidade() {

    const preferencia = obterPreferencia();

    if (preferencia === "aceite" || preferencia === "recusada") {

        cookieBanner.hidden = true;

    } else {

        cookieBanner.hidden = false;

    }

}



acceptCookies.addEventListener("click", () => {

    guardarPreferencia("aceite");

    cookieBanner.hidden = true;

});



rejectCookies.addEventListener("click", () => {

    guardarPreferencia("recusada");

    cookieBanner.hidden = true;

});



iniciarPrivacidade();



document.addEventListener("DOMContentLoaded", () => {

    console.log("Eco Code Mobile iniciado com sucesso! 🌱");

});
