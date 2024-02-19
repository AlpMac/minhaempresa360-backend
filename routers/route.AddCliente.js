//iremos importar um validador de dados para verificar se os dados enviados pelo usuario estao corretos
import { body, validationResult } from 'express-validator';
import Router from 'express';
import database from '../config/database.js';

const routeAddCliente = Router();
//Middleware para verificar os dados enviados pelo usuario contra injecao de codigo
const validateData = [
  body('nome').isString(),
  body('cidade').isString(),
  body('bairro').isString(),
  body('rua').isInt(),
  body('numero').isInt(),
  body('email').isEmail(),
  body('telefone').isInt()
];


//metodo post para enviar dados
routeAddCliente.post("/salvar-cliente",validateData, (req, res) => {

 // Verifica se houve erros de validação
 const errors = validationResult(validateData);
 if (!errors.isEmpty()) {
     return res.status(400).json({ errors: "Dados invalidos" + errors.array() });
 }

    let query = `INSERT INTO tbl_clientes (nome, cidade, bairro, rua, numero, email, telefone) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`;
//usaremos o req.body para pegar os parametros enviados pelo usuario atraves do corpo da requisicao
    let parametro = req.body;

    //req.body é desestruturado para extrair os campos necessários para inserção na tabela.
    //executando a query de select
    database.db.all(query,[parametro.nome, 
                  parametro.cidade,
                  parametro.bairro,
                  parametro.rua,
                  parametro.numero,
                  parametro.email,
                  parametro.telefone],function(err,rows){
      if(err){
        //caso haja erro, retorna o erro
        return res.status(500).send("Ocorreu algum erro" +err.message);
      }else{
        //retorno 201 para informar que foi criado com sucesso + mensagem de sucesso
        return res.status(201).json({ message: 'Cliente inserido com sucesso!' });
      }
    });

    
  });

  export default routeAddCliente;