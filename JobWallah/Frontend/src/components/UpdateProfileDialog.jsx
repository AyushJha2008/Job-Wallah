import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Input } from './ui/input'
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constannt';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const UpdateProfileDialog = ({open, setOpen}) => {
    const [loading, setLoading] = useState(false);
    const {user} = useSelector(store=>store.auth)

    const dispatch = useDispatch();

    const [input, setInput] = useState({
        fullname:user?.fullname,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        bio: user?.profile?.bio,
        skills:user?.profile?.skills?.map(skill=>skill),
        file:user?.profile?.resume
    });

    const changeEventHandler = (e)=>{
        setInput({...input,[e.target.name]:e.target.value})
    }
    const fileChangeHandler = (e) =>{
        const file = e.target.files?.[0];
        setInput({...input, file})
    }

    const submitHandler = async (e) =>{
        e.preventDefault(); //it prevent page refresh on submit
        
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if(input.file){formData.append("file", input.file);}

        try {
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData,{
                headers:{
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if(res.data.success){
                dispatch(setUser(res.data.user));
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.data.message)
        }
        console.log(input);
        setOpen(false)
    }

  return (
    <div>
        <Dialog open={open}>
            <DialogContent className="sm:max-w-[425px]" onInteractOutside={()=> setOpen(false)}>
                <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                </DialogHeader>
                <form onSubmit={submitHandler}>
                    <div className='grid gap-4 py-4'>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <label htmlFor="fullname">Name</label>
                            <Input id="fullname" className="col-span-3" type="text" name="fullname" value={input.fullname} onChange={changeEventHandler}/>
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <label htmlFor="email">Email</label>
                            <Input id="email" className="col-span-3" type="email" name="email" value={input.email} onChange={changeEventHandler} />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <label htmlFor="number">Number</label>
                            <Input id="number" className="col-span-3" name="phoneNumber" value={input.phoneNumber} onChange={changeEventHandler} />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <label htmlFor="Bio">Bio</label>
                            <Input id="Bio" className="col-span-3" name="bio" value={input.bio} onChange={changeEventHandler} />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <label htmlFor="skills">Skills</label>
                            <Input id="skills" className="col-span-3" name="skills" value={input.skills} onChange={changeEventHandler} />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <label htmlFor="file">Resume</label>
                            <Input id="file" className="col-span-3" type="file" accept="application/pdf" name="file" onChange={fileChangeHandler}/>
                        </div>
                    </div>
                    <DialogFooter>
                        {loading ? (
                            <Button className="w-full my-4"> <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait </Button>
                        ):(
                            <Button type="submit" className="w-full bg-slate-300 border border-gray-800 text-green-700 font-bold text-lg">Update</Button>
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default UpdateProfileDialog;