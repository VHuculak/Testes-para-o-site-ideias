// --- PARTE 1: PEGAR OS ELEMENTOS DO HTML ---
// (Esta parte estava correta)
var paginaCultos = document.getElementById('pagina-cultos');
var paginaEnsaios = document.getElementById('pagina-ensaios');
var paginaEventos = document.getElementById('pagina-serviços');


// --- PARTE 2: FUNÇÕES PARA MOSTRAR E ESCONDER AS PÁGINAS ---

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

// =====================================================================
// !! MUDANÇA 1: A NOVA FUNÇÃO AJUDANTE !!
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
// =====================================================================
// FIM DA MUDANÇA 1
// =====================================================================


// --- PARTE 3: A FUNÇÃO DE BUSCA (COM A CORREÇÃO) ---

function configurarBusca(idInput, idLista) {
    // 1. Pega os elementos do HTML (Correto)
    var input = document.getElementById(idInput);
    var listaItens = document.getElementById(idLista).getElementsByTagName('li');

    // 2. Fica "escutando" o que o usuário digita (Correto)
    input.addEventListener('input', function() {

        // =====================================================================
        // !! MUDANÇA 2: LIMPANDO O TEXTO QUE O USUÁRIO DIGITOU !!
        // =====================================================================
        var termoBuscado = input.value.toLowerCase();
        // Passamos o termo buscado pela nossa nova função
        var termoSemAcento = removerAcentos(termoBuscado);
        // Dividimos as palavras já sem acentos
        var palavrasBuscadas = termoSemAcento.split(' ');
        // =====================================================================

        // B. Trocamos o "for...of" por um "for" clássico.
        for (var i = 0; i < listaItens.length; i++) {

            var item = listaItens[i];

            // =====================================================================
            // !! MUDANÇA 3: LIMPANDO O TEXTO DO ITEM DA LISTA !!
            // =====================================================================
            var textoItem = item.textContent.toLowerCase();
            // Também limpamos o texto do item da lista
            var textoItemSemAcento = removerAcentos(textoItem);
            // =====================================================================

            var ehUmResultadoValido = true;

            for (var palavra of palavrasBuscadas) {
                // =====================================================================
                // !! MUDANÇA 4: COMPARANDO OS TEXTOS LIMPOS !!
                // =====================================================================
                // Agora, procuramos a palavra (sem acento) dentro do texto do item (sem acento)
                if (!textoItemSemAcento.includes(palavra)) {
                    ehUmResultadoValido = false;
                    break;
                }
                // =====================================================================
            }

            if (ehUmResultadoValido) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        }
    });
}


// --- PARTE 4: ATIVANDO AS BUSCAS ---
// (Esta parte estava correta)
configurarBusca('busca-cultos', 'lista-cultos');
configurarBusca('busca-ensaio', 'lista-ensaios');
configurarBusca('busca-serviços', 'lista-serviços');