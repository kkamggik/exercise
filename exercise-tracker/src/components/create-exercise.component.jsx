import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



export default function CreateExercise(props) {
    const navigate = useNavigate();
    const [username, setUsername] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [duration, setDuration] = React.useState(0);
    const [date, setDate] = React.useState(new Date());
    const [users, setUsers] = React.useState([]);

    useEffect(() => {
        setUsers(['test user', 'kkamggik']);
        setUsername('kkamggik');
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
        console.log(exercise);
        navigate("/");
    }

    return (
        <div>
            <h3>Create New Exercise Log</h3>
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
                    <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )

}