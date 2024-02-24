import { Router } from 'express';
import database from '../config/database.js';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const routeverificaLoginGeratoken = Router();

// Função para gerar uma chave secreta usando um algoritmo de criptografia e um salt
function gerarChaveSecreta() {
    // Defina seu salt
    const salt = 'Alpande@1904'; // Isso pode ser qualquer string única

    // Use um algoritmo de criptografia (por exemplo, 'sha256') para criar uma chave secreta baseada no salt
    return crypto.createHash('sha256').update(salt).digest('hex');
}

// Função para gerar o token
function gerarToken(payload) {
    // Obtenha a chave secreta
    const chaveSecreta = gerarChaveSecreta();

    // Assine o token com a chave secreta e defina um tempo de expiração
    return jwt.sign(payload, chaveSecreta, { expiresIn: '1h' }); // Expira em 1 hora
}

// Rota para login (POST /Verifica-Login)
routeverificaLoginGeratoken.post("/Verifica-Login", [
    body('email').isString().notEmpty(),
    body('senha').isString().notEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: "Dados inválidos", details: errors.array() });
    }

    const { email, senha } = req.body;

    let query = `SELECT * FROM tbl_usuarios WHERE email = ? AND senha_hash = ?`;

    database.db.all(query, [email, senha], function(err, rows) {
        if (err) {
            return res.status(500).send("Ocorreu um erro ao tentar fazer login: " + err.message);
        }

        if (rows.length === 0) {
         
          return res.status(401).json({ message: "Credenciais inválidas" });
        }

        const token = gerarToken({ userId: rows[0].id });
        const id = rows[0].id;
        return res.status(200).json({ token, userId:id });
    });
});

export default routeverificaLoginGeratoken;
