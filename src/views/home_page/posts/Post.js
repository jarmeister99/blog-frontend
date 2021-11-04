import axios from "axios";
import dateformat from 'dateformat'
import { Button, Accordion } from 'react-bootstrap';
import { useState } from 'react';

import EditPost from './EditPost'
import DisplayPost from './DisplayPost'

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

  return (
    <div style={containerStyle}>
      <Accordion>
        <Accordion.Item eventKey="0">
          {!editFlag &&
            <DisplayPost
              titleStyle={titleStyle}
              contentStyle={contentStyle}
              titleInfoStyle={titleInfoStyle}
              postData={postData}
              formattedDate={formattedDate}
              editHandler={editHandler}
              deleteHandler={deleteHandler}
              user={user}
            />
          }
          {editFlag &&
            <EditPost
              titleStyle={titleStyle}
              postData={postData}
              titleInfoStyle={titleInfoStyle}
              formattedDate={formattedDate}
              editHandler={editHandler}
              title={title}
              setTitle={setTitle}
              content={content}
              setContent={setContent}
            />
          }
        </Accordion.Item>
      </Accordion>
    </div>
  )
}

export default Post;