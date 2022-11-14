import { createContext } from "react";
import React,{ useEffect , useState} from 'react';
import axios from "axios";
 export let MovieContext= createContext(0);


export default function MovieContextProvider(props){

   const [movies, setMovies] = useState([]);
   const [tv, setTv] = useState([]);
   const [person, setPerson] = useState([]);
   async function movieapi(movietype, type ){
    let {data}= await axios.get(`https://api.themoviedb.org/3/trending/${movietype}/week?api_key=8d6476c35be71f67c98027f358882b6b`);
    // console.log(data.results);
    type(data.results.slice(0,10));

 }

   useEffect(()=>{
  
   movieapi('movie',setMovies);
   movieapi('tv',setTv);
   movieapi('person',setPerson);


  },[]);
  return <MovieContext.Provider value={{movies , tv ,person}}>
    {props.children}
 </MovieContext.Provider>
}