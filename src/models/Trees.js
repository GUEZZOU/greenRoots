import { DataTypes } from 'sequelize';
import sequelize from '../configs/sequelize.js';


const Tree = sequelize.define('Tree', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  image_url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  kind: {// type d'arbre
    type: DataTypes.STRING,
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  price: {// prix unitaire
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  quantity: {// quantité en stock (en nombre d'arbres)
    type: DataTypes.INTEGER,
    allowNull: false
  },
  deletedAt: {
    type: DataTypes.DATE
  },
  
}, {
  paranoid: true
})


export default Tree;



