import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from './layout/Navbar'
import Container from './layout/Container'
import Home from './pages/Home'
import NewStock from './pages/NewStock'
import MyStocks from './pages/MyStocks';

function App() {

  return (
    <BrowserRouter>
      <Navbar/>

      <Container>
        <Routes>
          <Route exact path='/' element={<Home/>}></Route>
          <Route exact path='/newstock' element={<NewStock/>}></Route> 
          <Route exact path='/mystocks' element={<MyStocks/>}></Route> 
        </Routes>

      </Container>

      </BrowserRouter>
  )
}

export default App
