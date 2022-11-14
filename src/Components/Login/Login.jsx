import axios from 'axios';
import Joi from 'joi';
import React,{useState,useEffect} from 'react'
import {useNavigate} from "react-router-dom";

export  function Login({tokenDecode}) {
  let navigate = useNavigate();
  const [user, setUser] = useState({
      email:" ",
      password:" ",
      

  });
  const [loginflag, setLoginFlag] = useState(false);
  const [err, setErr] = useState([]);
  const [messag, setMessag] = useState('');
  function getUser(e){
      setErr([]);
      let inputValue=e.target.value;
      let newUser={...user};
      
      newUser[e.target.id]=inputValue;
      setUser(newUser);
  }
  function getError(key){
    for(let element of err)
     {
         if(element.context.key===key)
         {
             return element.message;
         }
     }
     return '';
 }
  async function submitForm(e){
      e.preventDefault();
      setLoginFlag(true);
      const schema = Joi.object({
         
          email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
          password:Joi.string().pattern(/^[a-z0-9]{4,8}/i).required(),
      })
      let res=schema.validate(user,{abortEarly:false});
      if( res.error ){
          setErr(res.error.details);
          setLoginFlag(false);
      }
      else{
         let {data}= await axios.post('https://route-egypt-api.herokuapp.com/signin',user);
         console.log(data);

         if(data.status === 401){
           setMessag(data.message);
         }
         else{
          localStorage.setItem("token",data.token);
          tokenDecode();
          navigate('/home');
          
         }
         setLoginFlag(false);
      }
      
  }
  useEffect(()=>{
    if(localStorage.getItem('token')!=null){
      navigate('/home');
    }
     
   
     },[]);



return <>


<div className="w-75 m-auto">
  {
      messag.length===0?'':<div className='alert alert-danger'>{messag}</div>
  }
 
  <form  onSubmit={submitForm}>

  
  <label htmlFor="email">email</label>
        <input onChange={getUser} type="email" className='form-control my-3' placeholder='email' id='email' />
        { getError("email").length===0?'':<div className='alert alert-danger '>{getError("email")}</div>}
        <label  htmlFor="password">password</label>
        <input onChange={getUser} type="password" className='form-control my-3' placeholder='password' id='password' />
        { getError("password").length===0?'':<div className='alert alert-danger '>{getError("password")}</div>}
      <button className='btn btn-outline-info '>
        {loginflag?<i className='fa-solid fa-spin fa-spinner'></i>:"Login"}
     </button>

      




  </form>


  



</div>





</>
}
