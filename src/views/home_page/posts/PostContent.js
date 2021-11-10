import { Button } from 'react-bootstrap';

const PostContent = (props) => {
    const postData = props.postData;
    const editHandler = props.editHandler;
    const deleteHandler = props.deleteHandler;
    const user = props.user;

    const contentStyle = {
        marginBottom: "30px",
        marginTop: "1%",
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
        </div>
    )
}

export default PostContent;