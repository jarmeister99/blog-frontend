import { useState, useEffect, useRef } from 'react';

import PostHeader from './PostHeader'
import PostContent from './PostContent'
import CommentList from "../comments/CommentList";

import './styles/PostExpand.css';

const Post = (props) => {
  const postData = props.post;
  const user = props.user;

  const [expanded, setExpanded] = useState(false)

  const expandControl = useRef();
  const expandBody = useRef();

  useEffect(() => {
    expandControl.current.addEventListener('mousedown', function (event) {
      if (event.detail > 1) {
        event.preventDefault();
      }
    }, false);
    expandBody.current.classList.add('closed');
  }, [])

  const toggleExpanded = () => {
    if (expanded){
      expandBody.current.classList.add('closed');
      expandBody.current.classList.remove('expanded');
    }
    else{
      expandBody.current.classList.add('expanded');
      expandBody.current.classList.remove('closed');
    }
    setExpanded(!expanded);
  };

  const containerStyle = {
    paddingLeft: "10px",
    paddingBottom: "5px",
    paddingRight: "10px",
  }
  return (
    <div style={containerStyle} onClick={toggleExpanded}>
      <div ref={expandControl}>
        <PostHeader
          postData={postData}
        />
      </div>
      <div ref={expandBody} onClick={e => e.stopPropagation()}>
        <PostContent
          postData={postData}
          user={user}
        />
        <CommentList
          postId={postData._id}
          user={user}
        />
      </div>
      <hr></hr>
    </div>
  )
}

export default Post;