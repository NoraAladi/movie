import React from "react";
import styled from "styled-components";
import Pagination from './pagination'

const Wrapper = styled.div`
  margin-top: 4em;

  @media screen and (max-width: 500px) {
    margin-top: 3em;
  }
`;

const PageText = styled.h1`
  font-size: 1em;
  margin: 0 6em;
  color: #7ca579;

  @media screen and (max-width: 500px) {
    margin: 1em;
  }
`;

const PopularMovies = ({ isError}) => {
 

  return (
    <Wrapper>
      <PageText>Currently trending movies.</PageText>
      {isError && <div>An error occured, please try again.</div>}
     
          <Pagination />
       
    </Wrapper>
  );
};

 

export default  (PopularMovies);
