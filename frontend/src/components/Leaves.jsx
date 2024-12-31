import React from 'react'
import { NavLink } from 'react-router-dom'

function Leaves() {
  return (
    <div>
      <h1 className='ml-[500px] mt-10 text-[23px] font-bold'>Manage Leaves</h1>
      <div>
        <NavLink to={'/apply-leave'}>Add Leave</NavLink>
      </div>
    </div>
  )
}

export default Leaves
