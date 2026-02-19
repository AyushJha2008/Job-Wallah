import React from 'react'
import { Badge } from './ui/badge'

const LatestJobCards = () => {
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
        <div>
            <h1>Company name</h1>
            <p>India</p>
        </div>
        <div>
            <h1>Job Title</h1>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
        </div>
        <div className='flex items-center gap-2 mt-4'>
            <Badge className='text-blue-700 font-bold' variant="ghost">Posiiton</Badge>
            <Badge className='text-red-700 font-bold' variant="ghost">part time</Badge>
            <Badge className='text-violet-700 font-bold' variant="ghost">salary</Badge>
        </div>
    </div>
  )
}

export default LatestJobCards