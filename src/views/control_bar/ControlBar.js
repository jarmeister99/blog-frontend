import { Nav, Navbar, Container } from 'react-bootstrap'
import axios from 'axios' 

const ControlBar = (props) => {
    const user = props.user;
    const setUser = props.setUser;

    const logoutHandler = (e) => {
        e.preventDefault();
        axios.get(`${process.env.REACT_APP_API_URL}/users/logout`).then(response => {
            setUser('');
            window.location = '/';
        }).catch(err => {
            console.log(err);
        })  
    }

    if (user) {
        return (
            <div>
                <Navbar bg="secondary" variant="dark" className="mb-3">
                    <Container>
                        <Navbar.Brand>{user}</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/create">Post</Nav.Link>
                            <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </div>
        )
    }
    else {
        return (
            <div>
                <Navbar bg="secondary" variant="dark" className="mb-3">
                    <Container>
                        <Navbar.Brand href="/">Blog</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link href="/login">Login / Signup</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </div>
        )
    }
}

export default ControlBar;
