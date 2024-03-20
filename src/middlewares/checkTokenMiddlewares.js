
// Extraction du token

const extractBearer = (authorization) => {
    if (typeof authorization !== 'string') {
        return false;
    }

    // On isole le token
    const matches = authorization.match(/(Bearer)\s+(\S+)/i); 

    return matches && matches[2];
}
// Vérification de la présence du token dans le header de la requête
// Si il n'est pas présent, une erreur est renvoyée. Sinon on continue à traiter la requête.
 const checkTokenMiddleware = (req, res, next) => {
    const token = req.headers.authorization && extractBearer(req.headers.authorization);//extraire le token du header de la requête (req.headers.authorization).
  
    if (token)  {
        req.decodedJWT = jwt.verify(token, process.env.JWT_SECRET);
       
        if (error) {
        return res.status(401).json({ message: "Vous n'êtes pas connecté" });
    }}  
    next();
};
   


export default checkTokenMiddleware;