import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { RadioGroup } from '../ui/radio-group'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

const Login = () => {
    const [input, setInput] = useState({
        email:"",
        password:"",
        role:"",
    })

    const changeEventHandler = (e)=>{
      setInput({...input, [e.target.name]:e.target.value})
    }

    const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${USER_API_END_POINT}/login`,input, {
        headers:{
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true,
      } )
      if(res.data.success){
        navigate("/")
        toast.error(error.response.data.message);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
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
          <h1 className="font-bold text-xl mb-3">Login</h1>
          <div>
            <Label>Email</Label>
            <Input type="email" placeholder="abcxyz@gmail.com" value={input.email} name="email" onChange={changeEventHandler} />
          </div>
          <div>
            <Label>Password</Label>
            <Input type="password" placeholder="password" value={input.password} name="password" onChange={changeEventHandler} />
          </div>

          <div className="flex items-center justify-between">
            <RadioGroup className="w-fit flex items-center g-4 my-4">
              <div className="flex items-center gap-3">
                <Input type="radio" name="role" value="student" checked={input.role=='student'} onChange={changeEventHandler} className='cursor-pointer'/>
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center gap-3">
                <Input type="radio" name="role" value="recruiter" checked={input.role=="recruiter"} onChange={changeEventHandler} className='cursor-pointer'/>
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>

          </div>
          <Button type="submit" className='w-full bg-slate-300 border border-gray-800 text-green-700 font-bold text-lg'>Login</Button>
          <span>Don't have account?? <Link to="/signup" className="font-bold text-red-600">Sign up</Link></span>
        </form>
      </div>
    </div>
  )
}

export default Login