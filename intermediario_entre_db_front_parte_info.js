function imprimirNomeAluno() {
    var searchInput = document.querySelector('.search');
    if (searchInput) {
        var valor = searchInput.value.trim(); // Remover espaços em branco
        console.log('Valor do nome do aluno:', valor);
        return valor;
    } else {
        console.error('O elemento com a classe "search" não foi encontrado.');
        return null;
    }
}

async function pegarProjetoAluno() {
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
                tituloTrabalho = dadosAluno[0]["tituloTrabalho"];

                // Armazena os dados no localStorage
                localStorage.setItem('tituloTrabalho', tituloTrabalho);

                console.log(tituloTrabalho)
                resolve(tituloTrabalho);
            } catch (error) {
                console.error('Erro ao buscar o curso do aluno:', error);
                reject(error);
            }
        }, 2000); // Atraso de 2 segundos
    });
}

window.onload = function() {
    var paragrafos = document.getElementsByClassName('orientador');
    if (paragrafos.length > 0) {
        paragrafos[0].textContent = 'João';
    }
}
