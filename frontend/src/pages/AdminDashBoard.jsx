import React from 'react'
import Sidebar from '../components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Home from '../components/Home'
import Employees from '../components/Employees'
import Department from '../components/Department'
import Leaves from '../components/Leaves'
import Salary from '../components/Salary'

function AdminDashBoard() {
  return (
    <div className='lg:flex bg-slate-200'>
      <Sidebar/>
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/employees' element={<Employees/>}/>
        <Route path='/departments' element={<Department/>}/>
        <Route path='/leaves' element={<Leaves/>}/>
        <Route path='/salary' element={<Salary/>}/>
      </Routes>
    </div>
  )
}

export default AdminDashBoard
