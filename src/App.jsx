import { useState } from 'react'
import './index.css'
import Body from "./components/Body";
import Profile from "./components/Profile"
import Login from "./components/Login"
import {Provider} from "react-redux"
import { BrowserRouter, Routes , Route } from 'react-router-dom';
import appStore from './utils/appStore';
import Feed from "./components/Feed";
import Connections from './components/Connections';
import Requests from './components/Requests';
import Chat from './components/Chat';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>


<Provider store={appStore}>
      <BrowserRouter basename="/">
    <Routes>
      <Route path="/" element={<Body/>}>
      <Route index  element={<Feed/>} />
      <Route path="/login" element ={<Login/>}/>
      <Route path="/connections" element ={<Connections/>}/>
      <Route path="/requests" element ={<Requests/>}/>
      <Route path="/chat/:targetUserId" element ={<Chat/>}/>

      <Route path="/profile" element ={<Profile/>}/>
      </Route>


    </Routes>
    </BrowserRouter>
</Provider>


    </>
  )
}

export default App
