import React from 'react'
import InventoryNavigationBar from '../Navigation Bars/InventoryNavigationBar';
import { useNavigate } from 'react-router-dom'
import { TbPackageExport, TbPackageImport } from "react-icons/tb";


const Inventory = () => {
  // const [hoveredZone, setHoveredZone] = useState(null);
  const navigate = useNavigate()

  return (
    <>
        <div className='w-full'>
          {/* navigation bar */}
          <InventoryNavigationBar />
          
          {/* content */}
          <div className='bg-gray-100 h-screen'>

            {/*  */}
            <div className='flex items-center justify-between'>
              {/* left column */}
              <div className='bg-white p-2 m-2 rounded-md w-1/2'>
                <h2 className='font-bold text-xl text-green-700'>Receiving Materials</h2>
                <button className='flex justify-center items-center my-3 hover:bg-gray-100 rounded-md'
                onClick={() => navigate("/inventory/receiving")}
                >
                <TbPackageImport className='text-purple-600'/> 
                <span className='mx-2'> Import new materials</span>
                </button>
              </div>

              {/* right column */}
              <div className='bg-white p-2 m-2 rounded-md w-1/2'>
                <h2 className='font-bold text-xl text-green-700'>Order Fulfillment</h2>
                <button className='flex justify-center items-center my-3 hover:bg-gray-100 rounded-md'
                onClick={() => navigate("/inventory/out")}
                >
                <TbPackageExport className='text-purple-600'/> 
                <span className='mx-2'> To kitchen</span>
                </button>
              </div>
            </div>
            {/* END. */}


          </div>
        </div>
        
    </>
  )
}

export default Inventory