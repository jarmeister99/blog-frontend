import axios from "axios";
import { useState } from 'react'
import { Button } from 'react-bootstrap'

const CreatePost = (props) => {
  const posts = props.posts;
  const setPosts = props.setPosts;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const post = {
      title, content
    }
    axios.post(`${process.env.REACT_APP_API_URL}/posts`, post).then(response => {
      setPosts([...posts, response.data]);
      setTitle('');
      setContent('');
    }).catch(error => {
      console.log(error);
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label style={{ display: "block" }} ><b>Title</b></label><input type="text" value={title} onChange={(e) => (setTitle(e.target.value))} />
        <label style={{ display: "block" }} ><b>Content</b></label><input type="text" value={content} onChange={(e) => (setContent(e.target.value))} />
        <Button as="input" type="submit" variant="outline-dark" style={{ display: "block", marginTop: "10px" }}></Button>
      </form>
    </div>
  )
}

export default CreatePost;