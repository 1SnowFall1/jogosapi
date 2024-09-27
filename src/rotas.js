import lojaVideogamesController from './controller/lojaVideogamesController.js';

export default function adicionarRotas(servidor) {
    servidor.use(lojaVideogamesController);
}