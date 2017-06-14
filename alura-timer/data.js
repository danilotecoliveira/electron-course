const jsonfile = require("jsonfile-promised");
const fs = require("fs");

module.exports = {
    criaArquitoDeCurso(nomeArquivo, conteudoArquivo) {
        return jsonfile.writeFile(nomeArquivo, conteudoArquivo, { spaces: 2 })
                .then(() => {
                    console.log("Arquivo criado");
                }).catch((error) => {
                    console.log(error);
                });
    },
    adicionaTempoAoCurso(arquivoCurso, tempoDeEstudo) {
        let dados = { 
            ultimoEstudo: new Date().toString(), 
            tempo: tempoDeEstudo 
        };

        jsonfile.writeFile(arquivoCurso, dados, { spaces: 2 })
        .then(() => {
            console.log("Salvo com sucesso");
        }).catch((error) => {
            console.log(error)
        })
    },
    salvaDados(curso, tempoEstudado) {
        let arquivoCurso = __dirname + "/data/" + curso + ".json";
        if (fs.existsSync(arquivoCurso)) {
            this.adicionaTempoAoCurso(arquivoCurso, tempoEstudado);
        }
        else  {
            this.criaArquitoDeCurso(arquivoCurso, {}).then(() => {
                this.adicionaTempoAoCurso(arquivoCurso, tempoEstudado);
            });
        }
    },
    pegaDados(curso) {
        let arquivoDoCurso =__dirname + "/data/" + curso + ".json";
        return jsonfile.readFile(arquivoDoCurso);
    },
    pegaNomeDosCursos(){
        let arquivos = fs.readdirSync(__dirname + "/data/");
        let cursos = arquivos.map((arquivo) => {
            return arquivo.substr(0, arquivo.lastIndexOf("."));
        });

        return cursos;
    }
}