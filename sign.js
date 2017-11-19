var sodium = require('sodium-native')

var message = Buffer.from(process.argv[2])
var publicKey = Buffer.alloc(sodium.crypto_sign_PUBLICKEYBYTES)
var secretKey = Buffer.alloc(sodium.crypto_sign_SECRETKEYBYTES)
var signature = Buffer.alloc(sodium.crypto_sign_BYTES)

sodium.crypto_sign_keypair(publicKey, secretKey)
sodium.crypto_sign_detached(signature, message, secretKey)

console.log('Signature', signature.toString('hex'))
console.log('Message', message.toString())
console.log('Public key', publicKey.toString('hex'))

