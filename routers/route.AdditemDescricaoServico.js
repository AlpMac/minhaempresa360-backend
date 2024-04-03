import { body, validationResult } from 'express-validator';
import Router from 'express';
import database from '../config/database.js';

const routeAdditemDescricaoServico = Router();

// Middleware para validar os dados enviados pelo usuário
const validateData = [
  body('itemDescricaoServico').isString(),
  body('tempoExecucao').isInt(),
  body('valorRecomendado').isFloat()
];

// Rota POST para salvar a descrição do item de serviço
routeAdditemDescricaoServico.post("/salvar-descricao-item-servico", validateData, (req, res) => {
  // Verifica se houve erros de validação
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: "Dados inválidos, preencha os dados corretamente", details: errors.array() });
  }

  let query = `INSERT INTO tbl_tiposItemDoServico
               (itemDescricaoServico, tempoExecucao, valorRecomendado) 
               VALUES (?, ?, ?)`;

  // Extrai os parâmetros do corpo da requisição (req.body)
  let parametro = req.body;

  // Executa a query de inserção na tabela
  database.db.all(query, [
    parametro.itemDescricaoServico, 
    parametro.tempoExecucao,
    parametro.valorRecomendado
  ], function(err, rows) {
    if (err) {
      // Retorna um erro 500 se ocorrer algum problema na inserção
      return res.status(500).send("Ocorreu um erro: " + err.message);
    } else {
      // Retorna um status 201 para indicar sucesso na inserção e uma mensagem de sucesso
      return res.status(201).json({ 
        message: 'ITEM DO SERVIÇO INSERIDO COM SUCESSO!',
        itemDescricaoServico: parametro.itemDescricaoServico
      });
    }
  });
});

export default routeAdditemDescricaoServico;
