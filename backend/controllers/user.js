import User from "../models/User.js"

//recupéaration des infos de l'utilisateur connecté
export const getUserInfo = async (req, res, next ) => {
    try {
        // ici on récupére l'id de l'utilisateur connecté dans la requete grace a l'id récupéré dans la session et non celui en base de données
        const data = await User.findById(req.user.id).select('name email '); // on récupére les infos de l'utilisateur connecté
        return res.status(200).json(data);
    } catch (err) {
        return next(err);
    }
}


// modification des infos de l'utilisateur connecté
export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.user.id,{
             name: req.body.name,
             email: req.body.email,
             }, {
                new: true,
             }).select ('name email'); // on récupére les infos de l'utilisateur connecté
            return res.status(200).json(updatedUser); // on renvoie les infos de l'utilisateur modifié
    } catch (error) {
        return next(error);
    }
}