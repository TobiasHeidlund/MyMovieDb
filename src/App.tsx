import { useState } from 'react'
import {useEffect } from 'react';
import { Route, Routes, BrowserRouter, json } from 'react-router-dom';
import axios from 'axios';
import './pages/DetailedMoviePage'
import './pages/MovieListPage'
import MovieListPage from './pages/MovieListPage';
import DetailedMoviePage from './pages/DetailedMoviePage';
import AuthPage from './pages/AuthPage';
import useAuthStore from "./stores/AuthStore"
import useApiKeyStore from './stores/ApiKeyStore';
import BackendHelper from './BackendHelper';

function App() {
  const {username} = useAuthStore(state => ({
    username : state.username
  }));
  const {setApiKey} = useApiKeyStore(state => ({
    setApiKey : state.setApiKey
  }));
  useEffect(() => {
    BackendHelper.getKey( setApiKey)
  },[])
  if(username == ""){
    return(<AuthPage/>)
  }else{  
  
    return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MovieListPage/> } />
        <Route path='/:id' element={<DetailedMoviePage/> }/>
      </Routes>
    </BrowserRouter>
  )
}
}

export default App
