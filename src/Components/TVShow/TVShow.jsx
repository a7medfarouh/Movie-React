import React,{ useEffect , useState} from 'react'
import axios from "axios";

export default function TVShow() {
   
    const [tv, setTv] = useState([]);
    
  async function tvShow(){
   let {data}= await axios.get("https://api.themoviedb.org/3/trending/tv/week?api_key=8d6476c35be71f67c98027f358882b6b");
   console.log(data.results);
   setTv(data.results);
 }
    useEffect(()=>{
   
   ;
    tvShow();
 
   },[]);
   return <>
    {
    tv.length>0? <div className="container">
    <div className="row align-items-center">
      <div className="col-md-4">
        <div className="title">
          <h3>Trending Tv To watch now</h3>
          <p className='text-muted'>most watchs movies by days</p>
        </div>
      </div>
      {tv.map((element,idx)=><div key={idx} className="col-md-2">
        <div className="content position-relative">
            <img src={`https://image.tmdb.org/t/p/original/${element.poster_path}`} className='w-100' alt="" />
            <span className='label bg-info p-2 position-absolute top-0 end-0 rounded-1 '>{element.vote_average}</span>
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
