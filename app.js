const dotenv = require ('dotenv');
const express = require ('express');
const helmet = require ('helmet');
const mongoose = require ('mongoose');
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauces');
const path = require('path');

dotenv.config();
const app = express();

/* MongoDB Connection */
const host = process.env.HOST;
const login = process.env.LOGIN;
const pass = process.env.PASSWORD;
const dbName = process.env.DBNAME;
mongoose.connect(`mongodb+srv://${login}:${pass}@${host}/${dbName}?retryWrites=true&w=majority`)
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

//Pour gérer la requête POST venant de l'application front-end
app.use(express.json());

/* Middleware */
app.use('/images', express.static(path.join(__dirname, '/images')));
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);

module.exports = app;
