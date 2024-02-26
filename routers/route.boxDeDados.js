import Router from 'express';
import database from '../config/database.js';

const routeboxDeDados = Router();

routeboxDeDados.get("/box-dados", (req, res) => {
  const { startDate, endDate } = req.query;

  let query = `SELECT 
                status_servico,
                data_servico,
                COUNT(*) AS total,
                'R$ ' || FORMAT(SUM(valor), 2) AS total_valor_formatado
                    FROM 
                        tbl_servico
                    WHERE 
                        data_servico >= ? AND data_servico <= ?
                    GROUP BY 
                        status_servico ;`;

  // Executando a query de select com os parâmetros startDate e endDate
  database.db.all(query, [startDate, endDate], function(err, rows) {
    if (err) {
      // Caso haja erro, retorna o erro
      return res.status(500).send("Ocorreu algum erro: " + err.message);
    } else {
      // Caso não haja erro, retorna as linhas da query em formato json
      return res.status(200).json(rows);
    }
  });  
});

export default routeboxDeDados;
