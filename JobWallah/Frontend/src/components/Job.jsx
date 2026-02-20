import { Bookmark } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

const Job = () => {
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-200">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">2 days ago</p>
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
          <h1 className="font-medium text-lg">Comapny Name</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>

      <div className="">
        <h1 className="font-bold text-lg my-2">title</h1>
        <p className="text-sm text-gray-600">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus necessitatibus dignissimos similique tenetur itaque at.</p>
      </div>
      <div className='flex items-center gap-2 mt-4'>
            <Badge className='text-blue-700 font-bold' variant="ghost">Posiiton</Badge>
            <Badge className='text-red-700 font-bold' variant="ghost">part time</Badge>
            <Badge className='text-violet-700 font-bold' variant="ghost">salary</Badge>
        </div>
        <div className="flex items-center gap-4 mt-4">
            <Button variant="outline">Detail</Button>
            <Button className="bg-violet-700 text-white" variant="outline">Save for later</Button>
        </div>
    </div>
  );
};

export default Job;
