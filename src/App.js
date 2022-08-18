
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'jquery/dist/jquery.min.js';
import {
  Routes,
  Route,
  useNavigate,
  Navigate
} from "react-router-dom";
import { Login } from './Components/Login/Login';
import { Register } from './Components/Register/Register';
import { Home } from './Components/Home/Home';
import { Navbar } from './Components/Navbar/Navbar';
import Movies from './Components/Movies/Movies';
import TVShow from './Components/TVShow/TVShow';
import { Details } from './Components/Details/Details';
import jwtDecode from 'jwt-decode';
import React,{ useEffect , useState} from 'react'



export function App() {
  const [currentUser, setCurrentUser] = useState(null);
  let navigate=useNavigate();
  
  function TestingRoute(props){
    if(localStorage.getItem('token')==null){
      return <Navigate to="/signup"/>
    }
    else{
      return props.children;
    }
    
  }


  function tokenDecode(){
    let tkn = jwtDecode(localStorage.getItem('token'));
    setCurrentUser(tkn);
    console.log(tkn);
  }
  function clearUser(){
    localStorage.removeItem('token');
    setCurrentUser(null);
    navigate('/login');
    console.log(tkn);
  }
  useEffect(()=>{
  if(localStorage.getItem('token')!=null){
    tokenDecode()
  }
   
 
   },[]);
  return <>
    <Navbar crrUser={currentUser} clrUser={clearUser}/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='home' element={<Home/>}/>
      <Route path='movie' element={<TestingRoute><Movies/></TestingRoute>}/>
      <Route path='tvshow' element={<TestingRoute><TVShow/></TestingRoute>}/>
      <Route path='details' element={<TestingRoute><Details/></TestingRoute>}>
      <Route path=':id' element={<TestingRoute><Details/></TestingRoute>}/>
      </Route>
      <Route path='register' element={ <Register/>}/>
      <Route path='login' element={<Login tokenDecode={tokenDecode}/>}/>
      <Route path='*' element={
        <div className='vh-100 d-flex justify-content-center align-items-center '>
          <h1>4 0 4</h1>
        </div>
      }/>
    </Routes>
    
   
    
  </>
}


