import React,{ useEffect , useState} from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';

export default function Movies() {
    const [movies, setMovies] = useState([]);
    let nums = new Array(15).fill(1).map((el,index)=>index+1);
  
  async function movieapi(page){
    let {data}= await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=8d6476c35be71f67c98027f358882b6b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`);
    // console.log(data.results);
    setMovies(data.results);

 }
 
    useEffect(()=>{
   
      movieapi(1);
    
 
   },[]);
   return <>
   
    {
      
    movies.length>0?<div className="container">
    <div className="row align-items-center justify-content-center">
      <div className="col-md-4">
        <div className="title">
          <h3>Trending Movies To watch now</h3>
          <p className='text-muted'>most watchs movies by days</p>
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
   
  </div> : <div className='vh-100 d-flex justify-content-center align-items-center'>

      <i className='fa-solid fa-spin fa-spinner fa-5x text-white'></i>
    </div>
  }
   <nav aria-label="Page navigation example">
      <ul className="pagination d-flex justify-content-center ">
       {
        nums.map((pagenum)=><li onClick={()=>movieapi(pagenum)} key={pagenum}  className="page-item"><a  className="page-link bg-transparent text-white">{pagenum}</a></li>)
       }
        
      
      </ul>
   </nav>
   
   
   
   
   </>
}
