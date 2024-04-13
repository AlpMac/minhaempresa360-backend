//iremos importar um validador de dados para verificar se os dados enviados pelo usuario estao corretos
import { body, validationResult } from 'express-validator';
import Router from 'express';
import database from '../config/database.js';

const routeAddServico = Router();

// Middleware para verificar os dados enviados pelo usuário contra injeção de código
const validateData = [
    body('data_servico').isDate(),
    body('valor').isNumeric(),
    body('observacao').isString(),
    body('cliente_id').isInt(),
    body('hora_marcada').isString(),
    body('usuario_id').isInt(),
    body('itens_contratados.*.id_tbl_tipoItemDoServico').isInt(),
    body('itens_contratados.*.valorCobrado').isNumeric()
];

// método post para enviar dados
routeAddServico.post("/salvar-servico", validateData, (req, res) => {
    // Verifica se houve erros de validação
    const errors = validationResult(validateData);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let query = `INSERT INTO tbl_servico (data_servico, valor, observacao, cliente_id, hora_marcada, usuario_id, status_servico) 
                 VALUES (?, ?, ?, ?, ?, ?, 'A')`;
    let params = [
        req.body.data_servico,
        req.body.valor,
        req.body.observacao,
        req.body.cliente_id,
        req.body.hora_marcada,
        req.body.usuario_id
    ];

    database.db.run(query, params, function (err) {
        if (err) {
            return res.status(500).send("Ocorreu algum erro" + err.message);
        }
      //retorna o id do servico inserido no banco e faz o cadastro dos itens contratados
        const servicoId = this.lastID;
        const itensContratados = req.body.itens_servico;
      

        if (!itensContratados || itensContratados.length === 0) {
            return res.status(400).json({ message: 'Nenhum item do serviço foi enviado.' });
        }

        const insertItemQuery = `INSERT INTO tbl_servicoItemContratado (id_tbl_servico, id_tbl_tipoItemDoServico, valor_cobrado) VALUES (?, ?, ?)`;
        itensContratados.forEach(item => {
            database.db.run(insertItemQuery, [servicoId, item.codigoItemContratado, item.valorCobrado], function (err) {
                if (err) {
                    console.error("Erro ao inserir item do serviço:", err);
                }
            });
        });

        return res.status(201).json({ message: 'Serviço e itens inseridos com sucesso!' });
    });
});

export default routeAddServico;