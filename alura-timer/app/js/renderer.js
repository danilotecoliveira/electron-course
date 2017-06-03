const { ipcRenderer } = require("electron");
const timer = require("./timer");

let linkSobre = document.querySelector("#link-sobre");
let botaoPlay = document.querySelector(".botao-play");
let tempo = document.querySelector(".tempo");
let curso = document.querySelector(".curso");

linkSobre.addEventListener("click" , function(){
    ipcRenderer.send("abrir-janela-sobre");
});

let imgs = ["img/play-button.svg", "img/stop-button.svg"];
let play = false;
botaoPlay.addEventListener("click", function() {
    if (play) {
        play = false;
        timer.parar(curso);
    }
    else {
        play = true;
        timer.iniciar(tempo);
    }

    imgs = imgs.reverse();    
    botaoPlay.src = imgs[0];
});