import axios from 'axios'
import { Container, Row, Col } from 'react-bootstrap'

import PostListing from './posts/PostListing'

axios.defaults.withCredentials = true;

function HomePage(props) {
  const user = props.user;
  const posts = props.posts;
  const setPosts = props.setPosts;

  const postListingStyle = {
    paddingLeft: "4%",
    paddingRight: "4%"
  }

  return (
    // <div style={postListingStyle}>
    <Container>
      <Row>
        <Col md={{offset: 1, span: 10}} sm={{span: 12}}>
          <PostListing user={user} posts={posts} setPosts={setPosts}></PostListing>
        </Col>
      </Row>
    </Container>
    // </div>
  );
}

export default HomePage;
