const express = require('express');
const boom = require('@hapi/boom');
const todasTareas = require('../datos/misTareas.json');
const fs = require('fs');
class TareasServicio{
    constructor(){
        this.datos = todasTareas;
    }
    async leer(){
        if(this.datos.tareas.length===0){
            throw boom.notFound('No se encontraron tareas');
        }
        return this.datos.tareas;
    }
    async agregar(elemento){
        if(Object.values(elemento).length===0){
            throw boom.badRequest('Error al mandar');
        }
        this.datos.tareas.push(elemento);
        const mendaje = {
            mimensaje:'Se agrego elemento con exito',
            ...this.datos.tareas
        }
        this.actualizar(this.datos);
        return mendaje;
    }   
    async editar(num, cuerpo){
        const index = this.datos.tareas.findIndex(elemento=> elemento.id==num);
        if(index===-1){
            throw boom.notFound('No se encontro elemento a editar');
        }
        if(Object.values(cuerpo).length===0){
            throw boom.badRequest('Error al mandar');
        }
        const elemento = this.datos.tareas[index];
        this.datos.tareas[index]={
            ...elemento,
            ...cuerpo
        }
        const mensaje = {
            miMensaje:"elemento editado con exito",
            ...this.datos.tareas[index]
        }
        this.actualizar(this.datos);
        return mensaje;
    }
    async borrarTodo(){
        if(this.datos.tareas.length===0){
            throw boom.notFound('No hay elementos a borrar');
        }
        this.datos.tareas=[];
        this.actualizar(this.datos);
        return {
            miMensaje:"se han borrado todos los elementos con exito"
        }
    }
    async borrarUno(num) {
        const index = this.datos.tareas.findIndex(elemento=> elemento.id==num);
        if(index===-1){
            throw boom.notFound('No se encontro elemento a borrar');
        }
        const elementoAborrar = this.datos.tareas[index];
        this.datos.tareas.splice(index,1);
        this.actualizar(this.datos);
        return {
            miMensaje:'Elemento borrado con exito',
            ...elementoAborrar
        }
    }
    async actualizar(nuevosDatos){
        const direccion = './datos/misTareas.json';
        fs.writeFile(direccion, JSON.stringify(nuevosDatos), (err)=>{
            if(err){
                throw 'hay un error';
            }
        });
    }
}

module.exports={TareasServicio}