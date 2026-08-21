import app from './app.js'
import pool from './database/pool.js'

// ======================================================
// CONFIGURAÇÃO DA PORTA
// ======================================================

// A porta é obtida do arquivo .env.
// Caso PORT não esteja definida, utiliza 3000.
const port = Number(process.env.PORT) || 3000


// ======================================================
// CÓDIGO ANTIGO - SERVIDOR SEM TESTE DO BANCO
// ======================================================

// Antes da integração com o MySQL, o servidor poderia
// ser iniciado diretamente desta forma:
//
// app.listen(port, () => {
//     console.log(`Servidor rodando em http://localhost:${port}`)
// })


// ======================================================
// TESTE TEMPORÁRIO DA TABELA ALUNOS
// ======================================================

// Este código foi utilizado apenas para verificar se
// o Node.js conseguia consultar a tabela alunos.
//
// Ele não deve permanecer ativo no server.js, pois
// as consultas de alunos agora ficarão no Repository.
//
// const [rows] = await pool.query('SELECT * FROM alunos')
// console.log(rows)


// ======================================================
// VERSÃO ATUAL - INICIALIZAÇÃO DO SERVIDOR
// ======================================================

async function startServer() {

    try {

        // Testa a comunicação com o MySQL.
        // Não consulta nenhuma tabela.
        await pool.query('SELECT 1')

        console.log('Conexão com o MySQL estabelecida')

        // Somente depois da conexão com o banco ser
        // confirmada, o servidor HTTP é iniciado.
        app.listen(port, () => {

            console.log(
                `Servidor rodando em http://localhost:${port}`
            )

        })

    } catch (error) {

        console.error(
            'Não foi possível conectar ao banco de dados'
        )

        console.error(error.message)

        // Encerra a aplicação caso não seja possível
        // conectar ao MySQL.
        process.exit(1)
    }
}


// ======================================================
// INICIALIZAÇÃO
// ======================================================

startServer()