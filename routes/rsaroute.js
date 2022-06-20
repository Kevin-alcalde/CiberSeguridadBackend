const { Router, application } = require("express");
const PassPortLocal = require('passport-local').Strategy
const router = Router();
const rsaController = require ("../controllers/rsacontroller")
const passport = require('passport');
const session = require('express-session');

const myRsa = require("../rsa/generateRandomKeys");
const myPailler = require('../rsa/generateRandomPaillerKeys');
const bigintConversion = require("bigint-conversion");
router.use(session({
  secret: 'top secret',
  resave: true,
  saveUninitialized: true
}))

privateKey = {}
keyUPC = {}


//GET
router.get("/authentication", async (req, res) => {
  this.keyUPC = await  myRsa.generateRsaKey(1024);
  this.privateKey = this.keyUPC.privateKey;
  console.log(bigintConversion.bigintToHex(this.keyUPC.publicKey.e) + " -->  E publica del servidor")
  console.log(bigintConversion.bigintToHex(this.keyUPC.publicKey.n) + " -->  N publica del servidor")
  console.log( this.keyUPC);
  res.json({
      
      eHex: bigintConversion.bigintToHex( this.keyUPC.publicKey.e),
      nHex: bigintConversion.bigintToHex( this.keyUPC.publicKey.n),
      
  });
});

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done){(null, {id:1, name:"Kevin"});
});

passport.use(new PassPortLocal(function(username, password, done){
  if(username === "grupo8" &&  password === "grupo8")
  return done(null,{id: 1, name: "Kevin"});
  done(null, false);
}))

router.get("/", (req, res, next) => {
  if(req.isAuthenticated()) return next();
  res.redirect("/login")
},async (req, res) => {

  keyRSA = await  myRsa.generateRsaKey(2048);
 
      const { publicKey, privateKey } = await myPailler.generateRandomPaillerKeys(3072)
      var PaillerPublicKey = publicKey 
      const iniciarVoto = 0n;
      votos = PaillerPublicKey.encrypt(iniciarVoto);

    res.json({
      nada: nada
      
    })
  
})
router.post("/signature", async (req, res) => { 
  console.log("Se firmará el sigueinte mensaje : " + req.body.hashAlice)
  const firma = this.keyUPC.privateKey.sign(bigintConversion.hexToBigint(req.body.hashAlice))
  console.log("firma para Allice " + firma) 
  console.log("firma para Allice en HEX "+ bigintConversion.bigintToHex(firma))
  res.json({
    signature:  bigintConversion.bigintToHex(firma)
  })

})
router.get("/publickey" ,rsaController.getPulicKey);
router.put(("/sendmessage"), rsaController.receiveEncryptedMessage)
router.get("/getPublicKey", async (req, res) => {
  
  console.log("peticion de llave publica de la UPC + " + this.keyUPC.publicKey.e)
  res.json({

      eHex: bigintConversion.bigintToHex( this.keyUPC.publicKey.e),
      nHex: bigintConversion.bigintToHex( this.keyUPC.publicKey.n),
      
  })
})
router.get("/pailler", rsaController.paillerget)
router.get("/")
router.post("/login", passport.authenticate('local',{
  successRedirect: "/authentication",
  failureRedirect: "/"
}))

module.exports = router;
