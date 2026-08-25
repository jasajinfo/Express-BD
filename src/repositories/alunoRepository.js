import pool from '../database/pool.js'

// READ — listar todos
async function findAll() {
    const [rows] = await pool.execute(
        'SELECT id, nome, curso FROM alunos ORDER BY id'
    )

    return rows
}

// READ — buscar por ID
async function findById(id) {
    const [rows] = await pool.execute(
        'SELECT id, nome, curso FROM alunos WHERE id = ?',
        [id]
    )

    return rows[0] || null
}

// CREATE — cadastrar
async function create(nome, curso) {
    const [result] = await pool.execute(
        'INSERT INTO alunos (nome, curso) VALUES (?, ?)',
        [nome, curso]
    )

    return {
        id: result.insertId,
        nome,
        curso
    }
}

// UPDATE — atualizar
async function update(id, nome, curso) {
    const [result] = await pool.execute(
        'UPDATE alunos SET nome = ?, curso = ? WHERE id = ?',
        [nome, curso, id]
    )

    return result.affectedRows > 0
}

// DELETE — excluir
async function remove(id) {
    const [result] = await pool.execute(
        'DELETE FROM alunos WHERE id = ?',
        [id]
    )

    return result.affectedRows > 0
}

export {
    findAll,
    findById,
    create,
    update,
    remove
}