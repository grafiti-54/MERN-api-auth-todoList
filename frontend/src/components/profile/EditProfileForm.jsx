import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsArrowLeftShort } from 'react-icons/bs';
import axios from 'axios';
import toast from 'react-hot-toast';
import classes from './EditProfileForm.module.scss';

// recupere les données de l'utilisateur
function EditProfileForm() {
  const [user, setUser] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    (
      async () => {
        try {
          const { data } = await axios.get('/api/users/me');
          setUser(data);
        } catch (err) {
          console.log(err);
        }
      }
    )();
  }, []); // on met un tableau vide car on ne veut pas qu'elle soit appelée à chaque chargement de la page (boucle infinie)

  // modifier les données de l'utilisateur dans les champs du formulaire
  const updateUserInfo = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  //fonction de modification de l'utilisateur submit
  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put('/api/users/me', user);
      toast.success('Profile mis à jour');
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Link className={classes.backBtn} to="/">
        <BsArrowLeftShort />
        Home
      </Link>
      <div>
        <h1>Edit Profile</h1>
        <form className={classes.editForm} onSubmit={updateProfile}>
          <label htmlFor="name">
            Full Name:
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              required
              value={user.name}
              onChange={updateUserInfo} // sans onChange, il n'est pas possible de modifier le champ a cause de value defini dans le state
            />
          </label>
          <label htmlFor="email">
            email:
            <input
              name="email"
              type="email"
              placeholder="email"
              required
              value={user.email}
              onChange={updateUserInfo}
            />
          </label>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}

export default EditProfileForm;