import { useState } from 'react'
import './index.css'
import Body from "./components/Body";
import Profile from "./components/Profile"
import Login from "./components/Login"
import {Provider} from "react-redux"
import { BrowserRouter, Routes , Route } from 'react-router-dom';
import appStore from './utils/appStore';
import Feed from "./components/Feed";
function App() {
  const [count, setCount] = useState(0)

  return (
    <>


<Provider store={appStore}>
      <BrowserRouter basename="/">
    <Routes>
      <Route path="/" element={<Body/>}>
      <Route path="/" element={<Feed/>} />
      <Route path="/login" element ={<Login/>}/>
      <Route path="/profile" element ={<Profile/>}/>



      </Route>


    </Routes>
    </BrowserRouter>
</Provider>


    </>
  )
}

export default App
