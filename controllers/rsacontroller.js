const rsaController = {};
const myRsa = require("../rsa/generateRandomKeys");
const myPailler = require('../rsa/generateRandomPaillerKeys');
const bigintConversion = require("bigint-conversion");
const {PaillerPublicKey} = require ('../rsa/paillerPublicKey')
const {PaillerPrivateKey} = require ('../rsa/paillerPrivateKey')

privateKey = {}



rsaController.getPulicKey = async (req, res) =>{
    rsaController.getRandomKeys = await myRsa.generateRsaKey(1024);
    this.privateKey
    console.log( rsaController.getRandomKeys);
    res.json({
        publicKey: {
        eHex: bigintConversion.bigintToHex( rsaController.getRandomKeys.publicKey.e),
        nHex: bigintConversion.bigintToHex( rsaController.getRandomKeys.publicKey.n),
        },
    });
}
rsaController.receiveEncryptedMessage = (req, res) => {
    var body = req.body;
    var encryptedMessage = bigintConversion.hexToBigint(body.encryptedMessageHex);

    console.log(encryptedMessage);
    console.log("El mensaje desencriptado es: ", rsaController.getRandomKeys.privateKey.decrypt(encryptedMessage));

    res.json({
        "message": "Encrypted message received"
    })
}

rsaController.paillerget = async (req, res) => {


        keyRSA = await myRsa.generateRsaKey(2048);
   
        const { publicKey, privateKey } = await myPailler.generateRandomPaillerKeys(3072)
        var PaillerPublicKey = publicKey 
        const iniciarVoto = 0n;
        votos = PaillerPublicKey.encrypt(iniciarVoto);
        
    

      res.json({
        eHex: bigintConversion.bigintToHex(keyRSA.publicKey.e),
        nHex: bigintConversion.bigintToHex(keyRSA.publicKey.n),
        nPaillierHex: bigintConversion.bigintToHex(PaillerPublicKey.n),
        gPaillierHex: bigintConversion.bigintToHex(PaillerPublicKey.g)
      })
    
}

rsaController.sign = async(req, res) => {
    console.log("Se firmará el siguiente mensaje:" + req.body.hashAlice )
    const firma = keyRSA.privateKey.sign(bigintConversion.hexToBigint(req.body.hashAlice))
    const hashAlice = {
        hashAlice: req.body.hashAlice
    }
    console.log(" hash de allice recibido" + hashAlice.hashAlice)



}



module.exports = rsaController;