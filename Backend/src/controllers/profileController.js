const connection = require('../database/connection');

module.exports = {
  async index(resquest, response) {
    const org_id = resquest.headers.authorization;
    const incidents = await connection("incidents")
      .where("org_id", org_id)
      .select("*");

    return response.json(incidents);
  }
};
