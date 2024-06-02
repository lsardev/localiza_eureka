var cursoAluno;
var estandeAluno;

function imprimirNomeAluno() {
    var searchInput = localStorage.getItem("nomeAluno")
    if (searchInput) {
        var valor = searchInput.value.trim(); 
        console.log('Valor do nome do aluno:', valor);
        return valor;
    } else {
        console.error('O elemento com a classe "search" não foi encontrado.');
        return null;
    }
}

async function pegarCursoAluno() {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            try {
                console.log('Entrou no setTimeout para pegar o curso do aluno');
                const nomeAluno = imprimirNomeAluno();
                if (!nomeAluno) {
                    throw new Error('Nome do aluno não pode ser vazio');
                }
                console.log('Buscando curso do aluno...');
                const response = await fetch(`http://localhost:3000/buscarAluno1?nomeAluno=${encodeURIComponent(nomeAluno)}`);
                console.log('Recebeu resposta da API');
                if (!response.ok) {
                    throw new Error(`Erro ao buscar curso do aluno: ${response.statusText} (status: ${response.status})`);
                }
                const dadosAluno = await response.json();
                console.log('Dados do aluno:', dadosAluno);
                if (dadosAluno.length === 0) {
                    throw new Error('Nenhum dado encontrado para o aluno');
                }
                cursoAluno = dadosAluno[0]["curTrabalho"];
                estandeAluno = dadosAluno[0]["numeroEstande"];
                console.log('Curso do aluno:', cursoAluno);
                console.log('Estande do aluno:', estandeAluno);

                // Armazena os dados no localStorage
                localStorage.setItem('cursoAluno', cursoAluno);
                localStorage.setItem('estandeAluno', estandeAluno);

                resolve({ cursoAluno, estandeAluno });
            } catch (error) {
                console.error('Erro ao buscar o curso do aluno:', error);
                reject(error);
            }
        }, 2000); 
    });
}

async function irParaPaginaMapa() {
    try {
        const { cursoAluno, estandeAluno } = await pegarCursoAluno();
        if (cursoAluno && estandeAluno) {
            escreverNaDiv(cursoAluno, estandeAluno);
            window.location.href = "pagina_mapa.html";
        }
    } catch (error) {
        console.error('Erro ao redirecionar para a página do mapa:', error);
    }
}

function escreverNaDiv(cursoAluno, estandeAluno) {

    if (cursoAluno === 'ADM') {
        cursoNaDiv = 'Administração';
    } else if (cursoAluno === 'MC') {
        cursoNaDiv = 'Engenharia Mecânica';
    } else if (cursoAluno === 'CA'){
        cursoNaDiv = 'Eng. de Controle e Automação';
    } else if (cursoAluno === 'CM'){
        cursoNaDiv = 'Engenharia de Computação';
    } else if (cursoAluno === 'CV'){
        cursoNaDiv = 'Engenharia Cívil';
    }

    const titulo_curso = document.querySelector('#titulo_curso a');
    if (titulo_curso) {
        titulo_curso.textContent = cursoNaDiv;
    } else {
        console.error('O elemento com a id "titulo_curso" não foi encontrado.');
    }

    const numero_estande = document.querySelector('#destaque a');
    if (numero_estande) {
        numero_estande.textContent = estandeAluno;
    } else {
        console.error('O elemento com a id "destaque" não foi encontrado.');
    }
}

function buscarUsuarios() {
    var valorBusca = imprimirNomeAluno();
    if (valorBusca) {
        fetch(`http://localhost:3000/buscarAluno1?nomeAluno=${encodeURIComponent(valorBusca)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Registros da tabela usuarios:', data);
            })
            .catch(error => {
                console.error('Erro ao buscar usuários:', error);
            });
    }
}

function trocarImagem(cursoAluno) {
    // Seleciona o elemento com a classe 'mapa'
    var elementoMapa = document.querySelector('.mapa');
    
    // Verifica o valor de cursoAluno e altera a imagem de acordo
    if (cursoAluno === 'ADM') {
        elementoMapa.src = 'mapa_adm.png';
    } else if (cursoAluno === 'MC') {
        elementoMapa.src = 'mapa_mc.png';
    } else if (cursoAluno === 'CA'){
        elementoMapa.src = 'mapa_ca.png';
    } else if (cursoAluno === 'CM'){
        elementoMapa.src = 'mapa_cm.png';
    } else if (cursoAluno === 'CV'){
        elementoMapa.src = 'mapa_cv.png'
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var buscarUsuariosBtn = document.getElementById('buscarUsuariosBtn');
    if (buscarUsuariosBtn) {
        buscarUsuariosBtn.addEventListener('click', buscarUsuarios);
    } else {
        console.error('O botão buscar usuários não foi encontrado.');
    }

    // Recupera o curso e estande do aluno do localStorage
    const curso = localStorage.getItem('cursoAluno');
    const estande = localStorage.getItem('estandeAluno');
    if (curso && estande) {
        escreverNaDiv(curso, estande);
        trocarImagem(curso)
    } else {
        console.log('Nenhum curso ou estande foi encontrado no localStorage.');
    }
});

(async () => {
    try {
        console.log('Tentando pegar o curso do aluno...');
        const { cursoAluno, estandeAluno } = await pegarCursoAluno();

        console.log('Curso obtido:', cursoAluno);
        if (cursoAluno && estandeAluno) {
            escreverNadiv(cursoAluno, estandeAluno);
        } else {
            console.log('Nenhum curso ou estande foi encontrado.');
        }
    } catch (error) {
        console.error('Erro ao carregar curso na div:', error); 
    }
})();
