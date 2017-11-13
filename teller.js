var jsonStream = require('duplex-json-stream')
var net = require('net')

var client = jsonStream(net.connect(3876))

var command = process.argv[2]

client.on('data', function (msg) {
  console.log('Teller received:', msg)
})

switch (command) {
  case 'balance':
    client.end({cmd:'balance'})
    break
  case 'deposit':
    client.end({cmd:'deposit', amount:Number(process.argv[3])})
    break
  case 'withdraw':
    client.end({cmd:'withdraw', amount:Number(process.argv[3])})
    break
  default:
    console.log('Unknown command')
    process.exit()
}

