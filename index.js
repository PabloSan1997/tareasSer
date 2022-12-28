const express = require('express');
const cors = require('cors');
const { boomErrorHandle } = require('./middlewares/tareas.handle.js');
const { crearApi } = require('./routers');
const app = express();

const PUERTO = process.env.PORT || 5100;
app.use(express.json());
app.use(cors());
crearApi(app);
app.use(boomErrorHandle);
app.get('/', (req, res)=>{
    res.send('Bienvenidos a mi API :)');
});


app.listen(PUERTO);