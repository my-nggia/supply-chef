import React from 'react'
import InventorySideBar from '../Navigation Bars/InventorySideBar'

const Inventory = () => {
  return (
    <>
        <div className='w-full bg-slate-100 flex'>
          {/* navigation bar */}
          <InventorySideBar/>

          {/* Content */}
          <h2 className='text-2xl text-red-300'>Inventory</h2>
        </div>
        
    </>
  )
}

export default Inventory