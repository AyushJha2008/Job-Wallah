import { Bookmark } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate, useParams } from "react-router-dom";

const Job = ({job}) => {
  const navigate = useNavigate();
  const daysAgo = (mongoDbTime) =>{
    const createdAt = new Date(mongoDbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt
    return Math.floor(timeDifference/(1000*60*60*24)) //mm*sec*min*hr
  }
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-200">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{daysAgo(job?.createdAt)===0? "Today":`${daysAgo(job?.createdAt)} days ago`}</p>
        <Button variant="outline" className=" rounded-full size-icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src="https://i.pinimg.com/736x/43/9b/2b/439b2b48e3bc55f6c2c0a4144d09029b.jpg" />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>

      <div className="">
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
        <div className='flex items-center gap-2 mt-4'>
          <Badge className='text-blue-700 font-bold' variant="ghost">{job?.position} Posiiton</Badge>
          <Badge className='text-red-700 font-bold' variant="ghost">{job?.jobType}</Badge>
          <Badge className='text-violet-700 font-bold' variant="ghost">{job?.salary} LPA</Badge>
        </div>
        <div className="flex items-center gap-4 mt-4">
            <Button variant="outline" onClick={()=> navigate(`/description/${job?._id}`)}>Detail</Button>
            <Button className="bg-violet-700 text-white" variant="outline">Save for later</Button>
        </div>
    </div>
  );
};

export default Job;
