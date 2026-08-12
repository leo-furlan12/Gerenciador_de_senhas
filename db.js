import mysql from "mysql2/promise";

const conexao = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "2004",
  database: "gerenciador",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function inicializarBanco() {
  try {
    // Cria a tabela de usuários
    await conexao.query(`
            CREATE TABLE IF NOT EXISTS usuarios (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                senha VARCHAR(255) NOT NULL,
                salt VARCHAR(255) NOT NULL
            );
        `);

    // Cria a tabela do cofre
    await conexao.query(`
            CREATE TABLE IF NOT EXISTS cofre (
                id INT AUTO_INCREMENT PRIMARY KEY,
                usuario_id INT NOT NULL,
                servico VARCHAR(255) NOT NULL,
                login VARCHAR(255) NOT NULL, 
                descricao VARCHAR(255),
                senha VARCHAR(255) NOT NULL,
                iv VARCHAR(255) NOT NULL,
                FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
            );
        `);

    console.log("Banco de dados conectado e tabelas prontas!\n");
  } catch (erro) {
    console.error(" Erro ao configurar o banco de dados:", erro.message);
  }
}

export { conexao, inicializarBanco };
