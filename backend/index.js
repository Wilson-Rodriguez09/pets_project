import express from "express";
import bodyParser from "body-parser";
import autenticacionRouter_ws from "./src/routers/autenticacionRouter_ws.js";
import userRouter_ws from "./src/routers/userRouter_ws.js";


const app = express(); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(autenticacionRouter_ws);
app.use(userRouter_ws);



app.listen(3000, ()=>{
    console.log("Servidor corriendo en el puerto 3000 url http://localhost:3000");

    console.log(
        `Version 1 de documentacion nativa dsiponible en url http://localhost:3000/api-docs`
    )
}) 