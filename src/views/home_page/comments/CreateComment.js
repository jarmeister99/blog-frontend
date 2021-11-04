import { Form, Button, Row, Col } from 'react-bootstrap'
import { useState } from 'react'
import axios from 'axios'

const CreateComment = (props) => {
    const postData = props.postData;
    const comments = props.comments;
    const setComments = props.setComments;

    const [content, setContent] = useState('');

    const handleSubmit = () => {
        const comment = { content: content, postId: postData._id };
        console.log(comment);
        axios.post(`${process.env.REACT_APP_API_URL}/comments`, comment).then(response => {
            const newComment = response.data;
            setComments([...comments, newComment]);
        }).catch(error => {
            console.log(error);
        })
        setContent('');
    }

    return (
        <div>
            <Form>
                <Form.Group className="mb-3">
                    <Row>
                        <Col>
                            <Form.Control type="text" placeholder="Insightful comment..." value={content} onChange={e => setContent(e.target.value)} />
                        </Col>
                        <Col xs="auto">
                            <Button variant="outline-primary" onClick={handleSubmit}>Comment</Button>
                        </Col>
                    </Row>
                </Form.Group>
            </Form>
        </div>
    )
}

export default CreateComment;