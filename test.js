// console.log("12mod5 = " + (12 % 5));
const bcu = require('bigint-crypto-utils');
const myRsa = require("./rsa/generateRandomKeys");
const { RsaPublicKey } = require("./rsa/rsaPublicKey");

console.log("----------------");

const bitLength = 1024;

main();
async function main(){ 
    
    const bitLength = 1024;
    const keyPair = await myRsa.generateRsaKey(bitLength);
    
    //Generate a ramdon message --> with the module - 1
    const m = bcu.randBetween(keyPair.publicKey.n - 1n); 

    const c = keyPair.publicKey.encrypt(m)

    const d = keyPair.privateKey.decrypt(c)

    if(m !== d){
        console.log("Error");
    }
    else{
        console.log("Working");
    }

}