import { Button, Accordion, Form } from 'react-bootstrap';
import axios from 'axios';

const EditPost = (props) => {
    const titleStyle = props.titleStyle;
    const titleInfoStyle = props.titleInfoStyle;
    const postData = props.postData;
    const formattedDate = props.formattedDate;
    const editHandler = props.editHandler;
    const title = props.title;
    const setTitle = props.setTitle;
    const content = props.content;
    const setContent = props.setContent;

    const submitHandler = (e) => {
        e.preventDefault();
        const postId = postData._id;
        axios.put(`${process.env.REACT_APP_API_URL}/posts`, { data: { _id: postId, title: title, content: content } }).then(() => window.location = '/').catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
            <Accordion.Header>
                <div style={{ width: "100%" }}>
                    <span style={titleStyle}>{postData.title}</span><br /><span style={titleInfoStyle}>Created {formattedDate} by {postData.user}</span>
                </div>
            </Accordion.Header>
            <Accordion.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Creative title" value={title} onChange={e => setTitle(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Content</Form.Label>
                        <Form.Control as="textarea" rows={5} value={content} onChange={e => setContent(e.target.value)} />
                    </Form.Group>
                    <Button className="me-3" variant="primary" type="button" onClick={submitHandler}>
                        Submit
                    </Button>
                    <Button className="btn-sm" variant="outline-danger" type="button" onClick={editHandler}>
                        Cancel
                    </Button>
                </Form>
            </Accordion.Body>
        </div>
    )
}

export default EditPost;