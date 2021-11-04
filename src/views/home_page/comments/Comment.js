import { Row, Button } from 'react-bootstrap'
import dateformat from 'dateformat'

import axios from 'axios'

const Comment = (props) => {
    const comments = props.comments;
    const setComments = props.setComments;
    const commentId = props.commentId;
    const content = props.content;
    const user = props.user;
    const createdOn = props.createdOn
    const sessionUser = props.sessionUser;
    const formattedDate = dateformat(createdOn, "mmmm dS, yyyy")

    const commentInfoStyle = {
        fontSize: "12px"
    }
    const deleteButtonStyle = { "fontSize": "0.5rem", "padding": "0.2rem 0.4rem", "fontWeight": "bold" }

    const deleteHandler = (e) => {
        e.preventDefault();
        axios.delete(`${process.env.REACT_APP_API_URL}/comments`, { data: { _id: commentId } }).then((response) => {
          if (response.data.deletedCount > 0) {
            const newComments = comments.filter(c => c._id !== commentId);
            setComments(newComments);
          }
        }).catch(error => {
          console.log(error);
        })
      }

    return (
        <div className="mb-3">
            <Row><span>{(sessionUser === user) && <Button onClick={deleteHandler} style={deleteButtonStyle} className='btn-sm me-3' variant='outline-danger'>X</Button>}{content}</span></Row>
            <Row><span style={commentInfoStyle}>{user} - {formattedDate}</span></Row>

        </div>
    )
}

export default Comment;