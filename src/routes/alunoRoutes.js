import express from 'express'

import {
    listarAlunos,
    buscarAluno,
    criarAluno,
    atualizarAluno,
    excluirAluno
} from '../controllers/alunoController.js'

const router = express.Router()

router.post('/', criarAluno)
router.get('/', listarAlunos)
router.get('/:id', buscarAluno)
router.put('/:id', atualizarAluno)
router.delete('/:id', excluirAluno)

export default router
