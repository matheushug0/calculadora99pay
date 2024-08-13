const express = require("express");
//const cors = require("cors"); // Importa o CORS
const getValueFromWebsite = require("../script"); // Importa o script Puppeteer

const app = express();
//app.use(cors()); // Habilita CORS para todas as requisições

app.get("/getValue", async (req, res) => {
  try {
    const value = await getValueFromWebsite();
    res.json({ value });
  } catch (error) {
    res.status(500).send("Erro ao buscar valor");
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});

module.exports = app;
