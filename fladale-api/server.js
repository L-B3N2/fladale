const express = require('express');
const path = require('path');
const cors = require("cors");
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
app.use(cors({
    origin: [process.env.CLIENT_URL],
    credentials: true
}));

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/consigli-page', express.static(path.join(__dirname, '../consigli-page')));
app.use('/home-page', express.static(path.join(__dirname, '../home-page')));
app.use('/giardino-page', express.static(path.join(__dirname, '../giardino-page')));
app.use('/scopri-page', express.static(path.join(__dirname, '../scopri-page')));
app.use('/storia-page', express.static(path.join(__dirname, '../storia-page')));
app.use('/immagini_comuni', express.static(path.join(__dirname, '../immagini_comuni')));
app.use('/log-in-page', express.static(path.join(__dirname, '../log-in-page')));
app.use('/profilo-page',express.static(path.join(__dirname,'../profilo-page')));
app.use('/dettaglio-page',express.static(path.join(__dirname,'../dettaglio-page')));
app.use('/password-dimenticata-page',express.static(path.join(__dirname,'../password-dimenticata-page')));

const apiRouter = require('./routes/api');
app.use('/', apiRouter);

module.exports = app;
