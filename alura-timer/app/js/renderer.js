const { ipcRenderer } = require("electron");
const timer = require("./timer");
const data = require("../../data");

let linkSobre = document.querySelector("#link-sobre");
let botaoPlay = document.querySelector(".botao-play");
let tempo = document.querySelector(".tempo");
let curso = document.querySelector(".curso");
let botaoAdicionar = document.querySelector(".botao-adicionar");
let campoAdicionar = document.querySelector(".campo-adicionar");

window.onload = () => {
    data.pegaDados(curso.textContent)
    .then((dados) => {
        console.log(dados);
        tempo.textContent = dados.tempo;
    });
}

linkSobre.addEventListener("click" , function(){
    ipcRenderer.send("abrir-janela-sobre");
});

let imgs = ["img/play-button.svg", "img/stop-button.svg"];
let play = false;
botaoPlay.addEventListener("click", function() {
    if (play) {
        play = false;
        timer.parar(curso.textContent);
        new Notification("Timesheet", 
            { body: `A tarefa ${curso.textContent} foi parada.`, icon: "img/stop-button.png" }
        );
    }
    else {
        play = true;
        timer.iniciar(tempo);
        new Notification("Timesheet", 
            { body: `A tarefa ${curso.textContent} foi iniciada`, icon: "img/play-button.png" }
        );
    }

    imgs = imgs.reverse();    
    botaoPlay.src = imgs[0];
});

botaoAdicionar.addEventListener("click", function() {

    if (campoAdicionar.value == "") {
        console.log("Nome da tarefa obrigatório");
        return;
    }
    let novoCurso = campoAdicionar.value;
    curso.textContent = novoCurso;
    tempo.textContent = "00:00:00";
    campoAdicionar.value = "";

    ipcRenderer.send("curso-adicionado", novoCurso);
});

ipcRenderer.on("curso-trocado", (event, nomeCurso) => {
    timer.parar(curso.textContent);

    data.pegaDados(nomeCurso)
    .then((dados) => {
        tempo.textContent = dados.tempo;
    }).catch((err) => {
        console.log("A tarefa não possui um JSON");
        tempo.textContent = "00:00:00";
    });

    curso.textContent = nomeCurso;
});

ipcRenderer.on("atalho-iniciar-parar", () => {
    let click = new MouseEvent("click");
    botaoPlay.dispatchEvent(click);
});