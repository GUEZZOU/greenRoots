    
    import { User } from '../configs/relations.js';
    import bcrypt from 'bcrypt';    // bcrypt est un package qui permet de hacher les mots de passe pour les sécuriser.
        export default {

         //* créer un nouvel utilisateur
         addUser: async (req, res) => {
            try {
                const { email, password, firstname, lastname, role } = req.body; 
                if (!email || !password || !firstname || !lastname || !role) {
                    return res.status(400).json({ message: 'Un ou plusieurs champs obligatoires sont manquants' });
                }
        
                const existingUser = await User.findOne({ where: { email: email } }); // Recherche si l'utilisateur existe déjà
                if (existingUser) {
                    return res.status(409).json({ message: 'Cet email est déjà utilisé' });
                }
        
                const hash = await bcrypt.hash(password, 10); 
        
                const newUser = await User.create({
                    email: email,
                    password: hash,
                    firstname: firstname,
                    lastname: lastname,
                    role: role
                }); 
        
                res.status(201).json({ message: 'Utilisateur créé', data: newUser }); // Envoie les données de l'utilisateur en JSON avec le statut 201 pour "Created"
            } catch (error) {
                console.error("Erreur lors de la création de l'utilisateur :", error);
                res.status(500).json({ message: "Erreur lors de la création de l'utilisateur", error }); // En cas d'erreur, renvoie une erreur en JSON avec le statut 500 pour "Internal Server Error"
            }
        },
   //* récupérer tous les utilisateurs

   getAllUsers: async (req, res) => {
    try {
        const users = await User.findAll(); // Récupère tous les utilisateurs de la table User
        res.json(users);  // Envoie les utilisateurs en JSON
    } catch (error) {
        res.status(500).json({ message: 'erreur bdd', error });  // En cas d'erreur, renvoie une erreur en JSON
    }
},
//* récupérer un utilisateur par son id

getUsers: async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id); // Récupère l'utilisateur dont l'id est celui passé en paramètre
        res.json(user);  // Envoie l'utilisateur en JSON
    } catch (error) {
        res.status(500).json({ message: 'erreur bdd', error });  // En cas d'erreur, renvoie une erreur en JSON
    }
},

}



