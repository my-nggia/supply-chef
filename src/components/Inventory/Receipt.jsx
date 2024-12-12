import React, { useState } from 'react'
import InventoryNavigationBar from '../Navigation Bars/InventoryNavigationBar'
import { BsReceiptCutoff } from "react-icons/bs";

function Receipt() {
    const [products, setProducts] = useState([]);

  // Trạng thái cho sản phẩm mới
  const [newProduct, setNewProduct] = useState({ name: "", quantity: "" });

  // Xử lý thêm sản phẩm
  const handleAddProduct = () => {
    if (newProduct.name && newProduct.quantity) {
      setProducts((prev) => [...prev, newProduct]);
      setNewProduct({ name: "", quantity: "" }); // Reset input
    }
  };

  return (
    <>
    <div className='w-full'>
        <InventoryNavigationBar />
        <div className='h-screen bg-gray-100 p-2'>
            <h1 className='text-3xl font-bold'>New Receipt</h1>
            <div className='p-2 m-2 mt-5 bg-white rounded-md shadow-md'>
                <div className=''>
                    
                    <div className='flex items-center'>
                        <span className='text-2xl mx-2 text-yellow-500'><BsReceiptCutoff /></span>
                        <h2 className='font-bold text-lg'>RC-IV-HCMC-2212-0001</h2>
                    </div>

                    <div>
                    <div className='mt-5 p-2 flex items-center'>
                        {/* supplier */}
                       <div className='w-1/2 mx-5'>
                            <label for="supplier" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Receive from</label>
                            <input type="text" id='supplier' placeholder='E.g Coop Mart'
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            />
                       </div>
                       {/* end. */}

                       <div className='w-1/2'>
                            <label for="receive_date" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Datetime</label>
                            <input type="datetime-local" id='receive_date' placeholder='12/10/2024 01:38:25'
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            />
                       </div>
                       </div>
                        {/* end. */}

                        <div className="flex p-2 items-center justify-between mx-5">
                            <div className='w-1/2 mr-10'>
                                <label for="Product_Name" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Product Name</label>
                                <input
                                type="text"
                                placeholder="Product    Name"
                                value={newProduct.name}
                                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                            
                            <div className='w-1/2 mr-10'>
                            <label for="Quantity" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Product Name</label>
                                <input
                                type="number"
                                placeholder="Quantity"
                                value={newProduct.quantity}
                                onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>

                            <div className='w-1/3'>
                             <label for="add_product" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Add</label>
                                <button
                                onClick={handleAddProduct}
                                className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                id='add_product'
                                >
                                Add Product
                                </button>
                            </div>

                            <div className='w-1/3'>
                             <label for="save_receipt" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Save</label>
                                <button
                                onClick={() => alert("Saved.")}
                                className="p-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                id='save_receipt'
                                >
                                Save Receipt
                                </button>
                            </div>
                        </div>
                    </div>

                    
                </div>
            </div>
            
            <div className='flex justify-center mt-5'>
                <table className="border-collapse border-1 w-2/3 text-center">
                    <thead>
                        <tr className="bg-gray-200">
                        <th className="border-2 px-4 py-2">No.</th>
                        <th className="border-2 px-4 py-2">Product Name</th>
                        <th className="border-2 px-4 py-2">Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                        <tr key={index} className="bg-gray-100">
                            <td className="border-2 px-4 py-2">{index + 1}</td>
                            <td className="border-2 px-4 py-2">{product.name}</td>
                            <td className="border-2 px-4 py-2">{product.quantity}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    </>
  )
}

export default Receipt