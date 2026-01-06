import {Company} from "../models/comapny.model.js"


export const registerCompany = async(req, res) =>{
    try {
        const {companyName} = req.body
        if(!companyName){
            return res.status(400).json({
                message:"company name is missing",
                success: false
            })
        }
        let company = await Company.findOne({name:companyName})
        if(company){
            return res.status(400).json({
                message: "you cant register same company, please try unique name",
                success: false
            })
        }
        company = await Company.create({
            name: companyName,
            userId: req.userId
        })

        return res.status(200).json({
            message: "company created successfully",
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getCompany = async (req, res) =>{
    try {
        const userId = req.userId;
        const companies = await Company.find({userId}); //authentication for getting only user comapny {not all company present in database}
        if(!companies){
            return res.status(404).json({
                message: "comapnies not found",
                success: false
            })
        }
        return res.status(200).json({
            companies,
            // message: "companies found of this user id",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getCompanyById = async (req, res) =>{
    try {
        const companyId = req.params.id //available on linkbar (param)
        const company = await Company.findById(companyId);
        if(!company){
            return res.status(404).json({
                message: "comapny not found",
                success: false
            })
        }
        return res.status(200).json({
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const upadateComapny = async(req, res)=>{
    try {
        const {name, description, website, location} = req.body
        const file = req.file // cloudinary logic will be implemented

        const updateData = {name, description, website, location}
        const company = await Company.findByIdAndUpdate(req.params.id, updateData, {new:true})
        if(!company){
            return res.status(400).json({
                message: "company not found 404",
                success: false
            })
        }
        return res.status(200).json({
            message: "company message updates",
            // company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}