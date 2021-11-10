import axios from "axios";
import dateformat from 'dateformat'
import { Accordion } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react';

import EditPost from './EditPost'
import PostHeader from './PostHeader'
import PostContent from './PostContent'

const Post = (props) => {
  const postData = props.post;
  const user = props.user;

  useEffect(() => {
    expandControl.current.addEventListener('mousedown', function (event) {
      if (event.detail > 1) {
        console.log(event)
        event.preventDefault();
      }
    }, false);
  }, [])

  const expandControl = useRef();
  const [expanded, setExpanded] = useState('')

  const containerStyle = {
    paddingLeft: "10px",
    paddingBottom: "5px",
    paddingRight: "10px"
  }
  const expandStyle = {
    display: "flex",
    flexDirection: "column"
  }


  const toggleExpanded = () => {
    setExpanded(!expanded);
  }
  return (
    <div style={containerStyle}>
      <div style={expandStyle} onClick={toggleExpanded} ref={expandControl}>
        <PostHeader
          postData={postData}
        />
      </div>
      {expanded &&
        <div className="mt-3">
          <PostContent 
            postData={postData}
            user={user}
          />
        </div>
      }
      <hr></hr>
    </div>
  )
}

export default Post;