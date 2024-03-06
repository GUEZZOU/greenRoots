import express from 'express';// on récupère la fonction express du package express
import cors from 'cors';// on récupère la fonction cors du package cors
import bodyParser from "body-parser";// on récupère la fonction bodyParser du package body-parser
import router from './src/routers/indexRoutes.js';// on récupère le router défini dans le fichier indexRoutes.js
import sequelize from './src/configs/sequelize.js';// on récupère l'instance de sequelize définie dans le fichier sequelize.js

import dotenv from 'dotenv';// on utilise dotenv pour les variables d'environnement

dotenv.config();//récupère les variables d'environnement

//initialisation de l'API
const app = express(); // on execute la fonction express


/* En utilisant ce middleware, pour permette au backend de répondre aux requêtes provenant
 d'un domaine différent, ce qui est essentiel pour la communication entre le frontend et le backend 
 lorsque ceux-ci sont hébergés sur des serveur différents.*/
app.use(cors());

app.use(express.json()); // Pour parser les requêtes en JSON


app.use(bodyParser.urlencoded({ extended: true }));// on utilise le middleware bodyParser pour parser les requêtes en URL-encoded (pour les formulaires par exemple)

app.use(router);

// start serveur et test la connecte à la base de données
const port = process.env.PORT || 3001;// on définit le port sur lequel le serveur va écouter

sequelize.authenticate() // vérifie la connexion à la base de données en utilisant les identifiants fournis dans le fichier db.config.js
    .then(() => console.log('Connexion à la base de données réussie'))
    .then(() => app.listen(port, () => {
        console.log(`Serveur en route sur http://localhost:${port}/`)
         //console.log(`Back-office admin sur http://localhost:${port}/admin`)

    }))
    .catch((error) => console.error('Impossible de se connecter à la base de données:', error));