const axios = require("axios");
const cheerio = require("cheerio");

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Substitua a URL abaixo pela URL que você deseja fazer scraping
      const url = "https://example.com";
      const response = await axios.get(url);
      const html = response.data;
      const $ = cheerio.load(html);

      // Substitua o seletor abaixo pelo seletor do elemento que você deseja extrair
      const data = $("#element-id").text();

      res.status(200).json({ data });
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar dados" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
}
