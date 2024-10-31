require("dotenv").config();

const express = require("express");
const { router } = require("./routes/index.js");
const cors = require("cors");
const bodyParser = require("body-parser");
// const expressFileUpload = require("express-fileupload");

const { dbConnection } = require("./database/config");

// Crear el servidor de express
const app = express();

// Lectura y parseo del body sc
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar CORS
app.use(cors());

// Base de datos
dbConnection();

//Directorio público
app.use(express.static("public"));

// Rutas
app.use(router);

app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en el puerto " + process.env.PORT);
});
