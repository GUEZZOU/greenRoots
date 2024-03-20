import  express from 'express';
import {getAllCampaigns, getCampaign, addCampaign, updateCampaign, untrashCampain, trashCampaign } from '../controllers/campaignController.js';
const campaignRouter = express.Router();

campaignRouter.get('/', getAllCampaigns);// pour récupérer toutes les campagnes
campaignRouter.get('/:id', getCampaign);// pour récupérer toutes les campagnes

campaignRouter.post("/", addCampaign);// pour ajouter une campagne

campaignRouter.patch('/:id', updateCampaign)// pour modifier une campagne 

campaignRouter.put("/:id", updateCampaign);// pour modifier une campagne

campaignRouter.post('/untrash/:id', untrashCampain)// pour restaurer une campagne
    
campaignRouter.delete('/trash/:id', trashCampaign)// pour supprimer une campagne




export default campaignRouter;

