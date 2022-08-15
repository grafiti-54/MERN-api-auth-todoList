import Task from '../models/task.js';
import createError from '../utils/createError.js';

// creation d'une nouvelle tache pour la todo list
export const createTask = async (req, res, next) => {
	try {
		// on crée une nouvelle tache avec les infos de la requete
		const newTask = new Task({
			title: req.body.title,
			user: req.user.id, // on récupère l'id de l'utilisateur a qui appartient la tache
			completed: req.body.completed,
		});
		// on la sauvegarde dans la base de données
		const savedTask = await newTask.save();
		return res.status(201).json(savedTask); // on retourne la tache créée
	} catch (error) {
		return next(error);
	}
};

// recuperation de toutes les taches de la todo list
export const getAllTasks = async (req, res, next) => {
	try {
		const tasks = await Task.find({}); // on recupere toutes les taches de la bdd
		return res.status(200).json(tasks); // on retourne les taches
	} catch (error) {
		return next(error);
	}
};

//recupération des taches de l'utilisateur connecté
export const getCurrentUserTasks = async (req, res, next) => {
	try {
		const tasks = await Task.find({ user: req.user.id }); // on recupere toutes les taches de l'utilisateur
		return res.status(200).json(tasks); // on retourne les taches
	} catch (error) {
		return next(error);
	}
};

// mise à jour d'une tache (effectué ou non)
export const updateTask = async (req, res, next) => {
	try {
		// params est utilisé lors d'un passage de parametre par la route
		const task = await Task.findById(req.params.taskId).exec(); // on recupere la tache a mettre a jour
		if (!task)
			// si la tache n'existe pas
			return next(
				createError({ status: 404, message: 'La tache est introuvable' })
			); // on retourne une erreur
		if (task.user.toString() !== req.user.id)
			// si l'utilisateur n'est pas le proprietaire de la tache
			return next(
				createError({
					status: 401,
					message: "Vous n'avez pas les droits pour modifier cette tache",
				})
			); // on retourne une erreur

		const updatedTask = await Task.findByIdAndUpdate(
			req.params.taskId,
			{
				title: req.body.title,
				completed: req.body.completed,
			},
			{ new: true }
		); // on met a jour la tache
		return res.status(200).json(updatedTask); // on retourne la tache mise a jour
	} catch (error) {
		return next(error);
	}
};

export const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.taskId).exec(); // on recupere la tache a supprimer
        if (!task)
			// si la tache n'existe pas
			return next(
				createError({ status: 404, message: 'La tache est introuvable' })
			); // on retourne une erreur
		if (task.user.toString() !== req.user.id)
			// si l'utilisateur n'est pas le proprietaire de la tache
			return next(
				createError({
					status: 401,
					message: "Vous n'avez pas les droits pour supprimer cette tache",
				})
			); // on retourne une erreur
            // on supprime la tache si les verifications sont ok
            await Task.findByIdAndDelete(req.params.taskId);
            return res.status(200).json("Tache supprimé avec succés"); // on retourne un status 204
    } catch (error) {
        return next(error);
    }
}


// export const deleteAllTasks = async (req, res, next) => {
//     try {
//       await Task.deleteMany({ user: req.user.id });
//       return res.json('All Todo Deleted Successfully');
//     } catch (err) {
//       return next(err);
//     }
//   };