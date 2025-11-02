import React, { useContext } from 'react'
import {assets} from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const {user,setShowLogin,logout,credit} = useContext(AppContext)
  const navigate = useNavigate()
  return (
    <div className ='flex items-center justify-between py-4'>
      <Link to = '/'><div className='flex flex-row gap-2'>
        <img src={assets.logo_icon} alt="" className='h-3 sm:h-6 lg:h-10 filter hue-rotate-[260deg] saturate-150 brightness-110'/>
        <p className='text-4xl !font-mono font-bold'>Imagical</p>
      </div></Link>
      <div>
        {
        user ? 
        <div className='flex items-center gap-2 sm:gap-4'>
            <button onClick={()=> navigate('/buy')} className='flex items-center gap-2 bg-green-200 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:bg-gray-300 hover:scale-105 transition-colors duration-300'>
                <img className='w-5 filter hue-rotate-[260deg] saturate-150 brightness-110' src={assets.credit_star} alt="" />
                <p className='text-xs sm:text-sm font-medium'>Credits left: {credit}</p>
            </button>
            <p className='max-sm:hidden pl-4'>Hi, {user.name}</p>
            <div className='relative group'>
                <img src={assets.profile_icon} className='w-10 drop-shadow' alt="" />
                <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
                    <ul className='list-none m-0 p-2 bg-green-300 rounded-full border text-sm'>
                        <li onClick={logout} className='py-1 px-2 cursor-pointer pr-8'>Logout</li>
                    </ul>
                </div>
            </div>
        </div>
        :
        <div className='flex items-center gap-2 sm:gap-5'>
            <p onClick={()=>navigate('/buy')} className='cursor-pointer'>Pricing</p>
            <button onClick={()=>setShowLogin(true)} className='bg-green-300 px-7 py-2 sm:px-5 text-sm rounded-full '>Login</button>    
        </div>
        }
      </div>
    </div>
  )
}

export default Navbar
