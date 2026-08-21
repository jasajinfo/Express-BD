import express from 'express'

import {
    listarAlunos,
    buscarAluno
} from '../controllers/alunoController.js'

const router = express.Router()

// GET /alunos
// → executa listarAlunos do Controller
router.get('/', listarAlunos)

// GET /alunos/:id
// → executa buscarAluno do Controller
router.get('/:id', buscarAluno)

export default router