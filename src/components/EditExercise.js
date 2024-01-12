import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const EditExercise = (props) => {
    const { id } = useParams();

    const [exercise, setExercise] = useState(
        {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    );

    useEffect(() => {
        axios.get('http://localhost:5001/exercises/'+id)
        .then(response => {
            setExercise((exercise) => ({
                ...exercise,
                username: response.data.username,
                description: response.data.description,
                duration: response.data.duration,
                date: new Date(response.data.date)
            }));
        })
        .catch((error) => {
            console.log("Error: " + error);
        })


        axios.get('http://localhost:5001/users/')
        .then(response => {
            if(response.data.length > 0){
                setExercise(() => ({
                    users: response.data.map(userData => userData.username),
                }));
            }
        })
    }, [id]); // empty dependecy means it'll only run once when the app is being loaded.
    


    const onChangeUserName = (e) => {
        setExercise((prevExercise) => ({
            ...prevExercise, 
            username: e.target.value
          }));
    }
    const onChangeDescription = (e) => {
        setExercise((prevExercise) => ({
            ...prevExercise, 
            description: e.target.value
          }));
    }
    const onChangeDuration = (e) => {
        setExercise((prevExercise) => ({
            ...prevExercise, 
            duration: e.target.value
          }));
    }
    const onChangeDate = (date) => {
        setExercise((prevExercise) => ({
            ...prevExercise, 
            date: date
          }));
    }
    
    const onSubmit= (e) => {
        e.preventDefault();

        const exerciseData = {
            username: exercise.username,
            description: exercise.description,
            duration: exercise.duration,
            date: exercise.date,
        }

       console.log(exerciseData);

       axios.post("http://localhost:5001/exercises/update/"+id, exerciseData)
       .then(res => console.log(res.data));

       window.location = '/';

    }

    
    return (
        <div>
            <h3>Edit Exercise Log</h3>
            <form onSubmit={onSubmit}>
                <div className='form-group mt-3'>
                <label htmlFor="userInput">Username: </label>
                    <select id="userInput"
                        required
                        className="form-control"
                        value={exercise.username}
                        onChange={onChangeUserName}>
                            {
                                exercise.users.map(function(user) {
                                    return <option
                                    key={user}
                                    value={user}>
                                     {user}
                                    </option>;
                                })
                            }
                        </select>
                </div>
                <div className='form-group mt-3'>
                    <label>Description: </label>
                    <input type="text"
                        required
                        className='form-control'
                        value={exercise.description}
                        onChange={onChangeDescription} />
                </div>
                <div className='form-group mt-3'>
                    <label>Duration (in minutes): </label>
                    <input type="text"
                        required
                        className='form-control'
                        value={exercise.duration}
                        onChange={onChangeDuration} />
                </div>
                <div className='form-group mt-3'>
                    <label>Date: </label>
                    <div>
                        <DatePicker 
                            selected={exercise.date}
                            onChange={onChangeDate}
                            />
                    </div>
                </div>

                <div className="form-group mt-3">
                    <input type="submit" value="Edit Exercise Log" className="btn btn-primary mt-3"/>
                </div>

            </form>
        </div>
    )
}

export default EditExercise;