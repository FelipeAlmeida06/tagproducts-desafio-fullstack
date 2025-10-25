FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

# Build de produção
RUN npm run build

EXPOSE 3000

# Servir app em produção com preview do Vite
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "3000"]