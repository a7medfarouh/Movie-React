import React,{ useEffect , useState} from 'react'
import axios from "axios";

export default function Movies() {
    const [movies, setMovies] = useState([]);
    
    async function movieapi(){
     let {data}= await axios.get("https://api.themoviedb.org/3/trending/movie/week?api_key=8d6476c35be71f67c98027f358882b6b");
     setMovies(data.results);
  }
 
    useEffect(()=>{
   
    movieapi();
    
 
   },[]);
   return <>
    {
    movies.length>0?<div className="container">
    <div className="row align-items-center">
      <div className="col-md-4">
        <div className="title">
          <h3>Trending Movies To watch now</h3>
          <p className='text-muted'>most watchs movies by days</p>
        </div>
      </div>
      {movies.map((element,idx)=><div key={idx} className="col-md-2">
       
        <div className="content position-relative">
            <img src={`https://image.tmdb.org/t/p/original/${element.poster_path}`} className='w-100' alt="" />
            <span className='label bg-info p-2 position-absolute top-0 end-0 rounded-1 '>{element.vote_average}</span>
            <p>{element.title}</p>
        </div>
      </div>)}
    </div>
   
  </div> : <div className='vh-100 d-flex justify-content-center align-items-center'>

      <i className='fa-solid fa-spin fa-spinner fa-5x text-white'></i>
    </div>
  }
   
   
   
   
   
   </>
}
