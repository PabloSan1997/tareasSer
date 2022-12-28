const express = require('express');
const { tareasR } = require('./tareas.router.js');
const direccion = express.Router();

function crearApi(app){
    app.use('/api/v1', direccion);
    direccion.use('/tareas', tareasR);
}
module.exports={crearApi};