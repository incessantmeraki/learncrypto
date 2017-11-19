var sodium = require('sodium-native')

var publicKey = Buffer.alloc(sodium.crypto_sign_PUBLICKEYBYTES)
var signature = Buffer.alloc(sodium.crypto_sign_BYTES)
var message = Buffer.from(process.argv[3])
signature = Buffer.from(process.argv[2], 'hex')
publicKey = Buffer.from(process.argv[4], 'hex') 

var result = sodium.crypto_sign_verify_detached(signature, message, publicKey)

console.log(result)
if (result) console.log("Verified")
else console.log("not verified")
