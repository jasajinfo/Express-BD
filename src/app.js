import express from 'express'
import alunoRoutes from './routes/alunoRoutes.js'

// ANTIGO:
// O pool era importado diretamente no app.js.
// Na nova arquitetura, o acesso ao banco ficará no Repository.
// import pool from './database/pool.js'

const app = express()

// Express interpreta o corpo (body) como JSON
app.use(express.json())


// ======================================================
// CÓDIGO ANTIGO - MOCK EM MEMÓRIA
// ======================================================

// const alunos = [
//     { id: 1, nome: 'Bruno', curso: 'ADS' },
//     { id: 2, nome: 'Maria', curso: 'ADS' },
//     { id: 3, nome: 'Lara', curso: 'ADS' },
//     { id: 4, nome: 'José', curso: 'ADS' }
// ]


// ======================================================
// FUNÇÕES AUXILIARES ANTIGAS
// ======================================================

// function buscarAlunoPorId(id) {
//     return alunos.filter(aluno => aluno.id == id)
// }

// function buscarIndexAluno(id) {
//     return alunos.findIndex(aluno => aluno.id == id)
// }


// ======================================================
// ROTA RAIZ - CONTINUA ATIVA
// ======================================================

app.get('/', (req, res) => {
    res.send('Minha API REST com Express')
})


// ======================================================
// ROTAS ANTIGAS - MOCK
// ======================================================

// GET - listar todos os alunos do array
//
// app.get('/alunos', (req, res) => {
//     res.status(200).send(alunos)
// })


// POST - cadastrar aluno no array
//
// app.post('/alunos', (req, res) => {
//     alunos.push(req.body)
//
//     res.status(201).send(
//         'Aluno cadastrado com sucesso!'
//     )
// })


// DELETE - excluir aluno do array
//
// app.delete('/alunos/:id', (req, res) => {
//     let index = buscarIndexAluno(req.params.id)
//
//     alunos.splice(index, 1)
//
//     res.send(
//         `Aluno com id ${req.params.id} excluido com sucesso`
//     )
// })


// GET por ID - buscar no array
//
// app.get('/alunos/:id', (req, res) => {
//     let aluno = buscarAlunoPorId(req.params.id)
//
//     res.send(aluno)
// })


// PUT - atualizar aluno no array
//
// app.put('/alunos/:id', (req, res) => {
//     let index = buscarIndexAluno(req.params.id)
//
//     alunos[index].nome = req.body.nome
//     alunos[index].curso = req.body.curso
//
//     res.send(alunos)
// })


// ======================================================
// ACESSO DIRETO AO MYSQL - VERSÃO INTERMEDIÁRIA
// ======================================================

// Esta versão também ficará comentada porque agora
// utilizaremos Route -> Controller -> Repository -> MySQL.


// GET /alunos diretamente pelo pool
//
// app.get('/alunos', async (req, res) => {
//     try {
//
//         const [rows] = await pool.query(
//             'SELECT * FROM alunos'
//         )
//
//         res.status(200).json(rows)
//
//     } catch (error) {
//
//         console.error(error)
//
//         res.status(500).json({
//             mensagem: 'Erro ao consultar alunos'
//         })
//     }
// })


// GET /alunos/:id diretamente pelo pool
//
// app.get('/alunos/:id', async (req, res) => {
//     try {
//
//         const { id } = req.params
//
//         const [rows] = await pool.query(
//             'SELECT * FROM alunos WHERE id = ?',
//             [id]
//         )
//
//         if (rows.length === 0) {
//             return res.status(404).json({
//                 mensagem: 'Aluno não encontrado'
//             })
//         }
//
//         res.status(200).json(rows[0])
//
//     } catch (error) {
//
//         console.error(error)
//
//         res.status(500).json({
//             mensagem: 'Erro ao consultar aluno'
//         })
//     }
// })


// ======================================================
// NOVA ARQUITETURA - ATIVA
// ======================================================

// Todas as rotas iniciadas por /alunos serão encaminhadas
// para alunoRoutes.js.

app.use('/alunos', alunoRoutes)


// ======================================================
// EXPORTAÇÃO DA APLICAÇÃO
// ======================================================

export default app