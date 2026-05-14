// --- PARTE 0: O NOVO "CÉREBRO" ---
// Guarda qual cidade e aba estão ativas.
// O valor inicial deve bater com o que o HTML está mostrando por padrão.
var cidadeAtiva = 'mga'; // Começa mostrando Maringá ('mga')
var abaAtiva = 'cultos';  // Começa mostrando 'cultos'


// --- PARTE 1: PEGAR OS ELEMENTOS DO HTML ---
// Pegamos todos os 6 painéis de conteúdo
var paginaCultosMGA = document.getElementById('pagina-cultos-mga');
var paginaEnsaiosMGA = document.getElementById('pagina-ensaios-mga');
var paginaServicosMGA = document.getElementById('pagina-serviços-mga');

var paginaCultosCM = document.getElementById('pagina-cultos-cm');
var paginaEnsaiosCM = document.getElementById('pagina-ensaios-cm');
var paginaServicosCM = document.getElementById('pagina-serviços-cm');

// Pegamos também os elementos que vamos atualizar
var tituloRegiao = document.getElementById('titulo-regiao');
var btnMaringa = document.getElementById('btn-maringa');
var btnCampoMourao = document.getElementById('btn-campomourao');


// --- PARTE 2: FUNÇÕES PARA MOSTRAR E ESCONDER AS PÁGINAS ---

// Função ajudante para esconder TUDO de uma vez
function esconderTudo() {
    paginaCultosMGA.classList.add('hidden');
    paginaEnsaiosMGA.classList.add('hidden');
    paginaServicosMGA.classList.add('hidden');
    paginaCultosCM.classList.add('hidden');
    paginaEnsaiosCM.classList.add('hidden');
    paginaServicosCM.classList.add('hidden');
}

// Suas funções antigas, agora "inteligentes"
function mostrarCultos() {
    abaAtiva = 'cultos'; // Salva a aba atual
    esconderTudo();
    
    // Mostra o painel de culto da cidade que estiver ativa
    if (cidadeAtiva === 'mga') {
        paginaCultosMGA.classList.remove('hidden');
    } else {
        paginaCultosCM.classList.remove('hidden');
    }
}

function mostrarEnsaios() {
    abaAtiva = 'ensaios'; // Salva a aba atual
    esconderTudo();
    
    // Mostra o painel de ensaio da cidade que estiver ativa
    if (cidadeAtiva === 'mga') {
        paginaEnsaiosMGA.classList.remove('hidden');
    } else {
        paginaEnsaiosCM.classList.remove('hidden');
    }
}

function mostrarServiços() {
    abaAtiva = 'servicos'; // Salva a aba atual
    esconderTudo();
    
    // Mostra o painel de serviços da cidade que estiver ativa
    if (cidadeAtiva === 'mga') {
        paginaServicosMGA.classList.remove('hidden');
    } else {
        paginaServicosCM.classList.remove('hidden');
    }
}

// --- NOVAS FUNÇÕES DOS BOTÕES DE CIDADE ---
function selecionarMaringa() {
    cidadeAtiva = 'mga'; // Define Maringá como ativa
    
    // Manda "recarregar" a aba que o usuário estava vendo
    if (abaAtiva === 'cultos') mostrarCultos();
    if (abaAtiva === 'ensaios') mostrarEnsaios();
    if (abaAtiva === 'servicos') mostrarServiços();

    // Atualiza o título
    tituloRegiao.textContent = "Relatório CCB - Maringá e Região";

    // Atualiza o estilo dos botões
    btnMaringa.classList.add('ativo');
    btnCampoMourao.classList.remove('ativo');
}

function selecionarCampoMourao() {
    cidadeAtiva = 'cm'; // Define Campo Mourão como ativo

    // Manda "recarregar" a aba que o usuário estava vendo
    if (abaAtiva === 'cultos') mostrarCultos();
    if (abaAtiva === 'ensaios') mostrarEnsaios();
    if (abaAtiva === 'servicos') mostrarServiços();

    // Atualiza o título
    tituloRegiao.textContent = "Relatório CCB - Campo Mourão e Região";
    
    // Atualiza o estilo dos botões
    btnMaringa.classList.remove('ativo');
    btnCampoMourao.classList.add('ativo');
}


// =====================================================================
// --- PARTE 3: A FUNÇÃO DE BUSCA (SEU CÓDIGO - 100% INTACTO) ---
// =====================================================================

/**
 * Remove acentos e caracteres especiais de uma string.
 * Exemplo: "Última" vira "Ultima"
 * @param {string} texto O texto para normalizar.
 * @returns {string} O texto sem acentos.
 */
function removerAcentos(texto) {
    // Garante que não dê erro se o texto for nulo ou vazio
    if (!texto) return "";

    // O comando "mágico" para remover os acentos
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// (Sua função de busca original, sem nenhuma alteração)
function configurarBusca(idInput, idLista) {
    // 1. Pega os elementos do HTML
    var input = document.getElementById(idInput);
    var listaItens = document.getElementById(idLista).getElementsByTagName('li');

    // 2. Fica "escutando" o que o usuário digita
    input.addEventListener('input', function() {

        var termoBuscado = input.value.toLowerCase();
        var termoSemAcento = removerAcentos(termoBuscado);
        var palavrasBuscadas = termoSemAcento.split(' ');

        for (var i = 0; i < listaItens.length; i++) {

            var item = listaItens[i];
            var textoItem = item.textContent.toLowerCase();
            var textoItemSemAcento = removerAcentos(textoItem);
            var ehUmResultadoValido = true;

            for (var palavra of palavrasBuscadas) {
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


// --- PARTE 4: ATIVANDO AS BUSCAS (MODIFICADO) ---
// Agora ativamos as 6 barras de busca (3 de Maringá, 3 de Campo Mourão)

// Buscas de Maringá
configurarBusca('busca-cultos-mga', 'lista-cultos-mga');
configurarBusca('busca-ensaio-mga', 'lista-ensaios-mga');
configurarBusca('busca-serviços-mga', 'lista-serviços-mga');

// Buscas de Campo Mourão
configurarBusca('busca-cultos-cm', 'lista-cultos-cm');
configurarBusca('busca-ensaio-cm', 'lista-ensaios-cm');
configurarBusca('busca-serviços-cm', 'lista-serviços-cm');


// --- PARTE 5: INICIALIZAÇÃO (NOVO) ---
// Como tudo no HTML começa 'hidden', mandamos o JS mostrar
// o painel correto assim que for carregado.
mostrarCultos();