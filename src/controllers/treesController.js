import { Trees, Campaign, User, TrackedTree } from "../configs/relations.js";
// pour récupérer toutes les arbres
export const getAllTrees = async (req, res) => {
    try{
    const teers = await Trees.findAll();
        res.json(teers);
}catch (error){
    (res.status(500).json({message: "Erreur dans la récupération des arbres", error}))}
};
// pour récupérer  une arbre en fonction de son id
export const getTree = async (req, res) => {
    try{
        const treeeId = parseInt(req.params.id);
        if(!treeeId){
            return res.json("Id non valide") 
        }
         const tree = Trees.findOne({
            where: {id: treeeId},
            include: [Campaign,  User],});// Inclure Campaign et User pour avoir plus de données sur chaque arbre
          if (!tree) {
              return res.status(404).json({message: "L'arbre est introuvable"});
           }
        res.json(tree);
        
        }catch(error){(res.status(500).json({message: "Erreur dans la récupération de l'arbre", error}))};
};
// Pour ajouter un nouvel arbre
export const addTree = async (req, res) => {
    try {
        const { name, description, kind, price, quantity, image_url, campaignId, date_plantation  } = req.body;
        if (!name || !description || !kind || !price || !quantity || !image_url || !campaignId || !date_plantation) {
            throw new Error("Il manque des informations");
        }

        // Vérifier si la campagne existe
        const campaign = await Campaign.findByPk(campaignId);
        if (!campaign) {
            throw new Error("Campagne non trouvée");
        }

        // Vérifier si l'arbre existe déjà
        const existingTree = await Trees.findOne({ where: { name } });
        if (existingTree) {
            throw new Error(`Arbre '${name}' déjà existant`);
        }

        // Créer l'arbre
        const tree = await Trees.create({// Créer une nouvelle entrée dans la table Trees
            name,
            description,
            kind,
            price,
            quantity,
            image_url,  
        });

        // Associer l'arbre à la campagne avec TrackedTree
        await TrackedTree.create({// Créer une nouvelle entrée dans la table TrackedTree en liant l'arbre et la campagne
            campaignId,
            treeId: tree.id,// L'id de l'arbre créé précédemment
            status: "en attente", // L'arbre est en attente de validation
            date_plantation,// La date de plantation est null pour le moment
        });
        res.status(201).json({ message: "L'arbre a été ajouté avec succès à la campagne", tree });

    } catch (error) {
        res.status(500).json({ message: "Erreur dans l'ajout de l'arbre à la campagne", error: error.message });
    }
};
// pour modifier une arbre existant
export const updateTree = async (req, res) => {
    try {
        const treeId = parseInt(req.params.id);
        if (!treeId) {
            return res.status(400).json({ message: "ID non valide" });
        }
        const { name, description, kind, price, quantity, image_url } = req.body;
        if (!name || !description || !kind || !price || !quantity || !image_url) {
            throw new Error("Il manque des informations");
        }
        const tree = await Trees.update({
            name,
            description,
            kind,
            price,
            quantity,
            image_url,
        }, {
            where: { id: treeId }
        });
        res.json({ message: "L'arbre a été modifié avec succès", tree });
    } catch (error) {
        res.status(500).json({ message: "Erreur dans la modification de l'arbre", error: error.message });
    }
};

// pour restaurer une arbre
export const untrashTree = async (req, res) => {
    try {
        const treeId = parseInt(req.params.id);
        if (!treeId) {
            return res.status(400).json({ message: "ID non valide" });
        }
        const tree = await Trees.update({
            where: { id: treeId }
        });
        res.json({ message: "L'arbre a été restauré avec succès", tree });
    } catch (error) {
        res.status(500).json({ message: "Erreur dans la restauration de l'arbre", error: error.message });
    }
};
// pour supprimer définitivement une arbre
export const trashTree = async (req, res) => {
    try {
        const treeId = parseInt(req.params.id);
        if (!treeId) {
            return res.status(400).json({ message: "ID non valide" });
        }
        // On vérifie si le produit existe avant de le supprimer
        const tree = await Trees.findByPk(treeId);
        if (!tree) {
            return res.status(404).json({ message: "Arbre non trouvé" });
        }
        // await TreeImages.destroy({// Supprimer les images associées à l'arbre
        //     where: { treeId }
        // });
        // await Comments.destroy({// Supprimer les commentaires associés à l'arbre
        //     where: { treeId }
        // });
        // await FavoritesTrees.destroy({// Supprimer les favoris associés à l'arbre
        //     where: { treeId }
        // });
        await tree.destroy();//supprimer l'arbre
        res.json({ message: "L'arbre a été supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur dans la suppression de l'arbre", error: error.message });
    }
}  ;    
