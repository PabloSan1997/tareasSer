const Joi = require('joi');


const id = Joi.number().integer().min(1);
const nombre = Joi.string().min(1).max(20);
const urgencia = Joi.string().max(20);
const hora = Joi.string().min(0).max(5);

const crearElemento = Joi.object({
    id:id.required(),
    nombre:nombre.required(),
    urgencia:urgencia,
    hora:hora
});
const editarElemento = Joi.object({
    nombre:nombre,
    urgencia:urgencia,
    hora:hora
});
module.exports={crearElemento, editarElemento}