const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();

app.use(cors()); // quando em produção apenas o http daqui terá permissão de acessar o backend

app.use(express.json());
app.use(routes);
app.listen(3333);
