import pool from '../database/pool.js'

async function listarTodos() {
    const [rows] = await pool.query(
        'SELECT * FROM alunos'
    )

    return rows
}

async function buscarPorId(id) {
    const [rows] = await pool.query(
        'SELECT * FROM alunos WHERE id = ?',
        [id]
    )

    return rows[0]
}

export {
    listarTodos,
    buscarPorId
}