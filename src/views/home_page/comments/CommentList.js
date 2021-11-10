import { useEffect, useState } from 'react'
import axios from 'axios'

import Comment from './Comment'

const CommentList = (props) => {
    const postId = props.postId;
    const user = props.user;

    const [comments, setComments] = useState([]);

    // display all comments from server
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/comments`, { params: { postId: postId } }).then(response => {
            setComments(response.data);
        }).catch(error => {
            console.log(error);
        })
    }, [postId])

    return (
        <div>
            {comments.map(c => <Comment key={c._id} content={c.content} user={c.user} createdOn={c.createdOn} sessionUser={user} commentId={c._id} comments={comments} setComments={setComments} />)}
        </div>
    )
}

export default CommentList;