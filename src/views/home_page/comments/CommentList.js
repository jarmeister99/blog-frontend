import { useEffect } from 'react'
import axios from 'axios'

import Comment from './Comment'

const CommentList = (props) => {
    const comments = props.comments;
    const setComments = props.setComments;
    const postId = props.postId;
    const sessionUser = props.sessionUser;

    // display all posts from server
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/comments`, { params: { postId: postId } }).then(response => {
            setComments(response.data);
        }).catch(error => {
            console.log(error);
        })
    }, [])

    return (
        <div>
            {comments.map(c => <Comment key={c._id} content={c.content} user={c.user} createdOn={c.createdOn} sessionUser={sessionUser} commentId={c._id} comments={comments} setComments={setComments} />)}
        </div>
    )
}

export default CommentList;