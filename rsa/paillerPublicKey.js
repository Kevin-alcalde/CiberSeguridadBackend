const bcu = require('bigint-crypto-utils');

 class PaillerPublicKey {
     n;
     g;
     _n2;
     
     constructor(n, g) {
         this.n = n;
         this.g = g;
         this._n2 = this.n ** 2n
     }

encrypt (m, r) {
    if (r === undefined) {
      do {
        r = bcu.randBetween(this.n)
      } while (bcu.gcd(r, this.n) !== 1n)
    }
    return (bcu.modPow(this.g, m, this._n2) * bcu.modPow(r, this.n, this._n2)) % this._n2
  }

  get bitLength () {
    return bcu.bitLength(this.n)
  }

  addition (...ciphertexts){
    return ciphertexts.reduce((sum, next) => sum * next % (this._n2), 1n)
  }
  multiply (c, k) {
    return bcu.modPow(c, k, this._n2)
  }

}

exports.PaillerPublicKey = PaillerPublicKey;