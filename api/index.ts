/* const express = require("express");
const getValueFromWebsite = require("../script"); // Importa o script Puppeteer

const app = express();

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
 */
