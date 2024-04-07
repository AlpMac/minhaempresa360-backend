import Router from 'express';
import database from '../config/database.js';

const routeBuscatiposItensDoServico = Router();
// ATENDIMENTO S igual a SALVO - EXECUTADO
routeBuscatiposItensDoServico.get("/buscar-itens-servico", (req, res) => {


    let query = `SELECT * FROM tbl_tiposItemDoServico`;

    //executando a query de select
    database.db.all(query,[],function(err,rows){
      if(err){
        //caso haja erro, retorna o erro
        return res.status(500).send("Ocorreu algum erro" +err.message);
      }else{
        //caso nao haja erro, retorna as linhas da query em formato json
        return res.status(200).json(rows);
      }
    });  
});

export default routeBuscatiposItensDoServico;
