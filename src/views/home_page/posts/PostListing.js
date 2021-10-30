import Post from "./Post";

const PostListing = (props) => {
    const posts = props.posts;
    const setPosts = props.setPosts;
    const user = props.user;
    return (
      <div>
        {posts.map(p => <Post key={p._id} user={user} post={p} posts={posts} setPosts={setPosts}/>)}
      </div>
    )
}

export default PostListing;