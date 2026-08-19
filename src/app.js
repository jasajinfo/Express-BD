// Importa o framework Express.
// O Express será utilizado para criar a API e suas rotas:
// GET, POST, PUT e DELETE.
import express from 'express'

// Importa a conexão com o banco de dados MySQL.
// Essa conexão foi configurada no arquivo db.js.
import conexao from './db.js';


// Cria a aplicação Express.
// A variável "app" representa nossa API.
const app = express()


// Permite que o Express interprete dados enviados
// no corpo (body) da requisição no formato JSON.
//
// Exemplo de JSON enviado pelo Postman:
// {
//     "nome": "Bruno",
//     "curso": "ADS"
// }
//
// Depois podemos acessar:
// req.body.nome
// req.body.curso
app.use(express.json())


// ======================================================
// ROTA RAIZ
// ======================================================

// GET = método utilizado para consultar/buscar informações.
//
// Quando o cliente acessar:
// GET http://localhost:3000/
//
// req = request  -> requisição recebida do cliente
// res = response -> resposta enviada pelo servidor
app.get('/', (req, res) => {

    // Envia uma mensagem como resposta.
    res.send('Minha API REST com Express + MySQL')
})


// ======================================================
// GET - LISTAR TODOS OS ALUNOS
// ======================================================

// Quando o cliente fizer:
//
// GET http://localhost:3000/alunos
//
// a API consultará todos os alunos cadastrados no MySQL.
//
// "async" indica que esta função possui operações assíncronas.
// Isso permite utilizar "await" para aguardar a resposta do banco.
app.get('/alunos', async (req, res) => {

    // try = tente executar o código abaixo.
    try {

        // conexao.query() envia um comando SQL para o MySQL.
        //
        // SELECT = consultar
        // *      = todas as colunas
        // FROM alunos = da tabela alunos
        //
        // Portanto:
        // SELECT * FROM alunos
        //
        // significa:
        // "Busque todos os registros da tabela alunos".
        //
        // await faz esta função aguardar o MySQL responder.
        //
        // O mysql2 retorna informações em um array.
        // [alunos] pega a parte que contém os registros encontrados.
        const [alunos] = await conexao.query(
            'SELECT * FROM alunos'
        )

        // Retorna os alunos encontrados.
        //
        // Status HTTP 200 = OK
        // Significa que a requisição foi realizada com sucesso.
        res.status(200).send(alunos)

    } catch (erro) {

        // Se ocorrer algum problema na consulta,
        // o erro será exibido no terminal do VS Code.
        console.log(erro)

        // Status 500 = erro interno do servidor.
        res.status(500).send(
            'Erro ao buscar alunos'
        )
    }
})


// ======================================================
// POST - CADASTRAR NOVO ALUNO
// ======================================================

// POST é utilizado para cadastrar/criar um novo recurso.
//
// Exemplo:
//
// POST http://localhost:3000/alunos
//
// Body:
// {
//     "nome": "Carlos",
//     "curso": "ADS"
// }
app.post('/alunos', async (req, res) => {

    try {

        // req.body contém os dados enviados pelo cliente.
        //
        // Pegamos o nome enviado no JSON.
        const nome = req.body.nome

        // Pegamos o curso enviado no JSON.
        const curso = req.body.curso


        // INSERT INTO = inserir um novo registro.
        //
        // Os símbolos ? representam os valores que serão
        // enviados separadamente para a consulta.
        //
        // [nome, curso] fornece os valores dos dois ?.
        //
        // Se:
        // nome = "Carlos"
        // curso = "ADS"
        //
        // o resultado será equivalente a:
        //
        // INSERT INTO alunos (nome, curso)
        // VALUES ('Carlos', 'ADS');
        await conexao.query(
            'INSERT INTO alunos (nome, curso) VALUES (?, ?)',
            [nome, curso]
        )


        // Status HTTP 201 = Created.
        //
        // Significa que um novo recurso foi criado.
        res.status(201).send(
            'Aluno cadastrado com sucesso!'
        )

    } catch (erro) {

        console.log(erro)

        res.status(500).send(
            'Erro ao cadastrar aluno'
        )
    }
})


// ======================================================
// DELETE - EXCLUIR ALUNO
// ======================================================

// DELETE é utilizado para excluir um registro.
//
// :id representa um parâmetro recebido pela URL.
//
// Exemplo:
//
// DELETE http://localhost:3000/alunos/4
//
// Nesse caso:
// req.params.id será 4.
app.delete('/alunos/:id', async (req, res) => {

    try {

        // Pega o ID informado na URL.
        //
        // Exemplo:
        // /alunos/4
        //
        // id = 4
        const id = req.params.id


        // Executa o DELETE no MySQL.
        //
        // WHERE id = ?
        //
        // determina QUAL aluno deverá ser excluído.
        //
        // Se id = 4, será equivalente a:
        //
        // DELETE FROM alunos WHERE id = 4;
        const [resultado] = await conexao.query(
            'DELETE FROM alunos WHERE id = ?',
            [id]
        )


        // affectedRows informa quantas linhas
        // foram afetadas pelo comando SQL.
        //
        // affectedRows = 1
        // encontrou e excluiu o aluno.
        //
        // affectedRows = 0
        // nenhum aluno com esse ID foi encontrado.
        if (resultado.affectedRows === 0) {

            // 404 = Not Found
            // O recurso solicitado não foi encontrado.
            return res.status(404).send(
                'Aluno não encontrado'
            )
        }


        // Se chegou até aqui, o aluno foi excluído.
        res.send(
            `Aluno com id ${id} excluído com sucesso`
        )

    } catch (erro) {

        console.log(erro)

        res.status(500).send(
            'Erro ao excluir aluno'
        )
    }
})


