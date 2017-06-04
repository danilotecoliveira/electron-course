const { app, BrowserWindow, ipcMain } = require("electron");
const data = require("./data");

app.on("ready", () => {
    let mainWindow = new BrowserWindow({
        width: 600,
        height: 400
    });

    mainWindow.loadURL(`file://${__dirname}/app/index.html`);
});


app.on("window-all-closed", () => {
    app.quit();
});


let sobreWindow = null;
ipcMain.on("abrir-janela-sobre", () => {
    if (sobreWindow == null) {
        sobreWindow = new BrowserWindow({
            width: 300,
            height: 250,
            alwaysOnTop: true,
            frame: false
        });

        sobreWindow.on("closed", () => { sobreWindow = null; });
    }

    sobreWindow.loadURL(`file://${__dirname}/app/sobre.html`);
});


ipcMain.on("fechar-janela-sobre", () => {
    sobreWindow.close();
});


ipcMain.on("curso-parado", (event, curso, tempoEstudado) => {
    data.salvaDados(curso, tempoEstudado);
});