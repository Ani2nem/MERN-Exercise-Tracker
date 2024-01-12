import React, {useState, useEffect} from 'react';
import {Link } from 'react-router-dom';
import axios from 'axios';


const Exercise = (props) => {
   return( 
   <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10)}</td>
        <td>
            <Link to={"/edit/"+props.exercise._id}>edit</Link> | <button type="button" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</button>
        </td>
    </tr>
    );
}


const ExercisesList = () => {
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5001/exercises/')
        .then(response => {
            setExercises(() => response.data)})
        .catch((error) => {
            console.log("Error: " + error);
         })
    }, [])

   const deleteExercise = (id) => {
        axios.delete('http://localhost:5001/exercises/'+id)
        .then(res => console.log(res.data))
        .catch((error) => {
            console.log("Error: " + error)
        });

        setExercises((prevExercises) => prevExercises.filter(el => el._id !== id));
        }

     function exerciseList() {
        return exercises.map(currentexercise => {
            return <Exercise exercise={currentexercise} deleteExercise={deleteExercise} key={currentexercise._id}/>;
        })
    }
    
    return (
        <div>
            <h3>Logged Exercises</h3>
            <table className='table'>
                <thead className="thread-light">
                    <tr>
                        <th>UserName</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {exerciseList()}
                </tbody>
            </table>
        </div>
    )
}

export default ExercisesList;