import { DataTypes } from 'sequelize';
import sequelize from '../configs/sequelize.js';


const CampaignPictures = sequelize.define('CampaignPictures', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  image_url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
    campaign_id: { // clé étrangère de la table Campaigns
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    indexes: [
      { fields: ['campaign_id'] }
    ],
});

export default CampaignPictures;