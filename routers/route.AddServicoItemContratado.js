//iremos importar um validador de dados para verificar se os dados enviados pelo usuario estao corretos
import { body, validationResult } from 'express-validator';
import Router from 'express';
import { db } from '../../MinhaEmpresa360_/src/config/database.js';

const routeAddServicoItemContratado = Router();
  
//Middleware para verificar os dados enviados pelo usuario contra injecao de codigo
  const validateData = [
    body('id_servico').isInt(),
    body('id_itemDoServico').isInt(),
    body('id_variacaoItemDoServico').isInt(),
    body('id_tipoItemDoServico').isInt(),
    body('id_materialItemDoServico').isInt(),
    
];

//metodo post para enviar dados
routeAddServicoItemContratado.post("/salvar-servico-item-contratado",validateData, (req, res) => {
    // Verifica se houve erros de validação
    const errors = validationResult(validateData);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let query = `INSERT INTO tbl_servicoItemContratado (id_tbl_servico, id_tbl_itemDoServico, id_tbl_variacaoItemDoServico, id_tbl_tipoItemDoServico, id_tbl_materialItemDoServico)
    VALUES (?, ?, ?, ?, ?)`;
//usaremos o req.body para pegar os parametros enviados pelo usuario atraves do corpo da requisicao
    let parametro = req.body;

    //req.body é desestruturado para extrair os campos necessários para inserção na tabela.
    //executando a query de select
    db.all(query,[parametro.id_servico, 
                  parametro.id_itemDoServico,
                  parametro.id_variacaoItemDoServico,
                  parametro.id_tipoItemDoServico,
                  parametro.id_materialItemDoServico
                  
                 ],function(err,rows){
      if(err){
        //caso haja erro, retorna o erro
        return res.status(500).send("Ocorreu algum erro" +err.message);
      }else{
        //retorno 201 para informar que foi criado com sucesso + mensagem de sucesso
        return res.status(201).json({ message: 'Item do serviço inserido com sucesso!' });
      }
    });

    
  });

  export default  routeAddServicoItemContratado;