const {PaillerPublicKey} = require ('./paillerPublicKey')
const {PaillerPrivateKey} = require ('./paillerPrivateKey')
const bcu = require('bigint-crypto-utils');
const {L}= require ('./paillerPrivateKey')

async function generateRandomPaillerKeys (bitlength = 3072, simpleVariant = false) {
    let p, q, n, g, lambda, mu

    do {
      p = await bcu.prime(Math.floor(bitlength / 2) + 1)
      q = await bcu.prime(Math.floor(bitlength / 2))
      n = p * q
    } while (q === p || bcu.bitLength(n) !== bitlength)
  
    if (simpleVariant) {
      g = n + 1n
      lambda = (p - 1n) * (q - 1n)
      mu = bcu.modInv(lambda, n)
    } else {
      const n2 = n ** 2n
      g = getGenerator(n, n2)
      lambda = bcu.lcm(p - 1n, q - 1n)
      mu = bcu.modInv(L(bcu.modPow(g, lambda, n2), n), n)
    
    }
  
    const publicKey = new PaillerPublicKey(n, g)
    const privateKey = new PaillerPrivateKey(lambda, mu, publicKey, p, q)
    return { publicKey, privateKey }


  }

  function getGenerator (n, n2) { 
    const alpha = bcu.randBetween(n)
    const beta = bcu.randBetween(n)
    return ((alpha * n + 1n) * bcu.modPow(beta, n, n2)) % n2
  }

  exports.generateRandomPaillerKeys = generateRandomPaillerKeys