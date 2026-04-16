import 'dotenv/config'
import express from 'express'
import { router } from './router'
const app = express();
app.use(express.json()); // Desta forma o express é avisado que ele vai receber json 


//Criando a rota post de usuarios
//agora ele apenas leva para o router
app.use(router)



app.listen(3000, () => {
    console.log("Servidor Rodando!")
})