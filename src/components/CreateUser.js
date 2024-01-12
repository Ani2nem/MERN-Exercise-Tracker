import React, {useState} from 'react';
import axios from 'axios';

const CreateUser = () => {
    const [user, setUser] = useState(
        {
            username: '',
        }
    )

    const onChangeUserName = (e) => {
        setUser((prevUser) => ({
            ...prevUser, 
            username: e.target.value,
          }));
    }

    const onSubmit= (e) => {
        e.preventDefault();
        const userData = {
            username: user.username,
        }
       console.log(userData);

       axios.post('http://localhost:5001/users/add', userData)
       .then(res => console.log(res.data));

       setUser((prevUser) =>
        ({
             username: "",
        }))
    }


    return (
        <div>
           <h3>Create New User</h3>
           <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>UserName: </label>
                    <input type="text"
                    required
                    className="form-control"
                    value={user.username}
                    onChange={onChangeUserName}
                    />
                </div> 
                <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary mt-3"/>
                </div>
           </form>
        </div>
    )
}

export default CreateUser;