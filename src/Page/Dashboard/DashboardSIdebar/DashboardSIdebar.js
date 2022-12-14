import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../../../Components/Loader/Loader'
import { AuthContext } from '../../../Context/AuthProvider'

function DashboardSIdebar() {

  const [userRole, setUserRole] = useState('')
  const { user } = useContext(AuthContext)
  const [isLoding, setIsLoding] = useState(true)

  useEffect(() => {
    axios.get(`http://localhost:5000/user?email=${user?.email}`)
      .then(res => setUserRole(res))
    setIsLoding(false)
  }, [user?.email])


  return (
    <div className=''>
      {
        isLoding ? <Loader /> :
          <div className='bg-[#32c4d7]  h-[calc(100vh-60px)]  px-2 py-4'>
            <div className='space-y-6 mt-5'>
              <Link to='/' className='flex justify-center'>
                <button className='btn border border-gray-800 rounded-full px-5 py-2 bg-white'>Back To Home</button>
              </Link>
              <hr />
              {
                userRole.data?.userRole === 'admin' &&
                <>

                  <Link to='/dashboard/buyer' className='text-white font-semibold underline text-center block '>All Buyer</Link>
                  <Link to='/dashboard/seller' className='text-white font-semibold underline text-center block '>All Seller</Link>
                </>
              }
              {
                userRole.data?.userRole === 'buyer' &&
                <>
                  <Link to='/dashboard/myOrders' className='text-white font-semibold underline text-center block '> My Orders </Link>
                  <Link to='/dashboard/whiteList' className='text-white font-semibold underline text-center block '> White List </Link>
                </>
              }
              {
                userRole.data?.userRole === 'seller' &&
                <>
                  <Link to='/dashboard/myProduct' className='text-white font-semibold underline text-center block '>My Product</Link>
                  <Link to='/dashboard/addProduct' className='text-white font-semibold underline text-center block '>Add Prodcut</Link>
                </>
              }
            </div>
          </div>
      }
    </div >
  )
}

export default DashboardSIdebar