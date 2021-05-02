import React, { useState,useEffect,useReducer } from 'react';
import Pagination from 'reactjs-hooks-pagination';
import axios from 'axios';
import { TMDB_API_KEY } from "../apis/tmdb/key";
import MovieList from "../components/movielist/MovieList";
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from "react-redux";
import Loader from "../components/Helper/Loader";
import { fetchMovies } from "../actions";
const pageLimit = 5;
const initialState = {  
  user: {},  
  loading: true,  
  error: ''  
}  
 
const Reducer = (state, action) => {  
  switch (action.type) {  
      case 'OnSuccess':  
          return {  
              loading: false,  
              user: action.payload,  
              error: ''  
          }  
      case 'OnFailure':  
          return {  
              loading: false,  
              user: {},  
              error: 'Something went wrong'  
          }  
 
      default:  
          return state  
  }  
}
 
const Paginat = ({isLoading, fetchMovies }) => {
 
  const [state, dispatch] = useReducer(Reducer, initialState);
  const [totalRecords] = useState(150);
  const [currentPage,setCurrentPage] = useState(1);
 
  const url = `/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${currentPage}`;


useEffect( () => {
    fetchMovies(url) 
    .then(response => {  
        dispatch({ type: 'OnSuccess', payload: response.data })  
    })  
    .catch(error => {  
        dispatch({ type: 'OnFailure' })  
    })  
 
  }, [currentPage]);
 
 return (
      <div>
       {isLoading ? (
        <Loader />
      ) : (
        <>
          <MovieList />
        </>
      )}
         
   
<div className="d-flex p-2 justify-content-center">
              <Pagination
                totalRecords={totalRecords}
                pageLimit={pageLimit}
                pageRangeDisplayed={1}
                onChangePage={setCurrentPage}
      />
            </div>
      </div>
    );
  }
 
 

const mapStateToProps = (state) => {
    return {
      isError: state.movies.isError,
      isLoading: state.movies.isLoading,
    };
  };
  
  export default connect(mapStateToProps, { fetchMovies })(Paginat);