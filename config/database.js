//arquivo para configuracao do sqlite3
import sqlite3 from "sqlite3";
//verbose para mostrar mensagens no console
const SQLite3 = sqlite3.verbose();
//cria um banco de dados
//Modo open_readwrite para leitura e escrita no banco de dados
const db = new SQLite3.Database('alpaclean.db', SQLite3.OPEN_READWRITE, 
        function(err){ 
                        if (err) {
                            console.log("Erro na aplicação bd : " +err.message);
                              }
                     });
//exporta o banco de dados para ser utilizado em outros arquivos

//funcao para ajudar a rodar as queries
function  query (command,params, method = 'all'){
    //utilizaremos promise para aguardar a resposta do banco de dados de sucesso ou erro
    return new Promise(function(resolve, reject) {
        //pega a query e executa pelo command e os parametros pelo params e verifica se houve erro ou nao
        db[method](command,params, function(err, rows){
            if(err){
                reject(err);
            }else{
                //retorna as linhas da query com sucesso
                 resolve(rows);
            }
        });
    });
}   

//Iremos exportar nossa funcao de query e o banco de dados para ser utilizado em outros arquivos
export default {db, query };