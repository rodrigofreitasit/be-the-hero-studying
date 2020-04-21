const crypto = require("crypto"); // É utilizado para criptografia, mas é possivel gerar uma string aleatoria
const connection = require("../database/connections"); // importa a conexão com o banco de dados

//Controler index é utilizado para listar as Ongs cadastradas no Banco de Dados
module.exports = {
  async index(request, response) {
    const ongs = await connection("ongs").select("*");

    return response.json(ongs);
  },
  //Controler create é utilizado na criação de novas Ongs
  async create(request, response) {
    const { name, email, whatsapp, city, uf } = request.body;

    const id = crypto.randomBytes(4).toString("HEX"); // randomBytes= gerara 4 bytes aleatorios || toString('HEX') = converte em string hexadecimal

    //comando awaint faz o node aguardar a conexão terminar para ir para o return da resposta
    await connection("ongs").insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    });

    return response.json({ id });
  },
};
