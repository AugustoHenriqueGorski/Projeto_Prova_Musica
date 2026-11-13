const botaoMenu = document.querySelector("#botao-menu");
const menuPrincipal = document.querySelector("#menu-principal");

if (botaoMenu && menuPrincipal) {
    botaoMenu.addEventListener("click", function () {
        const menuEstaAberto = menuPrincipal.classList.toggle("aberto");

        botaoMenu.setAttribute("aria-expanded", String(menuEstaAberto));
        botaoMenu.setAttribute(
            "aria-label",
            menuEstaAberto ? "Fechar menu de navegação" : "Abrir menu de navegação"
        );
        botaoMenu.textContent = menuEstaAberto ? "✕" : "☰";
    });

    menuPrincipal.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            menuPrincipal.classList.remove("aberto");
            botaoMenu.setAttribute("aria-expanded", "false");
            botaoMenu.setAttribute("aria-label", "Abrir menu de navegação");
            botaoMenu.textContent = "☰";
        });
    });
}

const anoAtual = document.querySelector("#ano-atual");
if (anoAtual) {
    anoAtual.textContent = new Date().getFullYear();
}

const campoBusca = document.querySelector("#busca-itens");
const itensBuscaveis = document.querySelectorAll("[data-busca]");
const mensagemVazia = document.querySelector("#mensagem-vazia");

if (campoBusca && itensBuscaveis.length > 0) {
    campoBusca.addEventListener("input", function () {
        const termo = campoBusca.value.trim().toLocaleLowerCase("pt-BR");
        let quantidadeVisivel = 0;

        itensBuscaveis.forEach(function (item) {
            const texto = item.dataset.busca.toLocaleLowerCase("pt-BR");
            const corresponde = texto.includes(termo);
            item.hidden = !corresponde;
            if (corresponde) quantidadeVisivel++;
        });

        if (mensagemVazia) {
            mensagemVazia.hidden = quantidadeVisivel > 0;
        }
    });
}

const nomeUsuario = document.getElementById("nome");
const emailUsuario = document.getElementById("email");
const mensagemUsuario = document.getElementById("mensagem");

const formularioContato = document.querySelector("#formulario-contato");
const resultadoFormulario = document.querySelector("#resultado-formulario");

if (formularioContato && resultadoFormulario) {
    formularioContato.addEventListener("submit", function (evento) {
        evento.preventDefault();

        if (!formularioContato.checkValidity()) {
            formularioContato.reportValidity();
            return;
        }

        resultadoFormulario.textContent =
            "Formulário validado! Esta demonstração não envia mensagens para um servidor.";
            
        localStorage.setItem("Nome", nomeUsuario.value);
        localStorage.setItem("Email", emailUsuario.value);
        localStorage.setItem("Mensagem", mensagemUsuario.value);

        formularioContato.reset();
    });
}
