import React from 'react'
import avatar from '../img-not.jpg'

import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { MovieContext } from './../Store';

export  function Home() {
  let {movies , tv ,person} =useContext(MovieContext);
  return <>
  
  {
    movies.length>0&&tv.length>0? <div className="container">
    <div className="row align-items-center">
      <div className="col-md-4">
        <div className="title">
          <h3>Trending Movies To watch now</h3>
          <p  className='text-muted'>most watchs movies by days</p>
        </div>
      </div>
      {movies.map((element,idx)=><div key={idx} className="col-md-2">
      
      <Link to={`/details/${element.id}`} >
        <div className="content position-relative">
            <img src={`https://image.tmdb.org/t/p/original/${element.poster_path}`} className='w-100 ' alt="" />
            <span className='label bg-info p-2 position-absolute top-0 end-0 rounded-1 '>{element.vote_average}</span>
            <p>{element.title}</p>
        </div>
      </Link>
        
      </div>)}
    </div>
    <div className="row align-items-center py-2">
      <div className="col-md-4">
        <div className="title">
          <h3>Trending Tv To watch now</h3>
          <p className='text-muted'>most watchs movies by days</p>
        </div>
      </div>
      {tv.map((element,idx)=>
      <div key={idx} className="col-md-2">
        
       
          <div className="content position-relative">
              <img src={`https://image.tmdb.org/t/p/original/${element.poster_path}`} className='w-100' alt="img" />
              <span className='label bg-info p-2 position-absolute top-0 end-0 rounded-1 '>{element.vote_average}</span>
              <p>{element.name}</p>
          </div>
        
        
      </div>)}
    </div>
    <div className="row align-items-center py-2">
      <div className="col-md-4">
        <div className="title">
          <h3>Trending person To watch now</h3>
          <p className='text-muted'>most watchs person by days</p>
        </div>
      </div>
      {person.map((element,idx)=>
      <div key={idx} className="col-md-2">
        
       
          <div className="content position-relative">
            {
              element.profile_path===null? <img className='w-100 heg' src={avatar}/>:<img src={`https://image.tmdb.org/t/p/original/${element.profile_path}`} className='w-100' alt="" />
            }
              
              <p>{element.name}</p>
          </div>
        
        
      </div>)}
    </div>
    </div> : <div className='vh-100 d-flex justify-content-center align-items-center'>

      <i className='fa-solid fa-spin fa-spinner fa-5x text-white'></i>
    </div>
  }
  
  
  
  
  
  </>
}
