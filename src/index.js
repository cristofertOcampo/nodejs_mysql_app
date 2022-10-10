const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const path = require('path');


//! inicializaciones

const app = express();

//! settings for server
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views')); // Decirle a node donde eata la capeta views 
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}))
app.set('view engine', '.hbs');


//! Middlewares son funciones uqe se ejecutan cada vez que un usuario hace una peticion al server
app.use(morgan('dev'));// para que muestre un determinado tipo de mensaje por consola
app.use(express.urlencoded({extended:false})) //para poder aceptar desde los formularios los datos que me envie los usuarios 
app.use(express.json()); 

//! Global Variables
app.use((req, res, next)=>{

    next();
})
//! Routes

app.use(require('./routes/index.js'));
app.use(require('./routes/authentication.js'));
app.use('/links', require('./routes/links.js'));


//! public static
app.use(express.static(path.join(__dirname, 'public')));

//! Starting the server
app.listen(app.get('port'),()=>{
    console.log('listening on port '+app.get('port'));
});