import express from 'express' // importa o framework Express

const app =  express()

// Express deve interpretar o corpo (body) como JSON
app.use(express.json())

// Mock
const alunos = [
        {id: 1, nome: 'Bruno', curso: 'ADS'},
        {id: 2, nome: 'Maria', curso: 'ADS'},
        {id: 3, nome: 'Lara', curso: 'ADS'},
        {id: 4, nome: 'José', curso: 'ADS'}
]

// Função auxiliar
function buscarAlunoPorId(id) {
    return alunos.filter( aluno => aluno.id == id ) // retorna o registro(aluno). Vai comparar o id do item aluno (da lista) com o id passado
}

function buscarIndexAluno(id) {
    return alunos.findIndex( aluno => aluno.id == id ) // retorna o index
}

// Criando a rota raiz
app.get('/', (req, res) => {  // request = requisição do cliente e response = resposta enviada pelo servidor
    res.send('Minha API REST com Express') // resposta do servidor
})

// Rota lista alunos - GET
app.get('/alunos', (req,res) => {
    res.status(200).send(alunos); // 200: A solicitação foi bem-sucedida.
})

// Rota lista alunos - POST (adiciona um novo aluno na lista)
app.post('/alunos', (req,res) => {
    alunos.push(req.body)
    res.status(201).send('Aluno cadastrado com sucesso!'); // 201: A requisição foi bem sucedida e um novo recurso foi criado como resultado.
})

// Delete
app.delete('/alunos/:id', (req,res) => {
    let index = buscarIndexAluno(req.params.id) 
    alunos.splice(index, 1) // 2º parametro indica a quantidade de itens a serem removidos
    res.send(`Aluno com id ${req.params.id} excluido com sucesso`)
})

// Buscar aluno por id
app.get('/alunos/:id', (req,res) => {
    let index = buscarAlunoPorId(req.params.id) 
    res.send(index)
})

// Update
app.put('/alunos/:id', (req,res) => {
    let index = buscarIndexAluno(req.params.id) 
    alunos[index].nome = req.body.nome
    alunos[index].curso = req.body.curso
    res.send(alunos)
})

export default app; //preciso exportar para usar em outros módulos




