import { setAllJobs, setSingleJob } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constannt';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetSingleJob = () => {
    const dispatch = useDispatch();
    
}

export default useGetSingleJob