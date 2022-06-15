const express = require('express');
const app = express();
const morgan = require('morgan');//This module, allow us see in the console what client requesting
const cors = require('cors');
const PassPortLocal = require('passport-local').Strategy
const passport = require('passport');
const { use } = require('./routes/rsaroute');
const { request } = require('express');
const session = require('express-session');


	
//Configurations
app.set('port', 3000);
app.set('json spaces', 2) 

//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());//With this now the server can understand the json formats
app.use(cors());
app.use(require('./routes/rsaroute'))
app.use(passport.initialize());
app.use(passport.session());






//Starting the server, now is listening
app.listen(app.get('port'),()=>{
    console.log(`Server listening on port ${app.get('port')}`);
    console.log(`http://localhost:${app.get('port')}`)
   
});


//All the middleware of express are functions(Manejador de peticion que  podemos ejecutar antes que llegue a su ruta original)
//Ser capaces entre un cliente y un servidor saber cifrar cosas con el RSA
//(con el cliente se descarga la clave publica del servidor le envias algo cifrado y que el servidor la pueda descifrar con su clave privada)



