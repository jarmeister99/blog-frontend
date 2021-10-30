import { Form, Button, Alert } from 'react-bootstrap'
import { useState } from 'react'
import { render } from 'react-dom'
import axios from "axios";
import FlashMessage from 'react-flash-message'

import 'bootstrap/dist/css/bootstrap.min.css'

const LoginForm = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const toggleRegistrationFlag = props.toggleRegistrationFlag;

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = { username, password }
        axios.post(`${process.env.REACT_APP_API_URL}/users/login`, user).then(() => {
            window.location = '/';
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

    // TODO: Make the stay signed in checkbox work
    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Stay signed in" />
                </Form.Group>
                <Button className="me-2" variant="primary" type="submit">
                    Login
                </Button>
                <Button className="btn-sm" variant="outline-primary" type="button" onClick={toggleRegistrationFlag}>
                    Register
                </Button>
            </Form>
        </div>
    )
}

export default LoginForm;