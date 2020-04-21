const connection = require("../database/connections"); // importa a conexão com o banco de dados

module.exports = {
  async create(request, response) {
    const { id } = request.body;

    const ong = await connection("ongs").where("id", id).select("name").first();

    if (!ong) {
      return response
        .status(400)
        .json({ error: "Nenhuma Ong foi encontrada com este Id" });
    }
    return response.json(ong);
  },
};
