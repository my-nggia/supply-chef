import React from 'react'
import { useNavigate } from 'react-router-dom'

const tableData = [
    { domain: "/inventory", description: "Inventory main page" },
    { domain: "/inventory/receiving", description: "Receiving materials" },
    { domain: "/inventory/out", description: "Order Fulfillment" },
    { domain: "/inventory/tracking", description: "Tracking shipping" },
    { domain: "/inventory/audit", description: "Inventory Audit" },
    { domain: "/inventory/purchase", description: "Purchasing Materials" },
    { domain: "/inventory/report", description: "Report" },
    { domain: "/inventory/forecast", description: "View forecast" },
  ];

const DomainList = () => {
    const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen rounded-md">        
      <table className="w-1/2 bg-white rounded-lg shadow-md border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2 font-bold text-left bg-gray-100">Domain</th>
            <th className="border border-gray-300 px-4 py-2 text-left font-bold bg-gray-100">Description</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td 
                onClick={() => navigate(row.domain)}
                className="border border-gray-300 px-4 py-2 text-left hover:text-green-600">
                {row.domain}

              </td>
              <td className="border border-gray-300 px-4 py-2 text-left">{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DomainList