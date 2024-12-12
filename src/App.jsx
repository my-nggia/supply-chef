import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import DomainList from './components/Main/DomainList'
import Inventory from './components/Main/Inventory'
import TrackingOrders from './components/Inventory/TrackingOrders'
import Receipt from './components/Inventory/Receipt'

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<DomainList />}/>
          <Route path='/inventory' element={<Inventory />}/>
          <Route path='/inventory/orders-tracking' element={<TrackingOrders />}/>
          <Route path='/inventory/receiving' element={<Receipt />}/>



        </Routes>
      </BrowserRouter>
    
    </>
  )
}

export default App
