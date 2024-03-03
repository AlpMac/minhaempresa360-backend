import Router from 'express';
import database from '../config/database.js';

const buscaServicoCancelado = Router();
// ATENDIMENTO C igual a cancelado
buscaServicoCancelado.get("/busca-cancelamento-realizado", (req, res) => {


    let query = `SELECT 
                s.id AS id_servico,
                strftime('%d/%m/%Y',s.data_servico) as data_servico,
                s.valor,
                s.hora_marcada,
                c.rua,
                c.numero,
                c.cidade,
                c.nome AS nome_cliente,
                c.telefone,
                u.nome AS nome_atendente,
                s.status_servico
              FROM 
                tbl_servico AS s
              JOIN 
                tbl_clientes AS c ON s.cliente_id = c.id
              JOIN
                tbl_usuarios AS u ON s.usuario_id = u.id
              WHERE status_servico = 'C' ;`;

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

export default buscaServicoCancelado;
