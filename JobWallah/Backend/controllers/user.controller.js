import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "something is missing",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "user already exist with this email",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await user.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });
    return res.status(201).json({
      message: "Account created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "something is missing",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    if (role !== user.role) {
      return res.status(400).json({
        message: "account doesnt exist with this role",
      });
    }

    const tokenData = { userId: user._id };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
    };
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000, //it is in miliseconds (1day)
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) =>{
    try {
        return res.status(200).cookie("token", "", {maxAge:0}).json({
            message: "logged out successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const upateProfile = async (req, res)=>{
  try {
    const {fullname, email, phoneNumber, bio, skills} = req.body;
    const file = req.file
    if (!fullname || !email || !phoneNumber || !bio || !skills) {
      return res.status(400).json({
        message: "something is missing",
        success: false,
      });
    }
    //cloudinary logic will be implemented here

    //skills will be in array so lets convert it into array
    const skillsArray = skills.split(",")
    const userId = req._id //middleware authentication
    let user = await User.findById(userId)
    if(!user){
      return res.status(400).json({
        message: "user not found",
        success: false
      })
    }
    //updating data
    user.fullname = fullname,
    user.email = email,
    user.phoneNumber = phoneNumber,
    user.profile.bio = bio,
    user.profile.skills = skillsArray
    //resume will be added here

    await user.save()

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
    };
    return res.status(200).json({
      message: "profile updated suuccessfully",
      user, //user return with new data
      success: true
    })

  } catch (error) {
    console.log(error);
  }
}