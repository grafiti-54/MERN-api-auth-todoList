// npm run dev

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import allRoutes from './routes/index.js';

const PORT = process.env.PORT || 8000;
const app = express();

//middleware 
app.use(cors());
app.use(morgan('tiny')); // HTTP request logger middleware for node.js affichage de la requête HTTP dans la console
app.use(express.json());
app.use(cookieParser());

//routes
app.use('/api', allRoutes)

// error handle gestion des erreurs
// eslint disable-next-line 
app.use((err, req,res, next) => {
    //console.log({err});
    const statuts = err.status || 500;
    const message = err.message || 'Erreur du serveur';

    return res.status(statuts).json({ message, stack:err.stack });
})

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING);
        console.log('MongoDB connecté');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

app.listen(PORT, () =>{
    connectDB();
    console.log(`Le serveur fonctionne sur le port ${PORT}`);
})
