import React,{ useEffect , useState} from 'react'
import axios from "axios";
import  {useParams}  from "react-router-dom";
export  function Details() {
  let {id} =useParams();
  console.log(id);
  const [moviesDetails, setMoviesDetails] = useState({});
  async function movieapi(){
   let {data}= await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=8d6476c35be71f67c98027f358882b6b&language=en-US`);
   setMoviesDetails(data);
}

  useEffect(()=>{
 
  movieapi();
 });
  return<>
  <div className="container">
    <div className="row">
      <div className="col-md-4">
      <img src={`https://image.tmdb.org/t/p/w500/${moviesDetails.poster_path}`} className='w-100 ' alt="" />
      </div>
      <div className="col-md-8">
        <h2 className='fs-2'>{moviesDetails.title}</h2>
        <p className='my-3 fs-4 text-muted'>{moviesDetails.tagline}</p>
        {moviesDetails.genres?.map((element,idx)=><span key={idx} className="bg-info me-2 mt-3 p-2 rounded-2">
              {element.name}
        </span>)}
        <p className='mt-4 fs-4'> vote:  {moviesDetails.vote_count}</p>
        <p className='mt-4 fs-4'>vote_average:  {moviesDetails.vote_average} </p>
        <p className='mt-4 fs-4'>popularity:  {moviesDetails.popularity}</p>
        <p className='mt-4 text-muted fs-4'>{moviesDetails.overview}</p>
      </div>
    </div>
  </div>
  
  </> 
    
  
}
