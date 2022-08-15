import axios from 'axios';
import React from 'react'
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
import classes from './AuthForm.module.scss'

function Login() {

  const navigate = useNavigate(); // pour la redirection
  const login = async (e) => {
    e.preventDefault();
    // récupération des valeurs du formulaire
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await axios.post('/api/auth/login', { 
        email, 
        password, 
      });
      navigate('/');
      toast.success('Vous êtes connecté !');
    } catch (err) {
      console.log(err);
      toast.error('Erreur lors de la connexion');
    }
  }
  return (
    <div className={classes.register}>
      <h1 className={classes.title}>
        Login
      </h1>
      <form className={classes.authForm} onSubmit={login}>
        <label htmlFor="email">
          Email
          <input type="email" name='email' placeholder='Email' required/>
        </label>
        <label htmlFor="password">
          Password
          <input type="password" name='password' placeholder='Password' required/>
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;