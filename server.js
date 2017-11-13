var jsonStream = require('duplex-json-stream')
var net = require('net')


var logs = []

var server = net.createServer (function (socket) {
  socket = jsonStream(socket)

  socket.on('data', function (msg) {
    console.log('Bank received:', msg)

    switch (msg.cmd) {
      case 'balance':
        socket.end({cmd:'balance', balance:logs.reduce(reducer, 0)})
        break
      case 'deposit':
        logs.push(msg)
        socket.end({cmd:'balance', balance:logs.reduce(reducer, 0)})
        break
      case 'withdraw':
        var totalAmount = logs.reduce(reducer , 0)
        if (totalAmount < msg.amt) {
          socket.end("Can't withdraw!! Low balance")
        }
        logs.push(msg)
        socket.end({cmd:'balance', balance:logs.reduce(reducer, 0)})
        break
      default:
        socket.end('wrong command')
    }
  })
})

function reducer (balance, msg) {
  if (msg.cmd === 'deposit')
    balance = balance + msg.amount
  else if (msg.cmd === 'withdraw')
    balance = balance - msg.amount
  return balance
}

server.listen(3876)
