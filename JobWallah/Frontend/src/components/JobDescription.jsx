import React, { useEffect } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import { JOB_API_END_POINT } from '@/utils/constannt';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleJob } from '@/redux/jobSlice';
import axios from 'axios';

const JobDescription = () => {
  const isApplied = true;
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  const {singleJob} = useSelector(store => store.job);
  const {user} = useSelector(store=>store.auth)

  useEffect(()=>{

    const fetchSingleJob = async()=>{
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {withCredentials:true})
        if(res.data.success){
          dispatch(setSingleJob(res.data.job))
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchSingleJob()
  },[jobId, dispatch, user?._id])
  return (
    <div className='max-w-7xl mx-auto my-10'>
      <h1 className='font-bold text-xl'>{singleJob?.tile}</h1>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2 mt-4'>
          <Badge className='text-blue-700 font-bold' variant='ghost'>
            {singleJob?.position} Position
          </Badge>
          <Badge className='text-red-700 font-bold' variant='ghost'>
            {singleJob?.jobType}
          </Badge>
          <Badge className='text-violet-700 font-bold' variant='ghost'>
            {singleJob?.salary} LPA
          </Badge>
        </div>
        <Button disabled={isApplied} className={`rounded-lg text-white ${isApplied? 'bg-gray-900 border border-black': 'bg-violet-700'}`}>{ isApplied? "Already Applied": "Apply Now"}</Button>
      </div>
      <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
      <div className='my-4'>
        <h1 className='font-bold my-1'>Role:<span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
        <h1 className='font-bold my-1'>Location:<span className='pl-4 font-normal text-gray-800'>Mumbai</span></h1>
        <h1 className='font-bold my-1'>Description:<span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
        <h1 className='font-bold my-1'>Experience:<span className='pl-4 font-normal text-gray-800'>2 yrs</span></h1>
        <h1 className='font-bold my-1'>Salary:<span className='pl-4 font-normal text-gray-800'>12 LPA</span></h1>
        <h1 className='font-bold my-1'>Total Applicants:<span className='pl-4 font-normal text-gray-800'>4</span></h1>
        <h1 className='font-bold my-1'>Posted Date:<span className='pl-4 font-normal text-gray-800'>17-02-2026</span></h1>
        
      </div>
    </div>
  );
};

export default JobDescription;
