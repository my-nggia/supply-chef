import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import DomainList from './components/Main/DomainList'
import Inventory from './components/Main/Inventory'
import TrackingOrders from './components/Inventory/TrackingOrders'
import Receipt from './components/Inventory/Receipt'
import Out from './components/Inventory/Out'
import Purchase from './components/Inventory/Purchase'
import Audit from './components/Inventory/Audit'
import Tracking from './components/Inventory/Tracking'
import Forecast from './components/Inventory/Forecast'
import Report from './components/Inventory/Report'
import Report02 from './components/Inventory/Report02'
import ViewOrders from './components/Kitchen/ViewOrders'
import SousChefOrders from './components/Kitchen/SousChefOrders'
import ForecastPage from './components/Kitchen/ForecastPage'
import ViewData from './components/Marketing/ViewData'

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
          <Route path='/inventory/tracking' element={<Tracking />}/>
          <Route path='/inventory/forecast' element={<Forecast />}/>
          <Route path='/inventory/report' element={<Report02 />}/>
          <Route path='/kitchen/view-orders' element={<ViewOrders />}/>
          <Route path='/kitchen/forecast' element={<ForecastPage />}/>
          <Route path='/kitchen/tien-luat/update-order' element={<SousChefOrders />}/>
          <Route path='/marketing/view-data' element={<ViewData />}/>



        </Routes>
      </BrowserRouter>
    
    </>
  )
}

export default App
