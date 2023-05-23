// creo la conexión
const socket = io();

let user;
const inputMSJ = document.getElementById('msj');

Swal.fire({
    title:'Bienvenido',
    input: 'text',
    text: 'Identificate para participar del PiolaChat ',
    icon: 'success',
    inputValidator: (value)=>{
        return !value && 'Tenes que identificarte, acá fantasmas no. '
    },
    allowOutsideClick: false,

}).then((result)=>{ // si todo sale bien, me quedo con el valor para el usuario. 
user = result.value; //esto guarda el nombre
});

function render(data){
    const html = data.map((elem)=>{
        return  `<div>
                       <strong>${elem.user}:</strong>
                       <em>${elem.msj}</em>
                </div>`
    }).join(' '); //convierto el array de string en un string 
    document.getElementById('messages').innerHTML= html;
    }
// función para que cuando se presiones enter se envíe el mensjae
//capturar el enter

inputMSJ.addEventListener('keyup', (event) =>{
    //escucha cualquier tipo de tecleo
    if (event.key === 'Enter'){
        let msj = inputMSJ.value;
        if(msj.trim().length > 0)
        {// si aun limpio, es mayor a cero, tengo un mensaje
             socket.emit('message', {user, msj}) //emito al servidor el nombre del usuario validado y el mensaje 
             inputMSJ.value =''; // luego limpio el mensaje para qeu quede vacío para un nuevo mensaje. 
        }
    }
});

//ahora dibujo lo que me envío el servidor, todos los mensajes actualizados 
socket.on('messages', (data)=>{
    render(data)
})