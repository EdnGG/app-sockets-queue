const fs = require('fs')

class Ticket {
  constructor(numero, escritorio) {
    this.numero = numero
    this.escritorio = escritorio
  }
}


class TicketControl {
  constructor() {
// El constructor se inicializa cada vez que se hace una instacia
// a la clase
    this.ultimo = 0
    this.hoy = new Date().getDate()
// Tickets que faltan de atender  
    this.tickets = []
    this.ultimos4 = []

    let data = require('../data/data.json')

    if (data.hoy === this.hoy) {
      this.ultimo = data.ultimo
      this.tickets = data.tickets
      this.ultimos4 = data.ultimos4
    } else {
      this.reiniciarConteo()
    }

    console.log(data)
  }

  siguiente() {
    this.ultimo += 1
    let ticket = new Ticket(this.ultimo, null) 
    this.tickets.push(ticket)
    this.grabarArchivo()

    return `Ticket ${this.ultimo}`
  }

  getUltimoTiket() {
    return `Ticket ${this.ultimo}`
  }

  getUltimos4() {
    return this.ultimos4
  }

  atenderTicket( escritorio ) {
    if (this.tickets.length === 0) {
      return 'No tickets'
    }

    let numeroTicket = this.tickets[0].numero
    this.tickets.shift() // Elimino primera posicion
    
    let atenderTicket = new Ticket(numeroTicket, escritorio)

    this.ultimos4.unshift( atenderTicket ) //agrega al inicio

    if ( this.ultimos4.length > 4 ) {
      this.ultimos4.splice(-1,1) // Borra el ultimo elemento
    }

    console.log('ultimos 4')
    console.log(this.ultimos4)
    
    this.grabarArchivo()

    return atenderTicket

  }



  reiniciarConteo() {
    this.ultimo = 0
    this.tickets = []
    this.ultimos4 = []

    console.log('sistema inicializado')

    this.grabarArchivo()


  }

  grabarArchivo() {
    let jsonData = {
      ultimo: this.ultimo,
      hoy: this.hoy,
      tickets: this.tickets,
      ultimos4: this.ultimos4
    }

    let jsonDataString = JSON.stringify(jsonData)

    fs.writeFileSync('./server/data/data.json', jsonDataString)

  }

  
}


module.exports = {
  TicketControl
}