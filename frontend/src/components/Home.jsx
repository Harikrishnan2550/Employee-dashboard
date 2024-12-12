import React from 'react'
import { IoPeople } from "react-icons/io5";
import { FcDepartment } from "react-icons/fc";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { IoIosPaper } from "react-icons/io";
import { GrStatusGood } from "react-icons/gr";
import { MdAccessTime } from "react-icons/md";
import { IoCloseCircleOutline } from "react-icons/io5";


function Home() {
  return (
    <div className=''>
      <div className='p-10'>
        <h1 className='font-bold text-[22px] text-center'>Dashboard Overview</h1>
        <div className='flex space-x-16'>
        <div className='flex mt-10 ml-4'>
            <div className=' bg-emerald-400 h-[50px] w-[50px]'>
            <IoPeople className='text-[35px] mt-2 ml-2' />
            </div>
          <div className='h-[50px] w-52 bg-white '>
            <h1 className='font-semibold ml-5'>Total Employees</h1>
            <h2 className='font-bold text-[18px] ml-5'>4</h2>
          </div>
          </div>
          <div className='flex mt-10 ml-4'>
            <div className=' bg-yellow-500 h-[50px] w-[50px]'>
            <FcDepartment className='text-[35px] mt-2 ml-2' />
            </div>
          <div className='h-[50px] w-52 bg-white '>
            <h1 className='font-semibold ml-5'>Total Employees</h1>
            <h2 className='font-bold text-[18px] ml-5'>4</h2>
          </div>
          </div>
          <div className='flex mt-10 ml-4'>
            <div className=' bg-red-600 h-[50px] w-[50px]'>
            <HiOutlineBanknotes className='text-[35px] mt-2 ml-2' />
            </div>
          <div className='h-[50px] w-52 bg-white '>
            <h1 className='font-semibold ml-5'>Total Employees</h1>
            <h2 className='font-bold text-[18px] ml-5'>4</h2>
          </div>
          </div>
        </div>
      </div>
      <div className='p-10'>
      <h1 className='font-bold text-[22px] text-center'>Leave Details</h1>
      <div className='flex justify-center space-x-16 '>
      <div className='flex mt-10 ml-4'>
            <div className=' bg-emerald-600 h-[50px] w-[50px]'>
            <IoIosPaper  className='text-[35px] mt-2 ml-2' />
            </div>
          <div className='h-[50px] w-72 bg-white '>
            <h1 className='font-medium IoCloseCircleOutline ml-5 text-gray-700'>Leave Applied</h1>
            <h2 className='font-semibold text-[19px] ml-5'>5</h2>
          </div>
          </div>
          <div className='flex mt-10 ml-4'>
            <div className=' bg-green-500 h-[50px] w-[50px]'>
            <GrStatusGood  className='text-[35px] mt-2 ml-2 bg-white rounded-full text-green-500' />
            </div>
          <div className='h-[50px] w-72 bg-white '>
            <h1 className='font-semibold ml-5 text-gray-700'> Leave Approved</h1>
            <h2 className='font-semibold text-[18px] ml-5'>2</h2>
          </div>
          </div>
      </div>
      <div className='flex justify-center space-x-16'>
      <div className='flex mt-10 ml-4'>
            <div className=' bg-yellow-400 h-[50px] w-[50px]'>
            <MdAccessTime  className='text-[35px] mt-2 ml-2 text-white' />
            </div>
          <div className='h-[50px] w-72 bg-white '>
            <h1 className='font-semibold ml-5 text-gray-700'> Leave Pending</h1>
            <h2 className='font-semibold text-[18px] ml-5'>1</h2>
          </div>
          </div>
          <div className='flex mt-10 ml-4'>
            <div className=' bg-red-600 h-[50px] w-[50px]'>
            <IoCloseCircleOutline  className='text-[35px] mt-2 ml-2 text-white' />
            </div>
          <div className='h-[50px] w-72 bg-white '>
            <h1 className='font-semibold ml-5 text-gray-700'>Leave Rejected</h1>
            <h2 className='font-semibold text-[18px] ml-5'>2</h2>
          </div>
          </div>
      </div>
      </div>
    </div>
  )
}

export default Home
