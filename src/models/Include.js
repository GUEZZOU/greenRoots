import { DataTypes } from 'sequelize';
import sequelize from '../configs/sequelize.js';
import Purchase from './Purchase.js';
import Trees from './Trees.js';

const Include = sequelize.define('Include', {
  purchase_id: {// clé étrangère de la table Purchase
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Purchase,
      key: 'id'
    }
  },
  Trees_id: {// clé étrangère de la table Trees
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Trees,
      key: 'id'
    }
  },
  quantity: {// quantité de l'arbre inclus dans le dossier
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'Include',
  timestamps: false
});

export default Include;