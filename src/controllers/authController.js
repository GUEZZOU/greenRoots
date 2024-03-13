import { User } from '../configs/relations.js';
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken';
//import { isAdmin } from '../middlewares/isAdminMiddleware.js';

//* gérer la connexion d'un utilisateur.
export const loginForm = async (req, res) => {
    try {
        const { email, password } = req.body;//extraire les champs (email, password )du corps de la requête (req.body).
        if (!email || !password) {//vérifier si les champs (email, password) sont vides.
            return res.status(400).json({ message: 'Un ou plusieurs champs obligatoires sont manquants' });
        }

        const user = await User.findOne({ where: { email: email }, raw:true });//rechercher un utilisateur dans la base de données en fonction de son email. 
        if (!user) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }

        //Vérification du Mot de Passe
        const valid = await bcrypt.compare(password, user.password);//compare()pour comparer le PW fourni (password) avec le mot de passe haché stocké dans la base de données pour cet utilisateur.
        if (!valid) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }

        /*Si l'utilisateur est trouvé dans la DB et que le PW correspond,
         la fonction utilise jwt.sign pour générer un token JWT qui contient les données de 
         l'utilisateur (id, lastname, firstname, email, role) et le secret JWT stocké dans 
         le fichier .env. Le token est ensuite renvoyé au client dans la réponse JSON.*/
          const token = jwt.sign({
                            id: user.id,
                            lastname: user.lastname,
                            firstname: user.firstname,
                            email: user.email,
                            role: user.role
                        }, process.env.JWT_SECRET, { expiresIn: '24h' });//Le token expire après 24 heures
                        return res.json({ access_token: token })//renvoyer le token au client dans la réponse JSON.
        
    } catch (error) {
        console.error("erreur dans le processus de connexion :", error);
        res.status(500).json({ message: "erreur dans bdd", error }); 
    }
}