import Router from 'express';
import database from '../config/database.js';

const routeServicoCancelar = Router();

routeServicoCancelar.post("/", (req, res) => {
  const { id_servico } = req.body;

  if (!id_servico) {
    return res.status(400).json({ error: 'ID do serviço é necessário' });
  }

  const query = `UPDATE tbl_servico 
                 SET status_servico = 'C' 
                 WHERE id = ?`;

  database.db.run(query, [id_servico], function(err) {
    if (err) {
      return res.status(500).send("Ocorreu algum erro" + err.message);
    } else {
      return res.status(200).json({ message: 'Serviço cancelado com sucesso' });
    }
  });
});

export default routeServicoCancelar;
