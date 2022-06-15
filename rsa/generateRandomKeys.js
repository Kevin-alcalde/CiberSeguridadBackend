const bcu = require('bigint-crypto-utils');
const { RsaPrivateKey } = require('./rsaprivatekey');
const { RsaPublicKey } = require('./rsapublickey');

e = 65537n;
async function generateRsaKey(bitLength = 1024){

    let p, q, n, phin;

    do {
        q = await bcu.prime(bitLength/2 + 1);
        p = await bcu.prime(bitLength/2);
        n = q * p;
        phin = (p - 1n)*(q - 1n);
    } while (q === p || bcu.bitLength(n) !== bitLength || phin % e === 0n);
    //e cant be split by phin (has to be different than 0 ==> coprime)
    const publicKey = new RsaPublicKey(e,n);
    const d = bcu.modInv(e,phin);
    const privateKey = new RsaPrivateKey(d,n)

    const keypair = {
        publicKey: publicKey,
        privateKey: privateKey
    }
    
    return keypair

}

exports.generateRsaKey = generateRsaKey;