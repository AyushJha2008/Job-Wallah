import React from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Contact, Mail, Pen } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Label } from "@radix-ui/react-label";
import AppliedJobsTable from "./AppliedJobsTable";
const skills = ["html", "css", "js", "python"];

const Profile = () => {

  const isResume = true;

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src="https://i.pinimg.com/736x/43/9b/2b/439b2b48e3bc55f6c2c0a4144d09029b.jpg"
                alt="profile"
              />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">full name</h1>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Tempora recusandae et voluptatibus.
              </p>
            </div>
          </div>
          <Button variant="outline" className="text-right">
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>ayush@gmail.com</span>
          </div>

          <div className="flex items-center gap-3">
            <Contact />
            <span>976xxx-xxxx</span>
          </div>
        </div>
        <div className="my-5">
          <h1>Skills</h1>
          <div className="flex items-center gap-2">
            {skills.length != 0 ? (
              skills.map((items, index) => (
                <Badge key={index} className="bg-black text-white rounded-xl">
                  {items}
                </Badge>
              ))
            ) : (
              <span>"no skills found"</span>
            )}
          </div>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md font-bold">Resume</Label>
          {isResume? <a target="blank" href="https://youtube.com/@brocode" className="text-blue-500 w-full hover:underline cursor-pointer">Ayush MahaDev</a> : <span>NA</span> }
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
        {/* {application table} */}
        <AppliedJobsTable/>
      </div>
    </div>
  );
};

export default Profile;
