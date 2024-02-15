//iremos importar um validador de dados para verificar se os dados enviados pelo usuario estao corretos
import { body, validationResult } from 'express-validator';
import Router from 'express';
import { db } from '../../MinhaEmpresa360_/src/config/database.js';

const routeDellServicoProdutoUsado = Router();
  
//Middleware para verificar os dados enviados pelo usuario contra injecao de codigo
  const validateData = [
    body('id').isInt()
    
    
];

//metodo post para enviar dados
routeDellServicoProdutoUsado.post("/excluir-produto-usado",validateData, (req, res) => {
    // Verifica se houve erros de validação
    const errors = validationResult(validateData);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let query = `DELETE FROM tbl_servico_produto_usado
                  WHERE id = ?`;
//usaremos o req.body para pegar os parametros enviados pelo usuario atraves do corpo da requisicao
    let parametro = req.body;

    //req.body é desestruturado para extrair os campos necessários para inserção na tabela.
    //executando a query de select
    db.all(query,[parametro.id 
                  
                 ],function(err,rows){
      if(err){
        //caso haja erro, retorna o erro
        return res.status(500).send("Ocorreu algum erro" +err.message);
      }else{
        //retorno 201 para informar que foi criado com sucesso + mensagem de sucesso
        return res.status(201).json({ message: 'Produto usado excluido com sucesso!' });
      }
    });

    
  });

  export default routeDellServicoProdutoUsado;