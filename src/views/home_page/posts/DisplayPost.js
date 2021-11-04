import { Button, Accordion } from 'react-bootstrap';
import { useState } from 'react'

import CommentList from '../comments/CommentList'
import CreateComment from '../comments/CreateComment'

const DisplayPost = (props) => {
    const titleStyle = props.titleStyle;
    const titleInfoStyle = props.titleInfoStyle;
    const contentStyle = props.contentStyle;
    const postData = props.postData;
    const formattedDate = props.formattedDate;
    const editHandler = props.editHandler;
    const deleteHandler = props.deleteHandler;
    const user = props.user;

    const [comments, setComments] = useState([])


    return (
        <div>
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
                <div className="mt-3">
                    {user && <CreateComment postData={postData} comments={comments} setComments={setComments}/>}
                    <CommentList comments={comments} setComments={setComments} postId={postData._id} sessionUser={user}/>
                </div>

            </Accordion.Body>
        </div>
    )
}

export default DisplayPost;