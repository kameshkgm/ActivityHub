import React from 'react'
import {Link, Outlet} from 'react-router-dom'
const Postlayout = () => {
  return (
    <>    <Link to="/postpage/1">POST 1</Link>
    <br/>
    <Link to="/postpage/2">POST 2</Link>
    <br/>
    <Link to="/postpage/3">POST 3</Link>
    <br/>
    <Link to="/postpage/4">POST 4</Link><br/>
    <Link to="/postpage/newpost">NEWPOST</Link>
    <Outlet/>
    </>

  )
}

export default Postlayout