# Express-BDAPI REST com Node.js, Express e MySQL

Este projeto demonstra a integração de uma API REST desenvolvida com Node.js e Express com um banco de dados MySQL executado em Docker, substituindo o armazenamento temporário em memória por persistência em banco de dados.

A comunicação com o MySQL é realizada utilizando o pacote mysql2, por meio de sua API baseada em Promises, permitindo o uso de async/await. Para melhorar o gerenciamento das conexões, a aplicação utiliza um pool de conexões, evitando a criação de uma nova conexão para cada requisição.

As configurações do banco de dados são armazenadas em variáveis de ambiente no arquivo .env, incluindo host, porta, usuário, senha e nome do banco. Por segurança, esse arquivo é incluído no .gitignore, enquanto o .env.example pode ser versionado como modelo de configuração.

A aplicação está organizada de forma que o app.js seja responsável pela configuração do Express, o database/pool.js pela configuração do acesso ao MySQL e o server.js pela inicialização do servidor. Antes de disponibilizar a API, o sistema executa SELECT 1 para verificar se a conexão com o banco foi estabelecida corretamente.

A arquitetura utilizada é:

HTTP → Express → mysql2 → Connection Pool → MySQL

Como o Node.js está sendo executado diretamente no computador e apenas o MySQL está no Docker, o banco é acessado utilizando localhost. Caso futuramente Node.js e MySQL sejam executados no mesmo Docker Compose, o host poderá ser substituído pelo nome do serviço MySQL definido no Compose.

Para executar o projeto, primeiro deve-se iniciar o banco:

docker compose up -d

Em seguida, instalar as dependências:

npm install

E iniciar a aplicação:

npm run dev

Quando a conexão estiver funcionando corretamente, o terminal apresentará:

Conexão com o MySQL estabelecida
Servidor rodando em http://localhost:3000

Nesta etapa são praticados conceitos de Node.js, Express, MySQL, Docker, variáveis de ambiente, Promises, async/await, pool de conexões, tratamento de erros e separação de responsabilidades.

O próximo passo do projeto será implementar as operações CRUD da entidade alunos, permitindo consultar, cadastrar, atualizar e excluir registros diretamente no MySQL.
