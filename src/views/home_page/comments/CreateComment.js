import { Form, Button, Row, Col } from 'react-bootstrap'
import { useState } from 'react'

const CreateComment = (props) => {
    const [comment, setComment] = useState('');
    return (
        <div>
            <Form>
                <Form.Group className="mb-3">
                    <Row>
                        <Col>
                            <Form.Control type="text" placeholder="Insightful comment..." value={comment} onChange={e => setComment(e.target.value)} />
                        </Col>
                        <Col xs="auto">
                            <Button variant="outline-primary">Comment</Button>
                        </Col>
                    </Row>
                </Form.Group>
            </Form>
        </div>
    )
}

export default CreateComment;