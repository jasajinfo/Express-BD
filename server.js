import app from "./src/app.js"

const port = 3000 

// Iniciando o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})