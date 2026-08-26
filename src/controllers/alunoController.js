import * as alunoService from '../services/alunoService.js';

// LISTAR TODOS
export async function listarAlunos(req, res) {
    try {
        const alunos = await alunoService.findAll();

        return res.json(alunos);
    } catch (erro) {
        return res.status(500).json({
            erro: 'Erro ao listar alunos'
        });
    }
}


// BUSCAR POR ID
export async function buscarAluno(req, res) {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                erro: 'ID inválido'
            });
        }

        const aluno = await alunoService.findById(id);

        if (!aluno) {
            return res.status(404).json({
                erro: 'Aluno não encontrado'
            });
        }

        return res.json(aluno);

    } catch (erro) {
        return res.status(500).json({
            erro: 'Erro ao buscar aluno'
        });
    }
}


// CADASTRAR
export async function criarAluno(req, res) {
    try {
        const { nome, curso } = req.body;

        if (
            typeof nome !== 'string' || nome.trim() === '' ||
            typeof curso !== 'string' || curso.trim() === ''
        ) {
            return res.status(400).json({
                erro: 'Nome e curso são obrigatórios'
            });
        }

        const aluno = await alunoService.create(
            nome.trim(),
            curso.trim()
        );

        return res.status(201).json(aluno);

    } catch (erro) {
        return res.status(500).json({
            erro: 'Erro ao cadastrar aluno'
        });
    }
}


// ATUALIZAR
export async function atualizarAluno(req, res) {
    try {
        const id = Number(req.params.id);
        const { nome, curso } = req.body;

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                erro: 'ID inválido'
            });
        }

        if (
            typeof nome !== 'string' || nome.trim() === '' ||
            typeof curso !== 'string' || curso.trim() === ''
        ) {
            return res.status(400).json({
                erro: 'Nome e curso são obrigatórios'
            });
        }

        const aluno = await alunoService.update(
            id,
            nome.trim(),
            curso.trim()
        );

        if (!aluno) {
            return res.status(404).json({
                erro: 'Aluno não encontrado'
            });
        }

        return res.json(aluno);

    } catch (erro) {
        return res.status(500).json({
            erro: 'Erro ao atualizar aluno'
        });
    }
}


// EXCLUIR
export async function excluirAluno(req, res) {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                erro: 'ID inválido'
            });
        }

        const excluido = await alunoService.remove(id);

        if (!excluido) {
            return res.status(404).json({
                erro: 'Aluno não encontrado'
            });
        }

        return res.status(204).send();

    } catch (erro) {
        return res.status(500).json({
            erro: 'Erro ao excluir aluno'
        });
    }
}