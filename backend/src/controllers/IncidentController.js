const connection = require("../database/connections"); // importa a conexão com o banco de dados

module.exports = {
  //lista todo casos da base
  async index(request, response) {
    const { page = 1 } = request.query;

    const [count] = await connection("incidents").count();
    const incidents = await connection("incidents")
      .join("ongs", "ongs.id", "=", "incidents.ong_id")
      .limit(5)
      .offset((page - 1) * 5) //Vai zerar o contados para começar do registro 0 e pegar o proximo 5 registros
      .select([
        "incidents.*",
        "ongs.name",
        "ongs.email",
        "ongs.whatsapp",
        "ongs.city",
        "ongs.uf",
      ]);
    response.header("X-Total-Count", count["count(*)"]);
    return response.json(incidents);
  },

  // regra para criação de novos casos
  async create(request, response) {
    const { title, description, value } = request.body; // pega no body da requisição os dados do caso
    const ong_id = request.headers.authorization; // pega no header da requisição o id da ong

    //insert na tabela de casos
    //const [id] armazena o primeiro valor do array e armazena na variavel id
    const [id] = await connection("incidents").insert({
      title,
      description,
      value,
      ong_id,
    });
    return response.json({ id });
  },

  //regra para deletar um caso da base
  async delete(request, response) {
    const { id } = request.params;
    const ong_id = request.headers.authorization;

    const incident = await connection("incidents") // faz a busca na base de acordo com o id passado
      .where("id", id)
      .select("ong_id")
      .first();

    if (incident.ong_id != ong_id) {
      return response.status(401).json({ error: "Operation not permited" }); // faz a logica se a ong é dona do caso e retorna erro
    }
    await connection("incidents").where("id", id).delete(); // Deleta o caso da base por que a ong é dona do caso
    return response.status(204).send(); //retorna para o front end a resposta OK mais sem corpo
  },
};
