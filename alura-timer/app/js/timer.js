const moment = require("moment");
let segundos = 0;
let timer;

module.exports = {
    iniciar(el) {
        let tempo = moment.duration(el.textContent);
        segundos = tempo.asSeconds();
        clearInterval(timer);
        timer = setInterval(() => {
            segundos++;
            el.textContent = this.segundosParaTempo(segundos);
        }, 1000);
    },
    parar() {
        clearInterval(timer);
    },
    segundosParaTempo(segundos) {
        return moment().startOf("day").seconds(segundos).format("HH:mm:ss");
    }
}