// ======================================================
// GET - BUSCAR UM ALUNO PELO ID
// ======================================================

// Busca somente um aluno.
//
// Exemplo:
//
// GET http://localhost:3000/alunos/2
//
// Nesse caso:
// id = 2
app.get('/alunos/:id', async (req, res) => {

    try {

        // Pega o ID informado na URL.
        const id = req.params.id


        // Consulta o aluno que possui o ID informado.
        //
        // Se id = 2, equivale a:
        //
        // SELECT * FROM alunos WHERE id = 2;
        const [alunos] = await conexao.query(
            'SELECT * FROM alunos WHERE id = ?',
            [id]
        )


        // Se nenhum aluno for encontrado,
        // o array retornado estará vazio:
        //
        // alunos = []
        //
        // Portanto:
        // alunos.length === 0
        if (alunos.length === 0) {

            return res.status(404).send(
                'Aluno não encontrado'
            )
        }


        // Mesmo buscando somente um registro,
        // o mysql2 retorna os resultados dentro de um array.
        //
        // Exemplo:
        //
        // [
        //     {
        //         id: 2,
        //         nome: "Maria",
        //         curso: "ADS"
        //     }
        // ]
        //
        // alunos[0] pega somente o primeiro objeto.
        res.send(alunos[0])

    } catch (erro) {

        console.log(erro)

        res.status(500).send(
            'Erro ao buscar aluno'
        )
    }
})


// ======================================================
// PUT - ATUALIZAR ALUNO
// ======================================================

// PUT é utilizado para atualizar um registro existente.
//
// Exemplo:
//
// PUT http://localhost:3000/alunos/1
//
// Body:
// {
//     "nome": "Bruno Silva",
//     "curso": "ADS"
// }
app.put('/alunos/:id', async (req, res) => {

    try {

        // ID vem da URL.
        //
        // /alunos/1
        //
        // id = 1
        const id = req.params.id


        // Nome e curso vêm do body da requisição.
        const nome = req.body.nome
        const curso = req.body.curso


        // UPDATE = atualizar um registro.
        //
        // SET = define os novos valores.
        //
        // WHERE = determina qual registro será atualizado.
        //
        // Os valores são passados na mesma ordem dos ?:
        //
        // 1º ? = nome
        // 2º ? = curso
        // 3º ? = id
        //
        // Exemplo:
        //
        // nome = "Bruno Silva"
        // curso = "ADS"
        // id = 1
        //
        // Equivale a:
        //
        // UPDATE alunos
        // SET nome = 'Bruno Silva', curso = 'ADS'
        // WHERE id = 1;
        const [resultado] = await conexao.query(
            'UPDATE alunos SET nome = ?, curso = ? WHERE id = ?',
            [nome, curso, id]
        )


        // Verifica se algum registro foi encontrado
        // e atualizado.
        if (resultado.affectedRows === 0) {

            return res.status(404).send(
                'Aluno não encontrado'
            )
        }


        // Informa que a atualização foi realizada.
        res.send(
            `Aluno com id ${id} atualizado com sucesso`
        )

    } catch (erro) {

        console.log(erro)

        res.status(500).send(
            'Erro ao atualizar aluno'
        )
    }
})


// ======================================================
// EXPORTAÇÃO
// ======================================================

// Exporta a aplicação Express.
//
// Isso permite importar "app" em outro arquivo,
// como o server.js.
//
// Exemplo no server.js:
//
// import app from './src/app.js'
export default app;

/*
==========================================================
RESUMO DO CRUD
==========================================================

HTTP                    SQL                 FUNÇÃO

GET /alunos             SELECT              Listar
GET /alunos/:id         SELECT + WHERE      Buscar por ID
POST /alunos            INSERT              Cadastrar
PUT /alunos/:id         UPDATE              Atualizar
DELETE /alunos/:id      DELETE              Excluir


FLUXO DA APLICAÇÃO:

Cliente / Postman
       ↓
     Express
       ↓
     app.js
       ↓
     db.js
       ↓
     mysql2
       ↓
     MySQL
       ↓
   express_bd
       ↓
 tabela alunos


CONCEITOS IMPORTANTES:

req.body
→ dados enviados no corpo da requisição

req.params.id
→ ID enviado pela URL

async
→ indica uma função assíncrona

await
→ aguarda uma operação assíncrona terminar

try
→ tenta executar uma operação

catch
→ captura um erro ocorrido no try

conexao.query()
→ executa uma consulta SQL no MySQL

affectedRows
→ quantidade de registros afetados pelo SQL

? no SQL
→ posição onde será colocado um valor de forma parametrizada

==========================================================
*/