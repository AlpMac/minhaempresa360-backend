//iremos importar um validador de dados para verificar se os dados enviados pelo usuario estao corretos
import { body, validationResult } from 'express-validator';
import Router from 'express';
import database from '../config/database.js';

const routeDellServicoItemContratado = Router();
  
//Middleware para verificar os dados enviados pelo usuario contra injecao de codigo
  const validateData = [
    //atencao esse id é da tabela tbl_servicoItemContratado
    body('id').isInt()
    
];

//metodo post para enviar dados
routeDellServicoItemContratado.post("/alterar-servico-exluir-item-contratado",validateData, (req, res) => {
    // Verifica se houve erros de validação
    const errors = validationResult(validateData);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let query = `DELETE FROM tbl_servicoItemContratado
    WHERE id = ? `;
//usaremos o req.body para pegar os parametros enviados pelo usuario atraves do corpo da requisicao
    let parametro = req.body;

    //req.body é desestruturado para extrair os campos necessários para inserção na tabela.
    //executando a query de select
    database.db.all(query,[
                    parametro.id

                 ],function(err,rows){
      if(err){
        //caso haja erro, retorna o erro
        return res.status(500).send("Ocorreu algum erro" +err.message);
      }else{
        //retorno 201 para informar que foi criado com sucesso + mensagem de sucesso
        return res.status(201).json({ message: 'Item do serviço excluido com sucesso!' });
      }
    });

    
  });

  export default  routeDellServicoItemContratado;