import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='flex items-center justify-between gap-4 py-3 mt-20'>
        <div className='flex flex-row gap-2'>
                <img src={assets.logo_icon} alt="" className='h-3 sm:h-6 lg:h-10 filter hue-rotate-[260deg] saturate-150 brightness-110'/>
                <p className='text-4xl !font-mono font-bold'>Imagical</p>
        </div>
        <p className='flex-1 border-l border-gray-400 pl-4 text-sm max-sm:hidden'>Copyright Asmi@2822425 | All rights reserved.</p>
    </div>
  )
}

export default Footer
