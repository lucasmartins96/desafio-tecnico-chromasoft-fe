# Usar a imagem do Node.js
FROM node:23

# Definir o diretório de trabalho
WORKDIR /app

# Copiar os arquivos do projeto
COPY package.json package-lock.json ./
RUN npm install

# Copiar o restante do código
COPY . .

# Expor a porta do Vite
EXPOSE 5173

# Comando para iniciar o projeto
CMD ["npm", "run", "dev", "--", "--host"]
