import axios from "axios";
import { render } from 'react-dom';
import { useState } from 'react'
import { Button, Alert } from 'react-bootstrap'
import FlashMessage from 'react-flash-message'

import Register from './Register'


const LoginRegister = (props) => {
    const [showForm, setShowForm] = useState(false)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const toggleForm = () => {
        setShowForm(!showForm);
    }

    const setUser = props.setUser;
    const loginHandler = (e) => {
        e.preventDefault();
        const user = { username, password }
        axios.post(`${process.env.REACT_APP_API_URL}/users/login`, user).then(response => {
            setUser(user.username);
        }).catch(err => {
            if (err.response.status === 401) {
                const Message = () => (
                    <FlashMessage duration={3000} persistOnHover={true}>
                        <Alert variant="danger">Incorrect credentials!</Alert>
                    </FlashMessage>
                );
                render(<Message />, document.getElementById("bad-login-alert"));
            }
            console.log(err);
        })
        setUsername('');
        setPassword('');
    }

    const alertStyle = {
        padding: "10px",
        textAlign: "center"
    }

    return (
        <div id="login-register-container" style={{ marginTop: "10px" }}>
            {!showForm &&
                <form>
                    <input style={{ marginLeft: "5px" }} autoComplete="current-username" type="text" placeholder="Username" value={username} onChange={(e) => (setUsername(e.target.value))} />
                    <input style={{ marginLeft: "5px" }} autoComplete="current-password" type="password" placeholder="Password" value={password} onChange={(e) => (setPassword(e.target.value))} />
                    <Button variant="secondary" size="sm" style={{ marginLeft: "5px", marginTop: "-4px", display: "inline" }} onClick={loginHandler}>Login</Button>
                    <Button variant="secondary" size="sm" style={{ marginLeft: "5px", marginTop: "-4px", display: "inline" }} onClick={toggleForm}>Register</Button>
                </form>
            }
            {showForm && <Register setUser={setUser} toggleForm={toggleForm}/>}
            <div id="bad-login-alert" style={alertStyle}></div>
        </div>
    )
}

export default LoginRegister;