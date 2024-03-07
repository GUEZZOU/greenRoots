import { DataTypes } from 'sequelize';
import sequelize from '../configs/sequelize.js';


const Campaign = sequelize.define('Campaign', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  starting_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  ending_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  place: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  deletedAt: {
    type: DataTypes.DATE//(soft delete) dans Sequelize, ce qui est utile pour une éventuelle récupération de données. 
  }
}, {
  paranoid: true  // pour activer la suppression logique (soft delete), ce qui est utile pour une éventuelle récupération de données.
})

export default Campaign;