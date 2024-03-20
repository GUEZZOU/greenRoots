import { Campaign, CampaignPictures, Trees, User } from '../configs/relations.js';


// Récupérer tous les campagnes (GET)
export const getAllCampaigns = async (req, res) => {    
    try{
        const campaigns = await Campaign.findAll();
        res.json(campaigns);
    } catch (error) {   
        res.status(500).json({message: "Erreur dans la récupération des campagnes", error});
    }
};
// Récupérer  une campagne (GET) par son id
export const getCampaign= async (req, res) =>{
    try {
        const campaignId = parseInt(req.params.id)
        const campaign = await Campaign.findOne({ //
            where: { id: campaignId },
            include: [CampaignPictures, Trees,  User], // Inclure CampaignPictures  et Trees pour avoir plus de données sur chaque campagne
            })
        
        if(!campaign){
            throw new Error("La campagne est introuvable");
        }
        res.json(campaign)
    } catch(error){
        res.status(500).json({message: "Erreur dans la récupération de la campagne", error});
    }
}
// Ajouter une campagne (POST)
export const addCampaign = async (req, res) => {
    try{
        const {name, description , starting_date, ending_date, place, image_url} = req.body
        if(!name || !description || !starting_date || !ending_date || !place || !image_url){
            throw new Error("Il manque des informations");
        }
       // Créer la campagne
       const campaign = await Campaign.create({
        name,
        description,
        starting_date,
        ending_date,
        place,
    });

    // Ajouter les images associées à la campagne
        for (const imageUrl of image_url) {
            await CampaignPictures.create({
                image_url: imageUrl,
                campaign_id: campaign.id
            });
        };
        
        res.status(201).json({message: "Campagne ajoutée avec succès", data: campaign});
    }catch (error){
       res.status(500).json({message: "Erreur dans l'ajout de la campagne", error});
    }};

// Modifier une campagne (PATCH)
export const updateCampaign = async (req, res) => {
    try {
        const campaignId = parseInt(req.params.id);
        if (!campaignId) {
            return res.status(400).json({ message: "ID non valide" });
        }
        const { name, description, starting_date, ending_date, place, image_url } = req.body;
        const updatedCampaign = await Campaign.update(
            name,
            description,
            starting_date, 
            ending_date, 
            place, 
            image_url, 
        {// Mettre à jour les informations de la campagne
            where: { id: campaignId }
        });
        if (updatedCampaign[0] === 0) {
            return res.status(404).json({ message: "Campagne non trouvée" });
        }
        res.json({ message: "Campagne modifiée avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur dans la modification de la campagne", error });
    }
}

// Supprimer une campagne (DELETE)
export const trashCampaign = async (req, res) => {try{
    const campaignId = parseInt(req.params.id); 
      if(!campaignId){ 
        return res.status(400).json({message:"Id non valide"});}
        const deletedCampaign = await Campaign.destroy({
            where: { id: campaignId }
        });
        if (deletedCampaign === 0) {
            return res.status(404).json({ message: "Campagne non trouvée" });
        }
        res.json({ message: "Campagne supprimée avec succès" });
  }catch (error){
      res.status(500).json({message: "Erreur dans la suppression de la campagne", error});
  }};
// Restaurer une campagne (POST)
export const untrashCampain = async (req, res) => {
    try {
        const campaignId = parseInt(req.params.id);//
        if (!campaignId) {//
            return res.status(400).json({ message: "ID non valide" });
        }
        const restoredCampaign = await Campaign.restore({
            where: { id: campaignId }//
        });
        if (!restoredCampaign) {//
            return res.status(404).json({ message: "Campagne non trouvée" });
        }
        res.json({ message: "Campagne restaurée avec succès", data: restoredCampaign });
    } catch (error) {
        res.status(500).json({ message: "Erreur dans la restauration de la campagne", error });
    }
};