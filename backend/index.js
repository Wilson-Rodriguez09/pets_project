import express from "express";
import bodyParser from "body-parser";

const app = express(); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.listen(3000, ()=>{
    console.log("Servidor corriendo en el puerto 3000 url http://localhost:3000");

    console.log(
        `Version 1 de documentacion nativa dsiponible en url http://localhost:3000/api-docs`
    )
}) 