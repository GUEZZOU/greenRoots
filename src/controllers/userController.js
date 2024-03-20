    
    import { User } from '../configs/relations.js';
    import bcrypt from 'bcrypt'; 
    import { isAdmin } from '../middlewares/isAdminMiddleware.js';
   

         //* créer un nouvel utilisateur
         export const  addUser = (req, res) => {
            const { lastname, firstname, email, password, role } = req.body
    
            if (!lastname || !firstname || !email || !password || !role) {
                return res.status(400).json({ message: 'Un ou plusieurs champs obligatoires sont manquants' });
            }
    
            User.findOne({ where: { email: email }, raw: true })
            .then(user => {
                if (user) {
                    return res.status(409).json({ message: 'Cet email est déjà utilisé' });
                }

                bcrypt.hash(password, 10)
                    .then(hash => {
                        req.body.password = hash;

                        User.create(req.body)
                            .then((user) => res.json({ message: 'Utilisateur créé', data: user }))
                            .catch(error => res.status(500).json({ message: 'erreur bdd', error }));

                    })
                    .catch(error => res.status(500).json({ message: 'erreur bdd', error }));

            })
    }
            
        //* récupérer tous les utilisateurs

        export const getAllUsers = async (req, res) => {
                try {
                    const users = await User.findAll(); 
                    res.json(users); 
                } catch (error) {
                    res.status(500).json({ message: 'erreur bdd', error });
                }
            }
        //* récupérer un utilisateur par son id

        export const getUserById = async (req, res) => {
                try {
                    const user = await User.findByPk(req.params.id); 
                    res.json(user); 
                } catch (error) {
                    res.status(500).json({ message: 'erreur bdd', error });  
                }
            }

         //* modifier un utilisateur existant
         export const updateUser = async (req, res) => {
            try {
                let userId = parseInt(req.params.id);
        
                if (!userId) {
                    return res.status(400).json({ message: 'ID non valide' });
                }
                const user = await User.findOne({ where: { id: userId } });
                if (!user) {
                    return res.status(404).json({ message: 'Utilisateur non trouvé' });
                }
                await User.update(req.body, { where: { id: userId } });
        
                if (isAdmin) {
                    // Si l'utilisateur est un admin, redirige vers /admin/dashboard pour ne pas changer de page et actualiser
                    res.redirect('/admin/dashboard');
                } else {
                    res.json({ message: 'Utilisateur modifié' });
                }
            } catch (error) {
                res.status(500).json({ message: "Erreur lors de la mise à jour de l'utilisateur", error });
            }
        };
        
        //* supprimer un utilisateur
        export const deleteUser = async (req, res) => {
            try {
                const userId = req.params.id;
                const user = await User.findByPk(userId);
                if (!user) {
                    return res.status(404).json({ message: 'Utilisateur non trouvé' });
                }
        
                await user.destroy();
                if (isAdmin) {
                    // Si l'utilisateur est un admin, redirige vers /admin/dashboard pour ne pas changer de page et actualiser
                    res.redirect('/admin/dashboard');
                } else {
        
                     res.json({ message: 'Utilisateur supprimé' });
                }
            } catch (error) {
                res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur', error });
            }
        }

        //* variante soft delete de l'utilisateur (user récupérable)
        export const softDeleteUser = async (req, res) => {
                try {
                    const userId = req.params.id;
                    const user = await User.findByPk(userId);

                    // Vérifie si le champ id est cohérent
                    if (!userId) {
                        return res.status(400).json({ message: 'id non valide' });
                    }
            
                    // suppression de l'utilisateur
                    User.destroy({ where: { id: userId } }) //"force: true" enlevé pour soft delete
                    if (isAdmin) {
                        // Si l'utilisateur est un admin, redirige vers /admin/dashboard pour ne pas changer de page et actualiser
                        res.redirect('/admin/dashboard');
                    } else {

                    await user.save();
                        res.json({ message: 'Utilisateur supprimé' });
                    }
                } catch (error) {
                    res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur', error });
                } 
        }

        //* restauration de l'utilisateur supprimé
        export const restoreUser = async (req, res) => {
                        try {
                            const userId = req.params.id;
                            const user = await User.findByPk(userId);
                            if (!user) {
                                return res.status(404).json({ message: 'Utilisateur non trouvé' });
                            }
                    
                            user.deletedAt = null;// restaure la date de suppression
                            await user.save();//sauvegarde les modifications
                            res.json({ message: 'Utilisateur restauré' });
                        } catch (error) {
                            res.status(500).json({ message: 'Erreur lors de la restauration de l\'utilisateur', error });
                        }
        }
        //* récupérer le profil de l'utilisateur
        export const getProfil = async (req, res) => {
            try {
                // L'ID de l'utilisateur est extrait à partir du token décodé
                    const userId = req.decodedJWT.id;//extraire l'ID de l'utilisateur du token décodé
                    const user = await User.findByPk(userId,{//rechercher l'utilisateur dans la base de données en fonction de son ID.
                    attributes: ['firstname', 'lastname', 'email'],});
                   // Vérification si l'utilisateur est trouvé
                    if (!user) {
                        return res.status(404).json({ message: 'User not found' });
                    }
                
            // Renvoyer les données de l'utilisateur
                    res.json(user);
            } catch (error) {
                    console.error('Erreur lors de la récupération du profil utilisateur:', error);
                    res.status(500).json({ message: 'Erreur bdd' });
            }
        }
  
        //* mettre à jour le profil de l'utilisateur
        
        
        
        

    



