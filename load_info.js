window.onload = function() {
    console.log("load_info.js script loaded");

    // Função para obter os parâmetros da URL
    function getQueryParams() {
        const params = {};
        const queryString = window.location.search.substring(1);
        const regex = /([^&=]+)=([^&]*)/g;
        let match;
        while (match = regex.exec(queryString)) {
            params[decodeURIComponent(match[1])] = decodeURIComponent(match[2]);
        }
        return params;
    }

    // Pegar o parâmetro "orientador"
    const params = getQueryParams();
    if (params.orientador) {
        console.log("Orientador:", params.orientador); // Adicione este log
        // Atualizar o conteúdo do elemento com a classe "orientador"
        document.querySelector('.orientador').textContent = "Dr João Ricardo";
    }
};