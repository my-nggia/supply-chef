import React from 'react'
import { TbStack3Filled } from "react-icons/tb";
import { useNavigate } from 'react-router-dom'

const domain_list = [
    { id: 1, domain: "/inventory", description: "Inventory" },
    // { id: 6, domain: "/inventory/receiving", description: "Receiving" },
    { id: 2, domain: "/inventory/out", description: "Fulfillment" },
    { id: 3, domain: "/inventory/tracking", description: "Tracking" },
    { id: 4, domain: "/inventory/audit", description: "Audit" },
    { id: 5, domain: "/inventory/purchase", description: "Purchasing" },
    { id: 6, domain: "/inventory/report", description: "Reporting" },
    { id: 7, domain: "/inventory/forecast", description: "Forecast" },
    // { id: 8, domain: "/inventory/orders-tracking", description: "Orders Tracking" },
    { id: 8, domain: "/inventory/view", description: "View" },
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