import 'dotenv/config'
import express from 'express'
import { router } from './router'
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./shared/swagger.json"; 

const app = express();

// 1. Middlewares de base (Sempre no topo!)
app.use(express.json()); 

// 2. Documentação (Precisa do app já instanciado e JSON configurado)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// 3. Rotas da aplicação
app.use(router);

app.listen(3000, () => {
    console.log("🚀 Servidor Rodando em http://localhost:3000");
    console.log("📝 Documentação disponível em http://localhost:3000/api-docs");
});