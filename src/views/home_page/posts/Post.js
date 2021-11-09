import axios from "axios";
import dateformat from 'dateformat'
import { Accordion } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react';

import EditPost from './EditPost'
import DisplayPost from './DisplayPost'

const Post = (props) => {
  const postData = props.post;
  const formattedDate = dateformat(postData.createdOn, "mmmm dS, yyyy")

  const expandControl = useRef();

  useEffect(() => {
    expandControl.current.addEventListener('mousedown', function (event) {
      if (event.detail > 1) {
        console.log(event)
        event.preventDefault();
      }
    }, false);
  }, [])

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

  const toggleExpanded = () => {
    setExpanded(!expanded);
  }
  return (
    <div style={containerStyle}>
      <div style={expandStyle} onClick={toggleExpanded} ref={expandControl}>
        <span style={titleStyle}>{postData.title}</span>
        <span style={titleInfoStyle}>Submitted on {formattedDate} by {postData.user}</span>
      </div>
      {expanded &&
        <div className="mt-3">
          <span style={contentStyle}>{postData.content}</span>
        </div>
      }
      <hr></hr>
    </div>
  )
}

export default Post;