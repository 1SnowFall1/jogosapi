import con from './connection.js';

export async function inserirJogo(jogo) {
    const comando =` 
    INSERT INTO tb_jogo (ds_titulo, ds_genero, nr_ano, vl_preco, img_capa, dt_inclusao)
    VALUES (?, ?, ?, ?, ?, ?);
    `;

    let resposta = await con.query(comando, [jogo.titulo, jogo.genero, jogo.ano, jogo.preco, jogo.img, jogo.inclusao]);
    let info = resposta[0];

    return info.insertId;
}

export async function consultarJogos() {
    const comando =` 
    SELECT id_jogo AS id,
           ds_titulo AS titulo,
           ds_genero AS genero,
           nr_ano AS ano,
           vl_preco AS preco,
           img_capa AS imagem,
           dt_inclusao AS inclusao
    FROM tb_jogo;`
    ;

    let resposta = await con.query(comando);
    let registros = resposta[0];

    return registros;
}

export async function alterarJogo(id, jogo) {
    const comando =` 
    UPDATE tb_jogo
    SET ds_titulo = ?,
        ds_genero = ?,
        nr_ano = ?,
        vl_preco = ?,
        img_capa = ?,
        dt_inclusao = ?
    WHERE id_jogo = ?;`
    ;

    let resposta = await con.query(comando, [jogo.titulo, jogo.genero, jogo.ano, jogo.preco, jogo.img, jogo.inclusao, id]);
    let info = resposta[0];

    return info.affectedRows;
}

export async function removerJogo(id) {
    const comando =` 
    DELETE FROM tb_jogo 
    WHERE id_jogo = ?;`
    ;

    let resposta = await con.query(comando, [id]);
    let info = resposta[0];

    return info.affectedRows;
}