import axios from 'axios';
import Joi from 'joi';
import React,{useState} from 'react'
import {useNavigate} from "react-router-dom";
export  function Register() {
    let navigate = useNavigate();
    const [user, setUser] = useState({
        first_name:" ",
        last_name:" ",
        age:0,
        email:" ",
        password:" ",
        

    });
    const [registerflag, setRegisterflag] = useState(false);
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
        setRegisterflag(true);
        
        const schema = Joi.object({
            first_name:Joi.string().alphanum().min(3).max(10).required(),
            last_name:Joi.string().alphanum().min(3).max(10).required(),
            age:Joi.number().min(18).max(60).required(),
            email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
            password:Joi.string().pattern(/^[A-Z]+[a-z]+[0-9]+/i).required(),
        })
        let res=schema.validate(user,{abortEarly:false});
        
        if( res.error ){
            setErr(res.error.details);
            setRegisterflag(false);
        }
        else{
           let {data}= await axios.post('https://route-egypt-api.herokuapp.com/signup',user);
           

           if(data.errors){
             setMessag(data.message);
           }
           else{
            navigate('/login');
           
           }
           setRegisterflag(false);
        }
        
    }



  return <>
  
  
  <div className="w-75 m-auto">
    {
        messag.length===0?'':<div className='alert alert-danger'>{messag}</div>
    }
    {/* {
    err.map((element,idx)=><div key={idx} className='alert alert-danger'>
        {element.message}
    </div>)
    } */}
    <form  onSubmit={submitForm}>

        <label htmlFor="first_name">first_name</label>
        <input onChange={getUser} type="text" className='form-control my-3' placeholder='first_name' id='first_name' />
        { getError("first_name").length===0?'':<div className='alert alert-danger '>{getError("first_name")}</div>}
        <label htmlFor="last_name">last_name</label>
        <input onChange={getUser} type="text" className='form-control my-3'placeholder='last_name' id='last_name' />
        { getError("last_name").length===0?'':<div className='alert alert-danger '>{getError("last_name")}</div>}
        <label htmlFor="age">age</label>
        <input onChange={getUser} type="number" className='form-control my-3' placeholder='age' id='age' />
        { getError("age").length===0?'':<div className='alert alert-danger '>{getError("age")}</div>}
        <label htmlFor="email">email</label>
        <input onChange={getUser} type="email" className='form-control my-3' placeholder='email' id='email' />
        { getError("email").length===0?'':<div className='alert alert-danger '>{getError("email")}</div>}
        <label  htmlFor="password">password</label>
        <input onChange={getUser} type="password" className='form-control my-3' placeholder='password' id='password' />
        { getError("password").length===0?'':<div className='alert alert-danger '>{getError("password")}</div>}
        <button className='btn btn-outline-info '>
        {registerflag?<i className='fa-solid fa-spin fa-spinner'></i>:"Register"}
        </button>

        




    </form>


    



  </div>
  
  
  
  
  
  </>
  
}
