const bcu = require('bigint-crypto-utils');
class RsaPrivateKey{
    d;
    n;
    
    constructor(d,n){
        this.d =d;
        this.n =n;
    }

    decrypt(c){
        return bcu.modPow(c,this.d,this.n);
    }
    sign(m){
        return bcu.modPow(m,this.d,this.n)
    }
}

exports.RsaPrivateKey = RsaPrivateKey;