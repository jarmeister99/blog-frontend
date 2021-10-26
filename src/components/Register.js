import axios from "axios";
import { render } from 'react-dom';
import { useState } from "react";
import { Button, Alert } from 'react-bootstrap';
import FlashMessage from 'react-flash-message'


const Register = (props) => {
    const setUser = props.setUser;
    const toggleForm = props.toggleForm;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');


    const registerHandler = (e) => {
        e.preventDefault();
        const user = { username, password }
        if (password !== password2) {
            const Message = () => (
                <FlashMessage duration={3000} persistOnHover={true}>
                    <Alert variant="danger">Passwords did not match</Alert>
                </FlashMessage>
            );
            render(<Message />, document.getElementById("bad-register-alert"));
            setPassword2('');
            setPassword('');
        }
        else {
            axios.post(`${process.env.REACT_APP_API_URL}/users/register`, user)
                .then(() => {
                    return axios.post(`${process.env.API_URL}/users/login`, user)
                }).then(() => {
                    setUser(user.username);
                }).catch(err => {
                    // TODO: provide more descriptive error messages
                    const Message = () => (
                        <FlashMessage duration={3000} persistOnHover={true}>
                            <Alert variant="danger">Username in use - try another</Alert>
                        </FlashMessage>
                    );
                    render(<Message />, document.getElementById("bad-register-alert"));
                    setUsername('');
                    setPassword('');
                    setPassword2('');
                    console.log(err);
                })
        }
    }
    const alertStyle = {
        padding: "10px",
        textAlign: "center"
    }
    return (
        <div style={{ marginTop: "5px", marginBottom: "5px" }}>
            <form style={{ marginTop: "5px" }} onSubmit={registerHandler}>
                <input style={{ marginLeft: "5px" }} autoComplete="new-username" type="text" placeholder="Username" value={username} onChange={(e) => (setUsername(e.target.value))} />
                <input style={{ marginLeft: "5px" }} autoComplete="new-password" type="password" placeholder="Password" value={password} onChange={(e) => (setPassword(e.target.value))} />
                <input style={{ marginLeft: "5px" }} autoComplete="new-password" type="password" placeholder="Repeat password" value={password2} onChange={(e) => (setPassword2(e.target.value))} />
                <Button as="input" type="submit" value="Create" variant="secondary" size="sm" style={{ marginLeft: "5px", marginTop: "-3px" }}></Button>
                <Button variant="secondary" size="sm" style={{ marginLeft: "5px", marginTop: "-3px", display: "inline" }} onClick={toggleForm}>Cancel</Button>
            </form>
            <div id="bad-register-alert" style={alertStyle}></div>
        </div>
    )
}

export default Register;