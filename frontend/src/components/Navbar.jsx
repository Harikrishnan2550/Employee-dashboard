import React from 'react'

function Navbar() {
  return (
    <div className='bg-emerald-500 flex justify-between w-full h-16'>
      <h1 className='p-5 font-bold text-[20px] ml-10 mb-2'>Admin Panel</h1>
      <button className='h-10 mt-3 px-4 bg-emerald-700 rounded-xl text-white font-semibold text-[15px] mr-4'>Logout</button>
    </div>
  )
}

export default Navbar
