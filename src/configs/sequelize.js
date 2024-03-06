import { Sequelize } from "sequelize";// import sequelize depuis le package sequelize Sequelize est une classe qui permet de créer une instance de sequelize
import dotenv from 'dotenv';//

dotenv.config();

//connexion à la base de données
const sequelize = new Sequelize({// on crée une nouvelle instance de sequelize en passant les paramètres à cette fonctionconst
    dialect: "postgres",// on définit le dialecte de la base de données (ici PostgreSQL)
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    logging: false// on désactive les logs de la base de données pour ne pas polluer la console
});

export default sequelize;