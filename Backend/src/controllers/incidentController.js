const connection = require("../database/connection");

module.exports = {
  async index(resquest, response) {
      const { page = 1} = resquest.query;

      const [count]  = await connection('incidents').cont();

    const incidents = await connection("incidents")
    .join('ong', 'ongs_id', '=','incidents.ong_id')
    .limit(5)
    .offset((page -1 * 5))
    .select(['incidents.*',  'ongs.name', 'ongs.email','ongs.whatzap','ongs.city', 'ongs.uf']);
    return response.json(incidents);

    response.headers('X-Total-Count', count ['count(*)']);
  },

  async create(request, response) {
    const { title, description, value } = resquest.body;
    const ong_id = resquest.headers.authorization;

    const [id] = await connection("incidents").insert({
      title,
      description,
      value,
      ong_id
    });
    return response.json({ id });
  },

  async delete(request, response) {
    const { id } = resquest.params;
    const ong_id = resquest.headers.authorization;

    const incident = await connection("íncident")
      .where("id", id)
      .select("ong_id")
      .first();

    if ((incident.ong_id = ong_id)) {
      return response.status(401).json({ error: "Óperation not permited" });
    }
    await connection("incident")
      .where("id", id)
      .delete();
    return response.status(204).send();
  }
};
