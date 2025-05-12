import express from "express";
import cors from 'cors';
import bodyParser from "body-parser";
import autenticacionRouter_ws from "./src/routers/autenticacionRouter_ws.js";
import userRouter_ws from "./src/routers/userRouter_ws.js";
import petRouter_ws from "./src/routers/petRouter_ws.js";
import raceRouter_ws from "./src/routers/raceRouter_ws.js";
import genderRouter_ws from "./src/routers/genderRouter_ws.js";
import categorieRouter_ws from "./src/routers/categorieRouter_ws.js";
import reportePetsRouter_ws from "./src/routers/reportePetsRouter_ws.js"
import path from 'path';
import { fileURLToPath } from 'url';

const app = express(); 
app.use(cors());
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(autenticacionRouter_ws);
app.use(userRouter_ws);
app.use(petRouter_ws);
app.use(raceRouter_ws);
app.use(genderRouter_ws);
app.use(categorieRouter_ws);
app.use(reportePetsRouter_ws);

app.set('views','./src/views');
app.set('view engine', 'ejs')

app.get('/documentation_ws',(req,res)=>{
    res.render('documentation_ws.ejs')});

app.listen(3000, '0.0.0.0',()=>{
    console.log("Servidor corriendo en el puerto 3000 url http://10.4.20.64:3000");

    console.log(
        `Version 1 de documentacion nativa dsiponible en url http://10.4.20.64:3000/documentation_ws`
    )
});