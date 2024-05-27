var cursoAluno;

function imprimirNomeAluno() {
    const searchInput = document.querySelector('.search');

    console.log(searchInput)

    if (searchInput) {
        var valor = searchInput.value
        console.log('Valor do nome do aluno:', valor);
        return valor;
    } else {
        console.error('O elemento com a classe "search" não foi encontrado.');
    }
}

async function pegarCursoAluno() {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            try {
                const nomeAluno = imprimirNomeAluno();
                if (!nomeAluno) {
                    throw new Error('Nome do aluno não pode ser vazio');
                }
                const response = await fetch(`http://localhost:3000/buscarAluno1?nomeAluno=${encodeURIComponent(nomeAluno)}`);
                if (!response.ok) {
                    throw new Error(`Erro ao buscar curAluno: ${response.statusText} (status: ${response.status})`);
                }
                const dadosAluno = await response.json();

                cursoAluno = dadosAluno[0]["curTrabalho"];
                console.log('Curso do aluno:', cursoAluno);
                resolve(cursoAluno);

            } catch (error) {
                console.error('Erro ao buscar o curso do aluno:', error);
                reject(error);
            }
        }, 5000); // Atraso de 5 segundos
    });
}

async function irParaPaginaMapa() {

    console.log(pegarCursoAluno())
    try {
        const curso = pegarCursoAluno();
        if (curso) {
            window.location.href = "pagina_mapa.html";
            escreverNaDiv(curso);
        }
    } catch (error) {
        console.error('Erro ao redirecionar para a página do mapa:', error);
    }
}

function escreverNaDiv(cursoAluno) {
    const titulo_curso = document.querySelector('#titulo_curso a');
    if (titulo_curso) {
        titulo_curso.textContent = cursoAluno;
    } else {
        console.error('O elemento com a id "titulo_curso" não foi encontrado.');
    }

    const numero_estande = document.querySelector('#destaque a');
    if (numero_estande) {
        numero_estande.textContent = '55';
    } else {
        console.error('O elemento com a id "destaque" não foi encontrado.');
    }
}

function buscarUsuarios() {
    var valorBusca = imprimirNomeAluno();
    if (valorBusca) {
        fetch(`http://localhost:3000/buscarAluno1?nomeAluno=${valorBusca}`)
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

document.addEventListener('DOMContentLoaded', function() {
    var buscarUsuariosBtn = document.getElementById('buscarUsuariosBtn');
    if (buscarUsuariosBtn) {
        buscarUsuariosBtn.addEventListener('click', buscarUsuarios);
    } else {
        console.error('O botão buscar usuários não foi encontrado.');
    }
});

window.addEventListener('load', async () => {

    try {
        console.log('Tentando pegar o curso do aluno...');
        const curso = pegarCursoAluno(); 
        console.log('Curso obtido:', curso);
        if (curso) {
            escreverNaDiv(curso); 
        } else {
            console.log('Nenhum curso foi encontrado.');
        }
    } catch (error) {
        console.error('Erro ao carregar curso na div:', error); 
    }
});