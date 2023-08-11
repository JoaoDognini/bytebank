import selecionaCotacao from "./imprimeCotacao.js";

const iene = 'iene';
const dolar = 'dolar';
const peso = 'peso';

const graficoDolar = document.getElementById('graficoDolar');
const graficoParaDolar = new Chart(graficoDolar, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Dólar',
      data: [],
      borderWidth: 1
    }]
  },
});

const graficoIene = document.getElementById('graficoIene');
const graficoParaIene = new Chart(graficoIene, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Iene',
      data: [],
      borderWidth: 1
    }]
  }
})

const graficoPeso = document.getElementById('graficoPeso');
const graficoParaPeso = new Chart(graficoPeso, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Peso argentino',
      data: [],
      borderWidth: 1
    }]
  }
})

let workerDolar = new Worker('./script/workers/workerDolar.js');
workerDolar.postMessage('usd');
workerDolar.addEventListener('message', event => {
  geraAtualizacaoTabela(graficoParaDolar, event.data.ask, dolar);
})

let workerIene = new Worker('./script/workers/workerIene.js');
workerIene.postMessage('iene');
workerIene.addEventListener('message', event => {
  geraAtualizacaoTabela(graficoParaIene, event.data.ask, iene);
})

let workerPeso = new Worker('./script/workers/workerPeso.js');
workerPeso.postMessage('ars');
workerPeso.addEventListener('message', event => {
  geraAtualizacaoTabela(graficoParaPeso, event.data.ask, peso);
})

function geraHorario() {
  let data = new Date();
  let horario = `${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`
  return horario;
}

function adicionarDados(grafico, legenda, dados) {
  grafico.data.labels.push(legenda);
  grafico.data.datasets.forEach((dataset) => {
    dataset.data.push(dados);
  })
  grafico.update();
}

function geraAtualizacaoTabela(grafico, valor, moeda) {
  let tempo = geraHorario();
  selecionaCotacao(moeda, valor);
  adicionarDados(grafico, tempo, valor);
}