import { User } from '../configs/relations.js';
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken';
//import { isAdmin } from '../middlewares/isAdminMiddleware.js';

//* gérer la connexion d'un utilisateur.
export const loginForm = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Un ou plusieurs champs obligatoires sont manquants' });
        }

        const user = await User.findOne({ where: { email: email }});
        if (!user) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }
       
        // vérification du mot de passe
        const validPassword = await bcrypt.compare(password, user.password);
        //console.log(user.password);
        if(!validPassword){
            return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }
        const token = jwt.sign({
            id: user.id,
            lastname: user.lastname,
            firstname: user.firstname,
            email: user.email,
            role: user.role
        }, process.env.JWT_SECRET, { expiresIn: '24h' });

        return res.json({ access_token: token });

    } catch (error) {
        console.error("Erreur dans le processus de connexion :", error);
        res.status(500).json({ message: "Erreur dans bdd", error });

    }
};

