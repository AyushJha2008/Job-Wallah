import { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constannt";
import { toast } from "sonner";
import { setLoading } from "@/redux/authSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    email: "",
    fullname: "",
    password: "",
    phoneNumber: "",
    role: "",
    file: "",
  });
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {loading}= useSelector((store)=> store.auth);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if(input.file){
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_END_POINT}/register`,formData, {
        headers:{
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true,
      } )
      if(res.data.success){
        navigate("/login")
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally{
      dispatch(setLoading(false))
    }
  };
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-500 rounded-lg p-4 my-4 flex flex-col gap-2"
        >
          <h1 className="font-bold text-xl mb-3">Sign up</h1>
          <div>
            <Label>Full Name</Label>
            <Input
              type="text"
              placeholder="John Doe"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="abcxyz@gmail.com"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Phone Number</Label>
            <Input
              type="number"
              placeholder="9876543210"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
            />
          </div>

          <div className="flex items-center justify-between">
            <RadioGroup className="w-fit flex items-center g-4 my-4">
              <div className="flex items-center gap-3">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role == "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center gap-3">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role == "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>

            <div className="flex items-center gap-2">
              <label htmlFor="">Profile:</label>
              <Input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="cursor-pointer"
              />
            </div>
          </div>
          {loading? <Button className='w-full my-4'><Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please Wait</Button>: <Button type="submit" className='w-full bg-slate-300 border border-gray-800 text-green-700 font-bold text-lg'>Sign up</Button> }
          <span>
            Already have account??{" "}
            <Link to="/login" className="font-bold text-red-600">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
