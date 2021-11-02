import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useState } from 'react'

const CreatePage = (props) => {
    const user = props.user;
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const createPost = () => {
        
    }
    return (
        <Container>
            <Row>
                <Col md={{ offset: 3, span: 6 }} sm={{ span: 12 }}>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Creative title" value={title} onChange={e => setTitle(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Content</Form.Label>
                            <Form.Control as="textarea" rows={5} value={content} onChange={e => setContent(e.target.value)}/>
                        </Form.Group>
                        <Button variant="primary" type="button" onClick={createPost}>
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default CreatePage;