import { Button, Accordion } from 'react-bootstrap';
import { useState } from 'react'

import CommentList from '../comments/CommentList'
import CreateComment from '../comments/CreateComment'

const PostContent = (props) => {
    const postData = props.postData;
    const editHandler = props.editHandler;
    const deleteHandler = props.deleteHandler;
    const user = props.user;

    const [comments, setComments] = useState([])

    const contentStyle = {
        marginBottom: "30px",
        whiteSpace: "pre-line",
        overflowWrap: "break-word"
      }

    return (
        <div>
            <p style={contentStyle}>{postData.content}</p>
            {user === postData.user &&
                <span>
                    <Button size="sm" variant="outline-danger" style={{ marginRight: "5px", marginBottom: "5px" }} onClick={deleteHandler}>Delete</Button>
                    <Button size="sm" variant="outline-dark" style={{ marginRight: "5px", marginBottom: "5px" }} onClick={editHandler}>Edit</Button>
                </span>
            }
            <div className="mt-3">
                {user && <CreateComment postData={postData} comments={comments} setComments={setComments} />}
                <CommentList comments={comments} setComments={setComments} postId={postData._id} sessionUser={user} />
            </div>
        </div>
    )
}

export default PostContent;