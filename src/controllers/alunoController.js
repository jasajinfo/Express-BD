import {
    findAll,
    findById,
    create,
    update,
    remove
} from '../repositories/alunoRepository.js'

function idInvalido(id) {
    return !Number.isInteger(id) || id <= 0
}

function dadosInvalidos(nome, curso) {
    return (
        typeof nome !== 'string' || nome.trim() === '' ||
        typeof curso !== 'string' || curso.trim() === ''
    )
}

async function listarAlunos(req, res) {
    try {
        const alunos = await findAll()
        return res.status(200).json(alunos)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            mensagem: 'Erro ao consultar alunos'
        })
    }
}

async function buscarAluno(req, res) {
    try {
        const id = Number(req.params.id)

        if (idInvalido(id)) {
            return res.status(400).json({
                mensagem: 'ID inválido'
            })
        }

        const aluno = await findById(id)

        if (!aluno) {
            return res.status(404).json({
                mensagem: 'Aluno não encontrado'
            })
        }

        return res.status(200).json(aluno)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            mensagem: 'Erro ao consultar aluno'
        })
    }
}

async function criarAluno(req, res) {
    try {
        const { nome, curso } = req.body

        if (dadosInvalidos(nome, curso)) {
            return res.status(400).json({
                mensagem: 'Nome e curso são obrigatórios'
            })
        }

        const aluno = await create(nome, curso)

        return res
            .location(`/alunos/${aluno.id}`)
            .status(201)
            .json(aluno)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            mensagem: 'Erro ao cadastrar aluno'
        })
    }
}

async function atualizarAluno(req, res) {
    try {
        const id = Number(req.params.id)
        const { nome, curso } = req.body

        if (idInvalido(id)) {
            return res.status(400).json({
                mensagem: 'ID inválido'
            })
        }

        if (dadosInvalidos(nome, curso)) {
            return res.status(400).json({
                mensagem: 'Nome e curso são obrigatórios'
            })
        }

        const aluno = await update(id, {
            nome: nome.trim(),
            curso: curso.trim()
        })

        if (!aluno) {
            return res.status(404).json({
                mensagem: 'Aluno não encontrado'
            })
        }

        return res.status(200).json(aluno)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            mensagem: 'Erro ao atualizar aluno'
        })
    }
}

async function excluirAluno(req, res) {
    try {
        const id = Number(req.params.id)

        if (idInvalido(id)) {
            return res.status(400).json({
                mensagem: 'ID inválido'
            })
        }

        const removido = await remove(id)

        if (!removido) {
            return res.status(404).json({
                mensagem: 'Aluno não encontrado'
            })
        }

        return res.status(204).send()
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            mensagem: 'Erro ao excluir aluno'
        })
    }
}

export {
    listarAlunos,
    buscarAluno,
    criarAluno,
    atualizarAluno,
    excluirAluno
}
