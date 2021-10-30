import { Form, Button, Alert } from 'react-bootstrap'
import { useState } from 'react'
import axios from "axios";
import { render } from 'react-dom';
import FlashMessage from 'react-flash-message'
import 'bootstrap/dist/css/bootstrap.min.css'

const RegisterForm = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const toggleRegistrationFlag = props.toggleRegistrationFlag;

    const handleSubmit = (e) => {
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
                    return axios.post(`${process.env.REACT_APP_API_URL}/users/login`, user)
                }).then(() => {
                    window.location = '/';
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

    return (
        <div>
            <div id="bad-register-alert" className="mb-3"></div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control autoComplete="new-username" type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control autoComplete="new-password" type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Repeat password</Form.Label>
                    <Form.Control autoComplete="new-password" type="password" placeholder="Enter password" value={password2} onChange={e => setPassword2(e.target.value)} />
                </Form.Group>

                <Button className="me-2" variant="primary" type="submit">
                    Create account
                </Button>
                <Button className="btn-sm" variant="outline-primary" type="button" onClick={toggleRegistrationFlag}>
                    Cancel
                </Button>
            </Form>
        </div>
    )
}

export default RegisterForm;