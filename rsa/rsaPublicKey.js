const bcu = require('bigint-crypto-utils');

class RsaPublicKey{
    e;
    n;

    r;

    constructor(e,n){
        this.e=e;
        this.n=n;
    }

    encrypt(m){
        console.log(m)
        return bcu.modPow(m,this.e,this.n)
    }
    verify(s){
        return bcu.modPow(s,this.e,this.n);
    }
    blind(message, r){
        //how to calculate r?
        //Here we have the blind message
        blindMessage = (message * Math.pow(r, this.e)) % this.n;
        return blindMessage;
    }
    unblind(blindSigned, r){
        signedMessage = (blindSigned * Math.pow(r, -1)) % this.n;
        return signedMessage;
    }
    /*
        -El verify para que sirve (Veo que retorna el modulo del numero)
        -Verificar como puedo sacar la r
    */
}
exports.RsaPublicKey = RsaPublicKey;

