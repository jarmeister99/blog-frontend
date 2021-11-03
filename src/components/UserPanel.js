import axios from "axios";
import { Button } from 'react-bootstrap'

const UserPanel = (props) => {
    const setUser = props.setUser;
    const user = props.user;
    const logoutHandler = (e) => {
        e.preventDefault();
        axios.get(`${process.env.REACT_APP_API_URL}/users/logout`).then(response => {
            setUser('');
        }).catch(err => {
            console.log(err);
        })  
    }
    if (user){
        return (
            <div style={{ marginTop: "10px" }}>
                {user}
                <Button variant="secondary" size="sm" style={{ marginLeft: "5px" }} onClick={logoutHandler}>Logout</Button>
            </div>
        )
    }
    else{
        return (
            <div>
            </div>
        )
    }
}

export default UserPanel;