import axios from "axios";
import dateformat from 'dateformat'
import { Button, Accordion } from 'react-bootstrap';

const Post = (props) => {
  const postData = props.post;
  const posts = props.posts;
  const setPosts = props.setPosts;
  const user = props.user;
  const formattedDate = dateformat(postData.createdOn, "mmmm dS, yyyy")
  const deleteHandler = () => {
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

  return (
    <div style={containerStyle}>

      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <div style={{ width: "100%" }}>
              <span style={titleStyle}>{postData.title}</span><br/><span style={titleInfoStyle}>Created {formattedDate} by {postData.user}</span>

            </div>
          </Accordion.Header>
          <Accordion.Body>
            <p style={contentStyle}>{postData.content}</p>
            {user === postData.user &&
              <span><Button size="sm" variant="outline-danger" style={{ marginRight: "5px", marginBottom: "5px" }} onClick={deleteHandler}>Delete</Button></span>
            }
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  )
}

export default Post;