import React from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'

const HeroSection = () => {
  return (
    <div className='text-center'>
        <div className='flex flex-col gap-5 my-10'>
            <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-red-600 font-medium'>#1 Job Hunt Portal</span>
            <h1 className='text-5xl font-bold'>Search, Apply & <br /> Get your <span className='text-violet-700'>Dream Jobs</span></h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, impedit veniam modi vero alias harum!</p>

            <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                <input type="text" placeholder='find your dream jobs'
                className='outline-none border-none w-full' />
                <Button className='rounded-r-full bg-violet-500'><Search className='h-5 w-5 font-extrabold'></Search></Button>
            </div>
        </div>
        
    </div>
  )
}

export default HeroSection