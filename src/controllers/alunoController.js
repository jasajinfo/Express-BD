import {
    listarTodos,
    buscarPorId
} from '../repositories/alunoRepository.js'

async function listarAlunos(req, res) {
    try {
        const alunos = await listarTodos()

        res.status(200).json(alunos)

    } catch (error) {
        console.error(error)

        res.status(500).json({
            mensagem: 'Erro ao consultar alunos'
        })
    }
}

async function buscarAluno(req, res) {
    try {
        const { id } = req.params

        const aluno = await buscarPorId(id)

        if (!aluno) {
            return res.status(404).json({
                mensagem: 'Aluno não encontrado'
            })
        }

        res.status(200).json(aluno)

    } catch (error) {
        console.error(error)

        res.status(500).json({
            mensagem: 'Erro ao consultar aluno'
        })
    }
}

export {
    listarAlunos,
    buscarAluno
}