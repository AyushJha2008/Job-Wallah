import { Application } from "../models/application.model.js";
import { Job } from "../models/job.models";

export const applyJob = async (req, res) => {
  try {
    const userId = req.userId;
    const jobId = req.params.userId;
    if (!jobId) {
      return res.status(400).json({
        message: "job id is missing",
        success: false,
      });
    }
    //check if the user is already applied for this job
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingApplication) {
      return res.status(400).json({
        message: "you have already applied for this job",
        success: false,
      });
    }

    //check if job exist
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "job not exist",
        success: false,
      });
    }

    //create new application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    job.application.push(newApplication._id);
    await job.save();
    return res.status(201).json({
      message: "created successfully",
      newApplication,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.userId;
    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: { path: "company" },
      });

    if (!application) {
      return res.status(404).json({
        message: "you have not applied for any job yet",
        success: false,
      });
    }

    return res.status(200).json({
        application,
        success: true,
      });
    
  } catch (error) {
    console.log(error);
  }
};

//applicants which applied for job (for admin use)
export const getApplicants = async(req, res)=>{
    try {
        const jobId = req.params.userId;
        const job = await Job.findById(jobId).populate({
            path:'application', 
            options:{sort:{createdAt:-1}},
            populate:{path:applicant}
        })
        if(!job){
            return res.status(404).json({
                message: "job not found",
                success: false,
            });
        }
        return res.status(200).json({
            job,
            success: true,
        });

    } catch (error) {
        console.log(error);
    }
}

//admin update status logic here
export const updateStatus = async(req, res)=>{
    try {
        const {status} = req.body
        const applicationId = req.params.userId;
        if(!status){
            return res.status(404).json({
                message: "admin not updated status yet",
                success: false,
            });
        }

        //find the application by applicant id
        const application = await Application.findOne({_id:applicationId})
        if(!application){
            return res.status(404).json({
                message: "application not found",
                success: false,
            });
        }

        //update status
        application.status = status.toLowerCase()
        await application.save()

        return res.status(200).json({
            message: "status updated successfully",
            success: true,
        });
    } catch (error) {
        console.log(error);
    }
}