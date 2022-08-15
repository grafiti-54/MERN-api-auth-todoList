import React, {useState} from 'react'
import toast from 'react-hot-toast';
import moment from 'moment'; // formata la date pour l'affichage en frontend
import classes from './TaskItem.module.scss';
import axios from 'axios';


function TaskItem({ task, deleteTask }) {

    const [isCompleted, setIsCompleted] = useState(task.completed);
    const [isLoading , setIsLoading] = useState(false);


    //gestion de la tache completé ou non
    const handleCheckboxClick = async () => {
        try {
            setIsLoading(true);
            await axios.put(`/api/tasks/${task._id}`,{
                completed: !isCompleted
            });
            setIsCompleted(!isCompleted);
            toast.success('Tâche modifiée');
        } catch (error) {
            console.log(error);
            toast.error('Une erreur est survenue');
        } finally {
            setIsLoading(false);
        }
    }

    

  return (
    <tr className={classes.task_item}>
        <td className={classes.task_name}>
            <div className={classes.checkbox} role={'checkbox'} aria-checked onChange={handleCheckboxClick} disabled={isLoading}>
                <input type="checkbox" checked={isCompleted} tabIndex={-1} readOnly disabled={isLoading} />
            </div>
            <p>{task.title}</p>
        </td>
        <td>{isCompleted ? 'Complete' : 'Incomplete'}</td>
        <td>{moment(task.createdAt).format('MMMM Do yy')}</td>
        <td>
            <button className={classes.deleteBtn} type="button" onClick={ () =>deleteTask(task._id)}>Supprimer </button>
        </td>
    </tr>
  )
}

export default TaskItem