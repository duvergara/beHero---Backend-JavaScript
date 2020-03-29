const express = require("express");
const routes = require("./routes");
const cors = require("/.cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
// rotas e recursos

// GET: BUSCAR INFORMACOES
//POST:  CRIA INFORMACOES
//PUT: ALTERA INFORMACOES
//DELETE: Deleta informacoes inde

app.listen(3333);
