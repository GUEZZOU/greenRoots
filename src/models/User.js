import { DataTypes } from 'sequelize';// on récupère et le type DataType du package sequelize pour définir les types de données des colonnes de la table
import sequelize from '../configs/sequelize.js';// on récupère l'instance de sequelize définie dans le fichier sequelize.js
import bcrypt from 'bcrypt';// on récupère la fonction bcrypt du package bcryptjs

// on définit la table User qui contiendra les informations des utilisateurs.

const User = sequelize.define('User', {
     // DataTypes est un objet fourni par sequelize qui nous met à disposition tous les types de datas.
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    lastname: {
        type: DataTypes.STRING(50),
        allowNull: false,// la colonne ne peut pas être nulle
    },
    firstname: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            // on crypte le mot de passe avant de l'enregistrer dans la base de données
            const salt = bcrypt.genSaltSync(10);// on génère un sel pour le cryptage //salt==> (est une chaîne de caractères aléatoire utilisée pour augmenter la sécurité d'un hash de mot de passe. Le sel est ajouté au mot de passe avant de le hacher, ce qui permet d'éviter les attaques par table arc-en-ciel et de générer des hash uniques même pour des mots de passe identiques.) ?
            const hash = bcrypt.hashSync(value, salt);// on crypte le mot de passe
            this.setDataValue('password', hash);// on enregistre le mot de passe crypté dans la colonne password
        },
        validate: {
            // len: [8, 50], // Longueur entre 8 et 50 caractères
            is: {
                args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, // Au moins une minuscule, une majuscule, un chiffre
                msg: "Le mot de passe doit contenir au moins une minuscule, une majuscule, et un chiffre"
            },

        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,// la colonne doit être unique dans la base de données
        validate: {// on définit des règles de validation pour la colonne email
            isEmail: true,// la valeur doit être une adresse email valide
        },
    },
    phone_number: DataTypes.STRING,
    address: DataTypes.STRING,
    zip_code: DataTypes.STRING,
    city: DataTypes.STRING,
    role: {
        type: DataTypes.STRING(50),
        allowNull: false,// la colonne ne peut pas être nulle
        validate: {// on définit des règles de validation pour la colonne role
            isIn: {// la valeur doit être dans une liste de valeurs prédéfinies
                args: [['admin', 'user', 'guest', 'partner', 'manager']], // Liste des rôles possibles pour un utilisateur de l'API 
                msg: "Le rôle doit être 'admin', 'user', 'guest', 'partner' ou 'manager'"// 
            },
        },
    }
}, {
    paranoid: true,// on ne supprime pas les données de la base de données mais on ajoute une colonne deletedAt qui contient la date de suppression de la donnée(pour garder une trace et le cas échéant restaurer les données avec destroy())
});

  export default User; 

                                                                                                