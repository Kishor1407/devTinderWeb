import { useState } from 'react'
import './index.css'
import Body from "./Body";
import Profile from "./Profile"
import Login from "./Login"


import { BrowserRouter, Routes , Route } from 'react-router-dom';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>

    <BrowserRouter basename="/">
    <Routes>
      <Route path="/" element={<Body/>}>
      <Route path="/login" element ={<Login/>}/>
      <Route path="/profile" element ={<Profile/>}/>



      </Route>


    </Routes>
    </BrowserRouter>


    </>
  )
}

export default App
