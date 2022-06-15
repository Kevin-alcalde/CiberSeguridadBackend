const bcu = require('bigint-crypto-utils');
const paillerPublicKey = require('./paillerPublicKey');

class PaillerPrivateKey {

    paillerPublicKey 
    
     lambda
     mu
    _q

    constructor (lambda, mu, paillerPublicKey, p, q) {
        this.lambda = lambda
        this.mu = mu
        this._p = p
        this._q = q
        this.paillerPublicKey = paillerPublicKey
}



get bitLength () {
    return bcu.bitLength(this.paillerPublicKey.n)
  }

  get n () {
    return this.paillerPublicKey.n
  }

  decrypt (c) {
    return (L(bcu.modPow(c, this.lambda, this.paillerPublicKey._n2), this.paillerPublicKey.n) * this.mu) % this.paillerPublicKey.n
  }

 getRandomFactor (c) {
    if (this.paillerPublicKey.g !== this.n + 1n) throw RangeError('Cannot recover the random factor if paillerPublicKey.g != paillerPublicKey.n + 1. You should generate yout keys using the simple variant, e.g. generateRandomKeys(3072, true) )')
    if (this._p === undefined || this._q === undefined) {
      throw Error('Cannot get random factor without knowing p and q')
    }
    const m = this.decrypt(c)
    const phi = (this._p - 1n) * (this._q - 1n)
    const nInvModPhi = bcu.modInv(this.n, phi)
    const c1 = c * (1n - m * this.n) % this.paillerPublicKey._n2
    return bcu.modPow(c1, nInvModPhi, this.n)
  }


}
function L (a, n) {
  return (a - 1n) / n
}


exports.L= L;
exports.PaillerPrivateKey = PaillerPrivateKey;