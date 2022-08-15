import bcryptjs from 'bcryptjs';
import createError from '../utils/createError.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// creation de compte utilisateur
export const register = async (req, res, next) => {
	// vérifier que les champs sont remplis
	if (!req.body.name || !req.body.email || !req.body.password) {
		return next(
			createError({
				status: 400,
				message: 'Tout les champs doivent etre remplis',
			})
		);
	}

	try {
		const salt = await bcryptjs.genSalt(10); //
		const hashedPassword = await bcryptjs.hash(req.body.password, salt); // hashage du mot de passe

		// creation d'un nouvel utilisateur
		const newUser = new User({
			name: req.body.name,
			email: req.body.email,
			password: hashedPassword,
		});
		// enregistrement de l'utilisateur dans la base de données
		await newUser.save();
		return res.status(201).json('Utilisateur créé avec succès');
	} catch (error) {
		console.log(error);
		return next(error);
	}
};

//connexion utilisateur
export const login = async (req, res, next) => {
	if (!req.body.email || !req.body.password) {
		return next(
			createError({
				status: 400,
				message: 'Tout les champs doivent etre remplis',
			})
		);
	}
	try {
		const user = await User.findOne({ email: req.body.email }).select(
			// on récupère uniquement les champs
			'name email password'
		);
		if (!user) {
			return next(
				createError({ status: 404, message: 'Utilisateur non trouvé' })
			);
		}
		const isPasswordCorrect = await bcryptjs.compare(
			req.body.password,
			user.password
		);
		if (!isPasswordCorrect) {
			return next(
				createError({ status: 400, message: 'Identifiants incorrect' })
			);
		}

		// information de l'utilisateur stocké pour la session
		const payload = {
			id: user._id,
			name: user.name,
		};

		// création du token avec la clé secrète dans .env et le payload de l'utilisateur
		const token = jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: '1d', // expiration du token dans 1 jour
		});

		// acces_token est le nom du cookie qui apparait dans le navigateur
		return res
			.cookie('access_token', token, 
				 {
				 httpOnly: true, // ne pas pouvoir récupérer le cookie sur le navigateur uniquement via le serveur
				 sameSite: 'Strict', // cookie accessible uniquement sur le site
				// Connection: keep-alive,
				}
			)
			.status(200)
			.json({ message: 'Connexion réussie' });
	} catch (error) {
		console.log(error);
		return next(error);
	}
};

// verification du token a chaque chargement ou changement de page
export const isLoggedIn = async (req, res) => {
	const token = req.cookies.access_token; // recuperation du token
	if (!token) {
		return res.json(false);
	}
    // verification du token
	return jwt.verify(token, process.env.JWT_SECRET, err => {
		if (err) {
			return res.json(false);
		} else {
			return res.json(true);
		}
	});
};

// déconnexion utilisateur

export const logout = async (req, res) => {
	// supprimer le cookie access_token
	res.clearCookie('access_token');
	return res.status(200).json({ message: 'Déconnexion réussie' });
};

// export const login = async (req, res, next) => {
//     if (!req.body.email || !req.body.password) {
//       return next(
//         createError({
//           message: 'Email and password are required',
//           statusCode: 400,
//         }),
//       );
//     }

//     try {
//       const user = await User.findOne({ email: req.body.email }).select(
//         'name email password',
//       );
//       if (!user) {
//         return next(
//           createError({ status: 404, message: 'User not found with the email' }),
//         );
//       }
//       const isPasswordCorrect = await bcryptjs.compare(
//         req.body.password,
//         user.password,
//       );
//       if (!isPasswordCorrect) {
//         return next(
//           createError({ status: 400, message: 'Password is incorrect' }),
//         );
//       }
//       const payload = {
//         id: user._id,
//         name: user.name,
//       };
//       const token = jwt.sign(payload, process.env.JWT_SECRET, {
//         expiresIn: '1d',
//       });
//       return res
//         .cookie('access_token', token, {
//           httpOnly: true,
//         })
//         .status(200)
//         .json({ name: user.name, email: user.email, message: 'login success' });
//     } catch (err) {
//       return next(err);
//     }
//   };
