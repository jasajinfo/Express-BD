import app from "./src/app.js";
import conexao from "./src/db.js";

const port = 3000;

// Testando conexão com o banco de dados
try {
    await conexao.query("SELECT 1");
    console.log("Conexão com o banco realizada com sucesso!");

    // Iniciando o servidor somente após conectar ao banco
    app.listen(port, () => {
        console.log(`Servidor rodando em http://localhost:${port}`);
    });

} catch (erro) {
    console.error("Erro ao conectar no banco:", erro);
}