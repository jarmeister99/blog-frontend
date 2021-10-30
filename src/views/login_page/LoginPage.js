import { Container, Row, Col } from 'react-bootstrap'
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'

const LoginPage = () => {
    const [registrationFlag, setRegistrationFlag] = useState(false);

    const toggleRegistrationFlag = () => {
        setRegistrationFlag(!registrationFlag);
    }

    // TODO: Make the stay signed in checkbox work
    return (
        <Container>
            <Row>
                <Col md={{ offset: 3, span: 6 }}>
                    { !registrationFlag && <LoginForm toggleRegistrationFlag={toggleRegistrationFlag}/> }
                    { registrationFlag && <RegisterForm toggleRegistrationFlag={toggleRegistrationFlag}/> }
                </Col>
            </Row>
        </Container>
    )
}

export default LoginPage;