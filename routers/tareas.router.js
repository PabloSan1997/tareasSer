const express = require("express");
const { crearElemento, editarElemento } = require("../esquema/tareas.equema.js");
const { validatorHandle } = require("../esquema/validacion.esquema.js");
const { TareasServicio } = require("../servicios/servicio.tareas.js");
const tareasR = express.Router();
const servicio = new TareasServicio();
tareasR.get("/", async (req, res, next) => {
  try {
    const informacion = await servicio.leer();
    res.json(informacion);
  } catch (err) {
    next(err);
  }
});
tareasR.post("/", validatorHandle(crearElemento, 'body'),async (req, res, next) => {
  const nuevaTarea = req.body;
  try {
    const mandar = await servicio.agregar(nuevaTarea);
    res.status(201).json(mandar);
  } catch (error) {
    next(error);
  }
});
tareasR.patch('/:num',validatorHandle(editarElemento, 'body'), async(req, res, next)=>{
    const {num} = req.params;
    const cuerpo = req.body;
    try{
        const editar = await servicio.editar(num, cuerpo);
        res.status(201).json(editar);
    }catch(error){
        next(error);
    }
});
tareasR.delete('/borrarTodo', async(req, res, next)=>{
    try{
        const borrar = await servicio.borrarTodo();
        res.json(borrar);
    }catch(err){
        next(err);
    }
});
tareasR.delete('/:id', async(req, res, next)=>{
    const {id}= req.params;
    try{
       const borrar = await servicio.borrarUno(id);
       res.json(borrar);
    }catch(err){
        next(err);
    }
});
module.exports = { tareasR };
