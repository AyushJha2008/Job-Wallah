import { Job } from "../models/job.models.js";

export const postJob = async(req, res)=>{
    try {
        const {title, description, requirements, salary, location, jobType, experience, position, companyId} = req.body;
        const userId = req.userId;

        if(!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId){
            return res.status(400).json({
                message: "some companies data are missing",
                success: false
            })
        }
        const job = await Job.create({
            title, description, requirements: requirements.split(","),
            salary: Number(salary), location, jobType, experienceLevel: experience, 
            position, company: companyId, createdBy: userId
        })

        return res.status(200).json({
            message: "job created successfully",
            job,
            success: true
        })
    } catch (error) {
       console.log(error); 
    }
} //ye admin post karega

export const getAllJobs = async(req, res)=>{
    try {
        const keyword = req.query.keyword || "" //search bar me keyword=xyz??? jaisa kuch ayega XD
        const query = {
            $or:[ //yaha multiple chize hone wali hai isliye or operator
                {title: {$regex:keyword, $options:"i"}},
                {description: {$regex:keyword, $options:"i"}},
            ]
        }
        
        const jobs = await Job.find(query)
        .populate({path:"company"})  //populate help in converting companyid to company detail, job model me company search karega vaha company ka ref
        .sort({createdAt:-1}) //this will sort jobs in decending order (latest first)
        if(!jobs){
            return res.status(404).json({
                message: "job not found",
                success: false
            })
        }
        return res.status(200).json({
            message: "here results based on your search",
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getJobById = async(req, res)=>{
    try {
       const jobId = req.params.id
       const job = await Job.findById(jobId)
       if(!job){
        return res.status(400).json({
            message: "no job found by this id",
            success: false
        })
       }
       return res.status(200).json({
        message:"heres the comapny of this id",
        job,
        success: true
       })
       
    } catch (error) {
        console.log(error);
    }
} //till now this all controller was for students


export const getAdminJobs = async(req, res)=>{
    try {
        const adminId = req.userId
        const jobs = await Job.find({createdBy:adminId})
        if(!jobs){
            return res.status(400).json({
                message: "jobs not found",
                success: false
            })
        }
        return res.status(200).json({
            jobs,
            success: true
        })
        
    } catch (error) {
        console.log(error);
    }
} //how many jobs admin created

