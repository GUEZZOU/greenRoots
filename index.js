import express from 'express';// on récupère la fonction express du package express

import dotenv from 'dotenv';// on utilise dotenv pour les variables d'environnement

dotenv.config();//récupère les variables d'environnement

//initialisation de l'API

const app = express(); // on execute la fonction express


// En utilisant ce middleware, pour permette au backend de répondre 
// aux requêtes provenant d'un domaine différent, ce qui est essentiel pour la communication 
// entre le frontend et le backend lorsque ceux-ci sont hébergés sur des serveur différents.
//app.use(cors());

const port = process.env.PORT || 3001;// on définit le port sur lequel le serveur va écouter

// on place le serveur en mode écoute pour entendre les requêtes arriver sur le port défini
// dans la variable d'
app.listen(port, ()=>{
  console.log(`servrur en écoute sur http://localhost:${port}/ `)
});