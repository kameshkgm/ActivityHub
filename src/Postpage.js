import { useParams,Link } from "react-router-dom";
const Postpage=({posts,handledelete})=>
{
    const {id}=useParams();
    const post=posts.find(post=>(post.id).toString()===id);
    return(
    <main className="Postpage">
        <article className="post">
        {post&&
        <>
        <h2>{post.title}</h2>
        <p className="postDate">{post.datetime}</p>
        <p className="postBody">{post.body}</p>
    <Link to={`/edit/${post.id}`}>        <button className="editButton">Edit post</button></Link>

        <button className="hello" onClick={()=>handledelete(post.id)}>
            Delete post
        </button>
        </>}
        {!post&&
        <>
        <h2>POST NOT FOUND</h2>
        <p>
            <Link to="/">Go to Home</Link>
        </p>
        </>
        }

        </article>
    </main>)
}
export default Postpage
