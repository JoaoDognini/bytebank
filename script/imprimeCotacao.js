const lista = document.querySelectorAll('[data-lista]');

function selecionaCotacao(nomeMoeda, valor) {
    lista.forEach((listaEscolhida) => {
        if (listaEscolhida.id == nomeMoeda) {
            imprimeCotacao(listaEscolhida, nomeMoeda, valor);
        }
    })
}

function imprimeCotacao(lista, nomeMoeda, valor) {
    lista.innerHTML = '';
    let descricaoMoeda;

    for (let i = 1; i <= 1000; i *= 10) {
        const listaItem = document.createElement('li');
        switch (nomeMoeda) {
            case 'dolar':
                descricaoMoeda = i > 1  ? 'dólares' : 'dólar';
                break;
            case 'iene':
                descricaoMoeda = i > 1 ? 'ienes' : 'iene';
                break;    
            case 'peso':
                descricaoMoeda = i > 1 ? 'pesos' : 'peso';
                break;    
            default:
                break;
        }

        listaItem.innerHTML = `${i} ${descricaoMoeda}: R$${(valor * i).toFixed(2)}`;
        lista.appendChild(listaItem);
    }
}

export default selecionaCotacao;