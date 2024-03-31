//iremos importar um validador de dados para verificar se os dados enviados pelo usuario estao corretos
import { body, validationResult } from 'express-validator';
import Router from 'express';
import database from '../config/database.js';

const routeAddServico = Router();
  
//Middleware para verificar os dados enviados pelo usuario contra injecao de codigo
  const validateData = [
    body('data_servico').isDate(),
    body('valor').isNumeric(),
    body('observacao').isString(),
    body('cliente_id').isInt(),
    body('hora_marcada').isString(),
    body('usuario_id').isInt()
];

//metodo post para enviar dados
routeAddServico.post("/salvar-servico",validateData, (req, res) => {

    // Verifica se houve erros de validação
    const errors = validationResult(validateData);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors:  errors.array() });
    }

    let query = `INSERT INTO tbl_servico (data_servico, valor, observacao, cliente_id, hora_marcada, usuario_id,status_servico) 
    VALUES (?, ?, ?, ?, ? , ?,'A')`;
//usaremos o req.body para pegar os parametros enviados pelo usuario atraves do corpo da requisicao
    let parametro = req.body;

    //req.body é desestruturado para extrair os campos necessários para inserção na tabela.
    //executando a query de select
    database.db.all(query,[parametro.data_servico, 
                  parametro.valor,
                  parametro.observacao,
                  parametro.cliente_id,
                  parametro.hora_marcada,
                  parametro.usuario_id
                 ],function(err,rows){
      if(err){
        //caso haja erro, retorna o erro
        return res.status(500).send("Ocorreu algum erro" +err.message);
      }else{
        //retorno 201 para informar que foi criado com sucesso + mensagem de sucesso
        return res.status(201).json({ message: 'Serviço inserido com sucesso!' });
      }
    });

    
  });

  export default routeAddServico;