// --- Elementos da Página ---
const paginaCultos = document.getElementById('pagina-cultos');
const paginaEnsaios = document.getElementById('pagina-ensaios');
const paginaEventos = document.getElementById('pagina-serviços');

// --- Esconder abas para navegação ---

function mostrarCultos() {
    paginaEventos.classList.add('hidden');
    paginaEnsaios.classList.add('hidden');
    paginaCultos.classList.remove('hidden');
}

function mostrarEnsaios() {
    paginaCultos.classList.add('hidden');
    paginaEventos.classList.add('hidden');
    paginaEnsaios.classList.remove('hidden');
}

function mostrarServiços() {
    paginaEnsaios.classList.add('hidden');
    paginaCultos.classList.add('hidden');
    paginaEventos.classList.remove('hidden');
}

 /* Remove acentos para facilitar a busca */
function removerAcentos(texto) {
    if (!texto) return "";
    // NFD separa o acento da letra, e o Regex substitui o acento por vazio
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function configurarBusca(idInput, idLista) {
    const input = document.getElementById(idInput);
    
    // Segurança: se o input não existir na página, para a execução
    if (!input) return; 

    const listaItens = document.getElementById(idLista).getElementsByTagName('li');

    input.addEventListener('input', function() {
        const termoBuscado = input.value.toLowerCase();
        const termoSemAcento = removerAcentos(termoBuscado);
        
        // Separa o que foi digitado por espaço para buscar palavras fora de ordem
        const palavrasBuscadas = termoSemAcento.split(' ');

        for (let i = 0; i < listaItens.length; i++) {
            const item = listaItens[i];
            const textoItem = item.textContent.toLowerCase();
            const textoItemSemAcento = removerAcentos(textoItem);

            let ehUmResultadoValido = true;

            // Lógica "E": O item precisa conter TODAS as palavras digitadas
            for (const palavra of palavrasBuscadas) {
                if (!textoItemSemAcento.includes(palavra)) {
                    ehUmResultadoValido = false;
                    break;
                }
            }

            if (ehUmResultadoValido) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        }
    });
}

function obterDiaSemanaAtual() {
    const dias = ['domingo','segunda','terca','quarta','quinta','sexta','sabado'];
    return dias[new Date().getDay()];
}

function formatarDataHoje() {
    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const ano = String(hoje.getFullYear()).slice(-2);
    return `${dia}/${mes}/${ano}`;
}

function obterListaVisivel() {
    if (!paginaCultos.classList.contains('hidden')) return document.getElementById('lista-cultos');
    if (!paginaEnsaios.classList.contains('hidden')) return document.getElementById('lista-ensaios');
    if (!paginaEventos.classList.contains('hidden')) return document.getElementById('lista-serviços');
    return null;
}

function filtrarHoje() {
    const diaSemana = obterDiaSemanaAtual();
    const dataHoje = formatarDataHoje();
    const listaVisivel = obterListaVisivel();

    if (!listaVisivel) return;

    const itens = listaVisivel.getElementsByTagName('li');
    for (let i = 0; i < itens.length; i++) {
        const item = itens[i];
        const textoItemSemAcento = removerAcentos(item.textContent.toLowerCase());

        const contemDia = textoItemSemAcento.includes(diaSemana);
        const contemData = textoItemSemAcento.includes(dataHoje);

        if (contemDia || contemData) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    }
}

function limparFiltro() {
    const listaIds = ['lista-cultos', 'lista-ensaios', 'lista-serviços'];
    listaIds.forEach(function(id) {
        const lista = document.getElementById(id);
        if (!lista) return;
        const itens = lista.getElementsByTagName('li');
        for (let i = 0; i < itens.length; i++) {
            itens[i].classList.remove('hidden');
        }
    });

    ['busca-cultos', 'busca-ensaio', 'busca-serviços'].forEach(function(id) {
        const input = document.getElementById(id);
        if (input) {
            input.value = '';
        }
    });
}

// --- Inicialização das Buscas ---
configurarBusca('busca-cultos', 'lista-cultos');
configurarBusca('busca-ensaio', 'lista-ensaios');
configurarBusca('busca-serviços', 'lista-serviços');
