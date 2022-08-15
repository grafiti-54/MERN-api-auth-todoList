import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUserAlt } from 'react-icons/fa';
import classes from './Navbar.module.scss';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {toast} from 'react-hot-toast';

function Navbar() {

    const navigate = useNavigate(); 

    const [user, setUser] = useState(null);


    const getUser = async () => {
        try {
            const { data } = await axios.get('/api/users/me'); // on recupere les données de l'utilisateur
            setUser(data); // on les met dans le state
        } catch (error) {
            console.log(error);
        }
    };

    //appel de la fonction au chargement de la page
    useEffect(() => {
        getUser();
    }, []); // on met un tableau vide car on ne veut pas qu'elle soit appelée à chaque chargement de la page

    if (!user) return null;

    //fonction de deconnexion
    const handleLogout = async () => {
        try {
            await axios.get('/api/auth/logout'); // on recupere les données de l'utilisateur
            setUser(null); // on les met dans le state
            toast.success('Vous êtes déconnecté');
            navigate('/auth');
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <header>
            <div className={classes.userInfo}>
                <FaUserAlt className={classes.userIcon} />
                <div>
                    <h1 className={classes.name}>{user.name}</h1>
                    <h1 className={classes.email}>{user.email}</h1>
                    <Link to='/edite-profile' className={classes.editBtn}>Edit</Link>
                </div>
            </div>
            <nav>
                <button type='button' className={classes.logout} onClick={handleLogout}>Logout</button>
            </nav>
        </header>
    )
}

export default Navbar