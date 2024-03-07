import sequelize from './sequelize.js';
import User from '../models/User.js';
import Purchase from '../models/Purchase.js';
import Campaign from '../models/Campaign.js';
import Trees from '../models/Trees.js';
import TrackedTree from '../models/TrackedTree.js';
import TrackingSnapshot from '../models/TrackingSnapshot.js';
import CampaignPictures from '../models/CampaignPictures.js';
import Include from '../models/Include.js';


//? Associer Purchase à User avec une contrainte de rôle (user) pour les achats
User.hasMany(Purchase, { foreignKey: 'id_user', constraints: false, scope: { role: ['user'] } });
Purchase.belongsTo(User, { foreignKey: 'id_user', constraints: false });

//? Associer Campaign à User avec une contrainte de rôle (admin, manager) pour les campagnes
User.hasMany(Campaign, { foreignKey: 'id_user', constraints: false, scope: { role: ['admin', 'manager'] } });
Campaign.belongsTo(User, { foreignKey: 'id_user', constraints: false });

//? Associer Tree à Campaign avec une contrainte de rôle (admin, manager) pour les variétés d'arbres
Campaign.hasMany(Trees, { foreignKey: 'campaignId', constraints: false });
Trees.belongsTo(Campaign, { foreignKey: 'campaignId', constraints: false });

//? Associer TrackedTree à User avec une contrainte de rôle (admin, partner) pour les arbres suivis
User.hasMany(TrackedTree, { foreignKey: 'id_user', constraints: false, scope: { role: ['admin', 'partner'] } });
TrackedTree.belongsTo(User, { foreignKey: 'id_user', constraints: false });

//? Associer TrackedTree à Campaign avec une contrainte de rôle (admin, partner) pour les arbres suivis
TrackedTree.hasMany(TrackingSnapshot, { foreignKey: 'id_tracked_tree' });
TrackingSnapshot.belongsTo(TrackedTree, { foreignKey: 'id_tracked_tree' });

//? Associer Campaign à CampaignPictures avec une contrainte de rôle (admin, manager) pour les images de campagne
Campaign.hasMany(CampaignPictures, { foreignKey: 'campaignId' });
CampaignPictures.belongsTo(Campaign, { foreignKey: 'campaignId' });

//? Associer Tree à Include avec une contrainte de rôle (admin, manager) pour les variétés d'arbres incluses
Include.belongsTo(Purchase, { foreignKey: 'purchaseId' });
Include.belongsTo(Trees, { foreignKey: 'treeId' });

//? Associer Purchase à Include avec une contrainte de rôle (user) pour les achats
Purchase.hasMany(Include, { foreignKey: 'purchaseId' });
Trees.hasMany(Include, { foreignKey: 'treeId' });

//? Synchroniser les modèles avec la base de données
sequelize.sync({ alter: true }).then(async () => {
    console.log('Models synchronisés avec succès');
}, (err) => {
    console.error('Erreur lors de la synchronisation des modèles :', err);
});


export { User, Purchase, Campaign, Trees, TrackedTree, TrackingSnapshot, CampaignPictures, Include } 
