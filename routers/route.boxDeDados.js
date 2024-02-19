import Router from 'express';
import database from '../config/database.js';

const routeboxDeDados = Router();

routeboxDeDados.get("/box-dados", (req, res) => {
    let query = `SELECT 
                status_servico,
                COUNT(*) AS total,
                'R$ ' || FORMAT(SUM(valor), 2) AS total_valor_formatado
                    FROM 
                        tbl_servico
                    GROUP BY 
                        status_servico ;`;

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

export default routeboxDeDados;
