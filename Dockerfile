#  image Node.js comme base
FROM node:18-alpine

# répertoire de travail definit dans le conteneur
WORKDIR /app

COPY package*.json ./

# Installe les dépendances
RUN npm install

# reste du code 
COPY . .

# Exposer le port sur lequel ton application écoute
EXPOSE 4000

# Commande pour démarrer l'application
CMD ["npm", "run", "dev"]