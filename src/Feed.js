import Pos from "./Pos";
const Feed=({posts})=>
{
    return (
        <>
        {
            posts.map(post=>(
                <Pos key={post.id} post={post}/>
            ))
        }
        </>
    )
}
export default Feed