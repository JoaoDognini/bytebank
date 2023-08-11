async function conectaAPI() {
    const conecta = await fetch('https://economia.awesomeapi.com.br/last/ARS-BRL');
    const conectaConvertido = await conecta.json();
    postMessage(conectaConvertido.ARSBRL);
}

addEventListener('message', () => {
    conectaAPI();
    setInterval(() => conectaAPI(), 5000);
})