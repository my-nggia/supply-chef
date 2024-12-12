import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import DomainList from './components/Main/DomainList'
import Inventory from './components/Main/Inventory'
import TrackingOrders from './components/Inventory/TrackingOrders'
import Receipt from './components/Inventory/Receipt'
import Out from './components/Inventory/Out'
import Purchase from './components/Inventory/Purchase'
import Audit from './components/Inventory/Audit'

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<DomainList />}/>
          <Route path='/inventory' element={<Inventory />}/>
          <Route path='/kitchen/orders-tracking' element={<TrackingOrders />}/>
          <Route path='/inventory/receiving' element={<Receipt />}/>
          <Route path='/inventory/out' element={<Out />}/>
          <Route path='/inventory/purchase' element={<Purchase />}/>
          <Route path='/inventory/audit' element={<Audit />}/>



        </Routes>
      </BrowserRouter>
    
    </>
  )
}

export default App
