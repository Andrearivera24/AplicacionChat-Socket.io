import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import viewsRouter from "./routers/views.router.js";

const app = express();
const messages = [];
//middleweares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Set Handlebars

app.engine('handlebars', handlebars.engine());
app.set('views', 'views/');
app.set('view engine', 'handlebars');

// Uso las rutas

app.use('/', viewsRouter);

//Seteo carpeta estática

app.use(express.static('public'));

//Inicializo el servidor

const webServer = app.listen(8080, ()=>{
    console.log('Escuchando 8080');
})

//inicio el socket.io
const io = new Server(webServer);
// cuándo haya una conexión, emita todos los mensajes.
io.on('connection', (socket)=>{
    socket.emit('messages', messages);
    // Ecucho los mensajes que envía al cliente, lo agrego al array y los emito actualizados a todos. 
    socket.on('message', (message)=>{
        messages.push(message);
        io.emit('messages', messages)
    })
   
})