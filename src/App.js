import React, { useEffect, useState } from 'react';
import About from "./About";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import { useAsyncValue, useNavigate, useParams } from 'react-router-dom';
import Mis from "./Mis"; 
import Nav from "./Nav";
import Newpost from "./Newpost";
import Postpage from "./Postpage";
import api from "./api/Post"
import { Link,Routes,Route } from 'react-router-dom';
import Pos from './Pos';
import Postlayout from './Postlayout';
import Edit from "./Edit"
function App() {
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState([
]
  );
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [searchres,setsearchres]=useState([])
  const [editTitle,setEditTitle]=useState('')
  const [editBody,setEditBody]=useState('')
  const navigate=useNavigate();
  useEffect(()=>
  {
    const fetchPosts=async()=>
    {
      try{
      const response=await api.get('/posts');
      setPosts(response.data);
      }
   
catch (err) {
  if (err.response) {
    console.log(err.response.data);
    console.log(err.response.status);
    console.log(err.response.headers);
  } else {
    console.log(`Error : ${err.message}`);
  }
}


    }
    fetchPosts();
  },[])
 useEffect(()=>
 {
  const filtered=posts.filter((post)=>((post.body).toLowerCase()).includes(search.toLowerCase())||((post.title).toLowerCase()).includes(search.toLowerCase()));
  setsearchres(filtered.reverse());
 },[posts,search])
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = new Date().toLocaleString(); 
    const newPost = { id, title: postTitle, datetime, body: postBody };
    try{
    const response=await api.post('/posts',newPost)
    const allPosts = [...posts, response.data];
    setPosts(allPosts);
    setPostTitle('');
    setPostBody('');
    navigate('/')
    }catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error : ${err.message}`);
      }
    }
    
  }
  

  const handledelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`); 
      const del = posts.filter((post) => post.id !== id);
      setPosts(del);
      navigate('/');
    } catch (err) {
      console.log(`Error : ${err.message}`);
    }
  };
  const handleedit=async(id)=>
  {
    const datetime = new Date().toLocaleString(); 
    const upPost = { id, title: editTitle, datetime, body: editBody };
    try{
    const response=await api.put(`/posts/${id}`,upPost)
    setPosts(posts.map(post=>post.id===id?{...response.data}:post));
    setEditTitle('');
    setEditBody('');
    navigate('/')
    }catch (err) {
      console.log(`Error : ${err.message}`);
    }

  }
  

  return (
    <div className="App">
      <Header title={"SOCIMEDIA"} />
      <Nav search={search} setsearch={setSearch} />
      
<Routes>
  <Route path="/" element={<Home posts={searchres}/>}/>
  <Route path="post">
        <Route index element={<Newpost
        handleSubmit={handleSubmit}
        postTitle={postTitle}
        setPostTitle={setPostTitle}
        postBody={postBody}
        setPostBody={setPostBody}/>}/>       
        <Route path=":id" element={<Postpage posts={posts} handledelete={handledelete}/> } />
  </Route>
  <Route path="/edit/:id" element={<Edit
           posts={posts}
           handleedit={handleedit}
           editBody={editBody}
           setEditBody={setEditBody}
           editTitle={editTitle}
           setEditTitle={setEditTitle}/>}/>
  <Route path="/about" element={<About/>}/>
  <Route path="*" element={<Mis/>}/>
</Routes>
<Footer/>
    </div>
  );
}

export default App;