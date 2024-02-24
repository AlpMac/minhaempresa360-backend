//iremos importar um validador de dados para verificar se os dados enviados pelo usuario estao corretos
import { body, validationResult } from 'express-validator';
import Router from 'express';
import database from '../config/database.js';

const routeSalvarTokenBD = Router();
//Middleware para verificar os dados enviados pelo usuario contra injecao de codigo
const validateData = [
  body('id').isInt(),
  body('token').isString(),

];


//metodo post para enviar dados
routeSalvarTokenBD.post("/salvar-token",validateData, (req, res) => {

 // Verifica se houve erros de validação
 const errors = validationResult(validateData);
 if (!errors.isEmpty()) {
     return res.status(400).json({ errors: "Dados invalidos" + errors.array() });
 }


 // Obtém a data e hora atuais em UTC
const dataAtualUTC = new Date();

// Obtém o deslocamento de fuso horário em minutos
const deslocamentoFusoHorarioMinutos = dataAtualUTC.getTimezoneOffset();

// Calcula a data e hora local subtraindo o deslocamento do fuso horário em minutos
const dataHoraLocal = new Date(dataAtualUTC.getTime() - (deslocamentoFusoHorarioMinutos * 60000));
// Converte a data e hora local para o formato de data e hora do SQLite
const dataHoraLocalFormatada = new Date(dataHoraLocal).toISOString().slice(0, 19).replace('T', ' ');
// Agora você pode usar dataHoraLocal para enviar a hora local para o servidor
 let query = `INSERT INTO tbl_tokens (user_id, token, created_at) VALUES (?, ?, ?)`;
//usaremos o req.body para pegar os parametros enviados pelo usuario atraves do corpo da requisicao
    let parametro = req.body;

    //req.body é desestruturado para extrair os campos necessários para inserção na tabela.
    //executando a query de select
    database.db.all(query,[parametro.userId, 
                  parametro.token,dataHoraLocalFormatada
                  ],function(err,rows){
      if(err){
        //caso haja erro, retorna o erro
        return res.status(500).send("Ocorreu algum erro salva token" +err.message);
      }else{
        //retorno 201 para informar que foi criado com sucesso + mensagem de sucesso
        return res.status(201).json({ message: 'Registro de login com sucesso direncionando!' });
      }
    });

    
  });

  export default routeSalvarTokenBD;