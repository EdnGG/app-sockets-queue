// Servidor

const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control')

// Aqui esta instanciada la clase. en este momento se dispara el constructor
// y gracias a eso podemos ver en consola el contenido del objeto "data"
const ticketControl = new TicketControl()

io.on('connection', (client) => {

    // client.on (escuchar algun evento)
    client.on('siguienteTicket', (data, callback) => {

        let siguiente = ticketControl.siguiente()
        console.log('Witch is the next ticket? ')
        console.log(siguiente)

        callback(siguiente)
    })

// Emitir evento 'estadoActual'
    // client.emit('estadoActual', (data, callback) => {
    //     let estadoActual = ticketControl.getUltimoTiket()
    //     console.log(estadoActual)

    //     callback(estadoActual)
    // })
   client.emit('estadoActual', {
       actual: ticketControl.getUltimoTiket(),
       ultimos4: ticketControl.getUltimos4()
       
    })

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                er: true,
                mensaje: 'Desktop must required'
            })
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio)
        
        callback(atenderTicket)

        // Actualizar / notificar cambios en los ultimos 4
        // Mandamos el evento dentro de un objeto
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        })
        // Emitir ultimos4




    })

});

/* 
Comando de nodemon para que solo observe extenciones html, js
nodemon server/server -e js,html
*/