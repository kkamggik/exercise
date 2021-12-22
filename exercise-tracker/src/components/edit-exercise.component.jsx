import React, { useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";



export default function EditExercise(props) {
    const navigate = useNavigate();
    const {id} = useParams();
    const [username, setUsername] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [duration, setDuration] = React.useState(0);
    const [date, setDate] = React.useState(new Date());
    const [users, setUsers] = React.useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/exercises/'+id)
        .then((res) => {
            setUsername(res.data.username);
            setDescription(res.data.description);
            setDuration(res.data.duration);
            setDate(new Date(res.data.date));
        })
        .catch((err) => console.log(err));

        axios.get('http://localhost:5000/users/')
        .then((res) => {
            if (res.data.length > 1) {
                setUsers(res.data.map(user => user.username))
            }
        })
    }, []);


    const handleUsername = (e) => {
        setUsername(e.target.value);
    }
    const handleDescription = (e) => {
        setDescription(e.target.value);
    }
    const handleDuration = (e) => {
        setDuration(e.target.value);
    }
    const handleDate = (date) => {
        setDate(date);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const exercise = {
            username: username,
            description: description,
            duration: duration,
            date: date
        }
        axios.post('http://localhost:5000/exercises/update/'+id, exercise)
        .then((res) => console.log(exercise))

        navigate("/");
    }

    return (
        <div>
            <h3>Update Exercise Log</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <select
                        required
                        className="form-control"
                        value={username}
                        onChange={handleUsername}>
                        {
                            users.map( (user) => {
                                return <option
                                    key={user}
                                    value={user}> {user}
                                </option>;
                            })
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label>Description: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={description}
                        onChange={handleDescription}
                    />
                </div>
                <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input
                        type="text"
                        className="form-control"
                        value={duration}
                        onChange={handleDuration}
                    />
                </div>
                <div className="form-group">
                    <label>Date: </label>
                    <div>
                        <DatePicker
                            selected={date}
                            onChange={handleDate}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <input type="submit" value="Update Exercise Log" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )

}