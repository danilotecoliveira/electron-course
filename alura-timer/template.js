const data = require("./data");
const { ipcMain } = require("electron");

module.exports = {
    templateInicial: null,
    geraTrayTemplate(win) {
        let template = [
            {
                "label": "cursos"
            },
            {
                type: "separator"
            }
        ];

        let cursos = data.pegaNomeDosCursos();

        cursos.forEach((curso) => {
            let menuItem = {
                "label": curso, 
                type: "radio",
                click: () => {
                    win.send("curso-trocado", curso);
                }
            }

            this.templateInicial = template;

            template.push(menuItem);
        });

        
        return template;
    },
    adicionaCursoNoTray(curso, win) {
        this.templateInicial.push(
            {
                "label": curso, 
                type: "radio",
                checked: true,
                click: () => { 
                    win.send("curso-trocado", curso);
                }
        });

        return this.templateInicial;
    },
    geraMenuPrincipalTemplate(app) {
        let templateMenu = [
            {
                label: "View",
                submenu: 
                [ 
                    { 
                        role: "reload" 
                    },
                    {
                        role: "toggledevtools" 
                    }
                ]
            },
            {
                label: "Window",
                submenu: 
                [ 
                    { 
                        role: "minimize", 
                        accelerator: "Alt+M"
                    },
                    {
                        role: "close" 
                    }
                ]
            }//,
            // { 
            //     label: "Sobre",
            //     submenu: [ 
            //         { 
            //             label: "Sobre o Alura Timer",
            //             accelerator: "CmdOrCtrl+I",
            //             click: () => {
            //                 ipcMain.emit("abrir-janela-sobre");
            //             }
            //         } 
            //     ]
            // }
        ];

        if (process.platform == "darwin") {
            templateMenu.unshift(
                {
                    label: app.getName(),
                    submenu: [{label: "Mac OS"}]
                }
            );
        }

        return templateMenu;
    }
}