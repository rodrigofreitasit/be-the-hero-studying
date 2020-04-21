const express = require("express");
const OngController = require("./controllers/OngCotroller");
const IncidentController = require("./controllers/IncidentController");
const ProfileController = require("./controllers/ProfileController");
const SessionController = require("./controllers/SessionController");
const routes = express.Router();

//Login
routes.post("/sessions", SessionController.create);

//Ongs
routes.get("/ongs", OngController.index);
routes.post("/ongs", OngController.create);

//Casos
routes.get("/incidents", IncidentController.index);
routes.post("/incidents", IncidentController.create);
routes.delete("/incidents/:id", IncidentController.delete);

//Casos de ong especifica
routes.get("/profile", ProfileController.index);

module.exports = routes;
