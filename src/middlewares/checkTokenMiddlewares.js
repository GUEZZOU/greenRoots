
// Extraction du token  du header de la requête

const extractBearer = (authorization) => {//extraire le token du header de la requête
    // (req.headers.authorization)  et le retourner.    
    if (!authorization || !authorization.startsWith("Bearer ")) {//vérifier si le token est présent dans le header de la requête (req.headers.authorization).
        throw new Error("Invalid authorization");
    }
    return authorization.substring(7);//retourner le token.substring(7) pour extraire le token du header de la requê et(7)  pour supprimer le mot "Bearer".
};
// Vérification de la présence du token dans le header de la requête
// Si il n'est pas présent, une erreur est renvoyée. Sinon on continue à traiter la requête.
 const checkTokenMiddleware = (req, res, next) => {
    const token = req.headers.authorization && extractBearer(req.headers.authorization);//extraire le token du header de la requête (req.headers.authorization).
  
    if (token)  {
        req.decodedJWT = jwt.verify(token, process.env.JWT_SECRET);
       
    } else if(req.headers.authorization === undefined) {
        return res.status(401).json({ message: "Vous n'êtes pas connecté" });
    }  
    next();
};
   


export default checkTokenMiddleware;