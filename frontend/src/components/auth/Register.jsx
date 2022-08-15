import axios from 'axios';
import React from 'react'
import toast from 'react-hot-toast';
import classes from './AuthForm.module.scss'

function Register() {

const register = async (e) => {
  e.preventDefault(); // empeche le rechargement de la page avant la soumission du formulaire
  // récupération des valeurs du formulaire
  const user = {
    name: e.target.name.value,
    email: e.target.email.value,
    password: e.target.password.value
  };
  try{
    // envoi de la requête au serveur
    await axios.post('/api/auth/register', user);
    toast.success('Vous êtes inscrit !');
  } catch(err) {
    console.log(err);
    toast.error("Erreur lors de l'inscription");
  }
}


  return (
    <div className={classes.register}>
      <h1 className={classes.title}>Register</h1>
      <form className={classes.authForm} onSubmit={register}>
        <label htmlFor="name">
          Name
          <input type="text" name="name"  placeholder='Full Name' required />
        </label>
        <label htmlFor="email">
          E-mail
          <input type="email" name="email" placeholder='E-mail' required />
        </label>
        <label htmlFor="password">
          Password
          <input type="password" name="password" placeholder='Password' required />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register