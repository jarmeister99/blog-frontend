import axios from 'axios'

import PostListing from './posts/PostListing'

axios.defaults.withCredentials = true;

function HomePage(props) {
  const user = props.user;
  const posts = props.posts;
  const setPosts = props.setPosts;

  return (
    <div>
      <PostListing user={user} posts={posts} setPosts={setPosts}></PostListing>
    </div>
  );
}

export default HomePage;
