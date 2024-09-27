import * as db from '../repository/lojaVideogamesRepository.js';
import { Router } from 'express';

const endpoints = Router();

endpoints.get('/jogos', async (req, resp) => {
    try {
        let registros = await db.consultarJogos();
        resp.send(registros);
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

endpoints.post('/jogos', async (req, resp) => {
    try {
        let jogo = req.body;
        let id = await db.inserirJogo(jogo);
        resp.send({
            novoId: id
        });
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

endpoints.put('/jogos/:id', async (req, resp) => {
    try {
        let id = req.params.id;
        let jogo = req.body;
        let linhasAfetadas = await db.alterarJogo(id, jogo);
        if (linhasAfetadas >= 1) {
            resp.send();
        }
        else {
            resp.status(404).send({ erro: 'Nenhum registro encontrado' });
        }
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

endpoints.delete('/jogos/:id', async (req, resp) => {
    try {
        let id = req.params.id;
        let linhasAfetadas = await db.removerJogo(id);
        if (linhasAfetadas >= 1) {
            resp.send();
        }
        else {
            resp.status(404).send({ erro: 'Nenhum registro encontrado' });
        }
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

export default endpoints;