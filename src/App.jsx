import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import DomainList from './components/Main/DomainList'
import Inventory from './components/Main/Inventory'

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<DomainList />}/>
          <Route path='/inventory' element={<Inventory />}/>


        </Routes>
      </BrowserRouter>
    
    </>
  )
}

export default App
