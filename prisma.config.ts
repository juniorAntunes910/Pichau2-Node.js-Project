import { defineConfig } from "prisma/config";

export default defineConfig({
  // Caminho corrigido conforme sua imagem
  schema: "./src/shared/infra/prisma/schema.prisma", 
  
  migrations: {
    path: "./src/shared/infra/prisma/migrations",
  },
  
  datasource: {
    url: "file:../../../../dev.db", // Ajuste para o banco ficar na raiz ou use caminho absoluto
  },
});