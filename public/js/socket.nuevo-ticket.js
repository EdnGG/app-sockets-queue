// const socketIO = require('socket.io');

var socket = io()

let label = $('#lblNuevoTicket') 

socket.on('connect', function () {
  console.log('connected')
})

socket.on('disconnect', function () {
  console.log('Disconnected')
})

// on 'estadoActual'
socket.on('estadoActual', function (resp) {
  label.text(resp.actual)
  // console.log(estadoActual)
})

$('button').on('click', function () {

  socket.emit('siguienteTicket', null, function (siguienteTicket) {
    label.text(siguienteTicket)
  })

  console.log('click')
})