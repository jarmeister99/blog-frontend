import axios from "axios";
import dateformat from 'dateformat'
import { Button, Accordion, Form } from 'react-bootstrap';
import { useState } from 'react';

const Post = (props) => {
  const postData = props.post;
  const posts = props.posts;
  const setPosts = props.setPosts;
  const user = props.user;

  const [editFlag, setEditFlag] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('')

  const formattedDate = dateformat(postData.createdOn, "mmmm dS, yyyy")
  const deleteHandler = (e) => {
    e.preventDefault();
    const postId = postData._id;
    axios.delete(`${process.env.REACT_APP_API_URL}/posts`, { data: { _id: postId } }).then((response) => {
      if (response.data.deletedCount > 0) {
        const newPosts = posts.filter(post => post._id !== postId);
        setPosts(newPosts);
      }
    }).catch(error => {
      console.log(error);
    })
  }
  const editHandler = (e) => {
    e.preventDefault();
    setTitle(postData.title);
    setContent(postData.content);
    setEditFlag(!editFlag);
  }
  const containerStyle = {
    marginBottom: "10px",
    paddingLeft: "10px",
    paddingBottom: "5px",
    paddingRight: "10px"
  }
  const titleStyle = {
    fontSize: "16px",
    fontWeight: "bold"
  }
  const titleInfoStyle = {
    fontSize: "12px",
    fontStyle: "italic"
  }
  const contentStyle = {
    marginBottom: "30px",
    whiteSpace: "pre-line",
    overflowWrap: "break-word"
  }

  if (!editFlag) {
    return (
      <div style={containerStyle}>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <div style={{ width: "100%" }}>
                <span style={titleStyle}>{postData.title}</span><br /><span style={titleInfoStyle}>Created {formattedDate} by {postData.user}</span>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <p style={contentStyle}>{postData.content}</p>
              {user === postData.user &&
                <span>
                  <Button size="sm" variant="outline-danger" style={{ marginRight: "5px", marginBottom: "5px" }} onClick={deleteHandler}>Delete</Button>
                  <Button size="sm" variant="outline-dark" style={{ marginRight: "5px", marginBottom: "5px" }} onClick={editHandler}>Edit</Button>
                </span>
              }
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    )
  }
  else {
    return (
      <div style={containerStyle}>
        <Accordion>
          <Accordion.Item eventKey="0">
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
                <Button className="me-3" variant="primary" type="button">
                  Submit
                </Button>
                <Button className="btn-sm" variant="outline-danger" type="button" onClick={editHandler}>
                  Cancel
                </Button>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    )
  }
}

export default Post;