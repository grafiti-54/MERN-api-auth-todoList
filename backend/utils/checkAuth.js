import createError from './createError.js';
import jwt from 'jsonwebtoken';

//function de vérification de l'authentification de l'utilisateur et renvoi du token
export default (req, res, next) => {
    const token = req.cookies.access_token; // acces_token est le nom du cookie
    if(!token){
        return next(createError({ status:401, message: 'Vous devez être connecté pour accéder à cette ressource' }));
    }
    return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err){
            return next(createError({ status:401, message: 'Le token n\'est pas valide' }));
        }
            req.user = decoded;
            return next();
    })
}