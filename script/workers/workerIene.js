async function conectaAPI() {
    const conecta = await fetch('https://economia.awesomeapi.com.br/last/JPY-BRL');
    const conectaConvertido = await conecta.json();
    postMessage(conectaConvertido.JPYBRL);
}

addEventListener('message', () => {
    conectaAPI();
    setInterval(() => conectaAPI(), 5000);
})