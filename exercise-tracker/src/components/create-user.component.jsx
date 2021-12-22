import React from "react";
import axios from 'axios';
export default function CreateUser(props) {
    const [username, setUsername] = React.useState('');
    const handleUsername = (e) => {
        setUsername(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            username: username,
        }
        // send user data to the backend
        axios.post('http://localhost:5000/users/add', user)
        .then((res) => console.log(res.data));

        setUsername('');
        console.log(user);
    }
    return (
        <div>
            <h3>Create New User</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={username}
                        onChange={handleUsername}
                    />
                </div>
                <div className="form-group">
                    <input type="submit" value="Create User" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )

}