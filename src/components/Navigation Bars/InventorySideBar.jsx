import React from "react";
import { RiFolderReceivedFill } from "react-icons/ri";
import { TbPackageExport, TbReportAnalytics  } from "react-icons/tb";
import { LiaShippingFastSolid } from "react-icons/lia";
import { AiOutlineAudit } from "react-icons/ai";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { MdOnlinePrediction } from "react-icons/md";

const navItems = [
    { title: "Receiving" , domain: "/inventory/receiving", icon: <RiFolderReceivedFill />},
    { title: "Out" , domain: "/inventory/out", icon: <TbPackageExport />},
    { title: "Tracking" , domain: "/inventory/tracking", icon: <LiaShippingFastSolid />},
    { title: "Audit" , domain: "/inventory/audit", icon: <AiOutlineAudit />},
    { title: "Purchasing Materials" , domain: "/inventory/purchase", icon: <BiSolidPurchaseTag />},
    { title: "Manage Report" , domain: "/inventory/report", icon: <TbReportAnalytics />},
    { title: "View Forecast" , domain: "/inventory/forecast", icon: <MdOnlinePrediction />},
  ];


const InventorySideBar = () => {
  
  return (
    <div className="flex">
      {/* InventorySideBar */}
      <nav className="h-screen w-64 bg-gray-800 text-white flex flex-col items-start px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Inventory</h1>
        <ul className="w-full">
          {navItems.map((item, index) => (
            <li
              key={index}
              className="w-full px-4 py-2 mb-2 flex items-center gap-3 rounded-lg hover:bg-gray-700 cursor-pointer"
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.title}</span>
            </li>
          ))}
        </ul>
      </nav>
      
    </div>
  );
};

export default InventorySideBar;
