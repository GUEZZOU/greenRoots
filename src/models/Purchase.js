import { DataTypes } from 'sequelize';
import sequelize from '../configs/sequelize.js';


const Purchase = sequelize.define('Purchase', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  date_of_purchase: {
    type: DataTypes.DATE,
    allowNull: false
  },
  
  state_of_purchase: {// état de la commande (en cours, annulée, terminée)
    type: DataTypes.STRING(100),
    isIn: [['en attente', 'annulée', 'terminée']], // vérification des valeurs autorisées
    defaultValue: 'en attente'
  },
  user_id: {// clé étrangère de la table clients
    type: DataTypes.INTEGER,
    type: DataTypes.TEXT,
    allowNull: false
  }
})


export default Purchase;