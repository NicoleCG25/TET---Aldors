// Importar módulos necessários
const express = require("express");
const mysql = require("mysql2");
const cors = require('cors');
const app = express();
const port = 3000;

// Configurar middleware
app.use(express.static("public"));
app.use(cors());
app.use(express.json());

// Configurações do banco de dados
const db = {
  host: '54.173.126.116',
  port: 3306,
  user: "tet-aldors",
  password: "aldors2024",
  database: "tet-aldors",
};

// Função para executar queries SQL
const execSQLQuery = (sqlQry, params, res) => {
  const connection = mysql.createConnection(db);
  connection.query(sqlQry, params, (error, results, fields) => {
    if (error) res.json(error);
    else res.json(results);
    connection.end();
    console.log("Executou: execSQLQuery");
  });
};

// Função assíncrona para executar queries SQL
async function resultSQLQuery(sqlQry, params) {
  const connection = await mysql.createConnection(db);
  let [result] = await connection.promise().query(sqlQry, params);
  connection.end();
  return result;
}

// Rota para a página inicial
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Rota para obter todos os usuários
app.get("/usuarios", (req, res) => {
  execSQLQuery("SELECT * FROM Usuário", [], res);
});

// Rota para obter um usuário específico por ID
app.get("/usuarios/:id", (req, res) => {
  const id = [req.params.id];
  execSQLQuery("SELECT * FROM Usuário WHERE Id=?", id, res);
});

// Rota para criar um novo usuário
app.post("/usuarios", (req, res) => {
  const id = [req.body.nome, req.body.email, req.body.senha];
  execSQLQuery("INSERT INTO usuario VALUES (null, ?, ?, ?)", id, res);
});

// Rota para login de usuário
app.post("/login", async (req, res) => {
  const { email, senha } = req.body;
  let result = await resultSQLQuery(
    "SELECT * FROM Usuário WHERE Email=? AND Senha=?", [email, senha]
  );
  if (result.length > 0)
    res.json({ mensagem: "Sucesso!", id: result[0].Id });
  else res.json({ mensagem: "Email ou senha inválidos!" });
});

// Rota para atualizar um usuário existente
app.put("/usuarios/:id", (req, res) => {
  const id = [req.body.nome, req.body.email, req.body.senha, req.params.id];
  execSQLQuery(
    "UPDATE usuario SET usu_nome = ?, usu_email = ?, usu_senha = ? WHERE usu_id = ?",
    id,
    res
  );
});

// Rota para excluir um usuário
app.delete("/usuarios/:id", (req, res) => {
  const id = [req.params.id];
  execSQLQuery("DELETE FROM Usuário WHERE Id=?", id, res);
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`App escutando a porta: ${port}`);
});
