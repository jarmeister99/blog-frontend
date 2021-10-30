import { Nav, Navbar, Container } from 'react-bootstrap'
import { useEffect } from 'react'

const ControlBar = (props) => {
    const user = props.user;

    if (user) {
        return (
            <div>
                <div>
                    <Navbar bg="dark" variant="dark" className="mb-3">
                        <Container>
                            <Nav className="">
                                <Navbar.Brand href="/"></Navbar.Brand>
                                <Nav.Link href="/">Homepage</Nav.Link>
                            </Nav>
                        </Container>
                    </Navbar>
                </div>
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
