const jsonfile = require("jsonfile-promised");
const fs = require("fs");

module.exports = {
    criaArquitoDeCurso(nomeArquivo, conteudoArquivo) {
        return jsonfile.writeFile(nomeArquivo, conteudoArquivo)
                .then(() => {
                    console.log("Arquivo criado");
                }).catch((error) => {
                    console.log(error);
                });
    },
    salvaDados(curso, tempoEstudado) {
        let arquivoCurso = __dirname + "/data/" + curso + ".json";
        if (fs.existsSync(arquivoCurso)) {
            //
        }
        else  {
            this.criaArquitoDeCurso(arquivoCurso, {}).then(() => {
                //
            });
        }
    }
}