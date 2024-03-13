
// Middleware pour vérifier si l'utilisateur est un administrateur.
// Si l'utilisateur est un administrateur, la requête est transmise au middleware suivant.
export const isAdmin = (req, res, next) => {
    if (req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: "Vous n'êtes pas admin" });//
    }
};

