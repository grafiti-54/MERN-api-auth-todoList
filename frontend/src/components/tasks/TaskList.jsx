import React, { useState, useEffect } from 'react';
import classes from './TaskList.module.scss';
import axios from 'axios';
import TaskItem from './TaskItem';
import toast from 'react-hot-toast';

function TaskList() {

    // modification / suppression d'une tâche
    const [taskList, setTaskList] = useState([]);

    // ajout d'une tâche
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [newTask, setNewTask] = useState('');


    // ajout d'une tâche
    const addNewTask = async (e) => {
        e.preventDefault(); // on empeche le rechargement de la page lors de l'ajout d'une tâche dans le formulaire
        if(newTask.length <= 0) {
            toast.error('Veuillez entrer un titre pour la tâche');
            return;
        }
        try {
           const {data} = await axios.post('/api/tasks', {
            title: newTask
        }); // on ajoute la tâche dans la base de données 
        toast.success('Tâche ajoutée');
        setTaskList([{...data},...taskList]); // on ajoute la tâche dans le state
        setNewTask(''); // on vide le champ du formulaire
        setIsAddingNew(false); // on cache le formulaire d'ajout de tâche
        } catch (error) {
            console.log(error);
            toast.error('Une erreur est survenue');
        }
    }



    // récupération des tâches
    const getTask = async () => {
        try {
            const { data } = await axios.get('/api/tasks/myTasks');
            console.log(data);
            setTaskList(
                data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // on trie les taches par date de creation
            );
        } catch (error) {
            console.log(error);
        }
    }

    //on retourne la fonction au chargement de la page
    useEffect(() => {
        getTask();
    }, []); // on met un tableau vide car on ne veut pas qu'elle soit appelée à chaque chargement de la page


    const addNewButtonClick = () =>{
        setIsAddingNew(!isAddingNew); // permet d'afficher ou non le formulaire d'ajout de tâche
    }





    // fonction de suppression de tache
    const deleteTask = async (id) => {
        try {
            await axios.delete(`/api/tasks/${id}`);
            toast.success('Tache supprimée');
            setTaskList(taskList.filter((task) => task._id !== id));
        } catch (error) {
            console.log(error);
            toast.error('Erreur lors de la suppression de la suppression');
        }
    }

    return (
        <div>
            <div className={classes.topBar}>
                <button type="button" className={classes.addNew} onClick={addNewButtonClick}>Ajouter tache</button>
            </div>

            {isAddingNew && (
                <form className={classes.addNewForm} onSubmit={addNewTask}>
                    <input type="text" value={newTask} onChange={e => setNewTask(e.target.value)} placeholder="Entrer une tache" />
                    <button type='submit'>Ajouter</button>
                </form>
            )}


            {taskList.length > 0 ? (
                <table className={classes.taskList_table}>
                    <tbody>
                        {taskList.map((task) => (
                            // on passe la tache en parametre (props) de la fonction TaskItem pour la recuperer dans la fonction TaskItem
                            <TaskItem task={task} deleteTask={deleteTask} key={task._id} />
                        ))}
                    </tbody>
                </table>
            ) : 'Aucune tache pour le moment'}
        </div>
    )
}

export default TaskList