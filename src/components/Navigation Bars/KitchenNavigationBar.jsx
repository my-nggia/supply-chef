import React from 'react'
import { TbStack3Filled } from "react-icons/tb";
import { useNavigate } from 'react-router-dom'

const domain_list = [
    { id: 1, domain: "/inventory/forecast", description: "View Inventory" },
    { id: 2, domain: "/kitchen/view-orders", description: "View Orders" },
    { id: 3, domain: "/kitchen/tien-luat/update-order", description: "Update Order" },
    { id: 4, domain: "/kitchen/forecast", description: "View Forecast" },
]

function KitchenNavigationBar() {
    const navigate = useNavigate()
  return (
    <div className='w-full flex justify-between'>
        {/* Menu item */}
        <div className='flex justify-center items-center p-2'>
            <TbStack3Filled className='mr-2 text-md text-transparent bg-gradient-to-r from-yellow-400 via-orange-500 to-purple-600'/>
            {
                domain_list.map(item => (
                    <p key={item.id} className='px-3 text-sm hover:bg-gray-200 rounded-md'
                        onClick={() => navigate(item.domain)}
                    >
                        {item.description}
                    </p>
                ))
            }
        </div>
        {/* info */}
        <div className='flex justify-center items-center p-2'>
            <p className='text-sm font-bold bg-yellow-400 rounded-md p-1 mx-2'>Shift 2</p>   
            <p className='text-sm font-bold bg-purple-100 rounded-md p-1 mx-2'>Knaflic</p>   
        </div>
    </div>
  )
}

export default KitchenNavigationBar