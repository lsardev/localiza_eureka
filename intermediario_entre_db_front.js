function imprimirNomeAluno() {
    // Selecionar o elemento com a classe "search"
    var searchInput = document.querySelector('.search');
    
    // Verificar se o elemento foi encontrado
    if (searchInput) {
        // Obter o valor do elemento
        var valor = searchInput.value;

        // Retornar o valor
        return valor;
    } else {
        console.error('O elemento com a classe "search" não foi encontrado.');
        return null;
    }
}

function irParaPaginaMapa() {
    imprimirNomeAluno()
    window.location.href = "pagina_mapa.html";
}

function buscarUsuarios() {
    var valorBusca = imprimirNomeAluno();

    if (valorBusca) {
        // Fazer uma requisição ao servidor para buscar os usuários
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